package models

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

var db *sql.DB

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password,omitempty"`
}

type Claims struct {
	UserID int `json:"user_id"`
	jwt.StandardClaims
}

const jwtSecret = "your-secret-key-change-in-production"

func InitDB() error {
	var err error
	log.Println("Opening SQLite database connection")
	db, err = sql.Open("sqlite3", "./users.db")
	if err != nil {
		log.Printf("Failed to open database: %v", err)
		return fmt.Errorf("failed to open database: %w", err)
	}

	// Test the connection
	if err = db.Ping(); err != nil {
		log.Printf("Failed to ping database: %v", err)
		return fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Creating users table if not exists")
	createTableSQL := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		log.Printf("Failed to create table: %v", err)
		return fmt.Errorf("failed to create users table: %w", err)
	}

	log.Println("Database initialized successfully")
	return nil
}

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func (u *User) Register() (int64, error) {
	hashedPassword, err := HashPassword(u.Password)
	if err != nil {
		return 0, fmt.Errorf("failed to hash password: %w", err)
	}

	// First, check if the user already exists
	exists, err := UserExists(u.Email)
	if err != nil {
		return 0, fmt.Errorf("failed to check if user exists: %w", err)
	}

	if exists {
		return 0, fmt.Errorf("a user with this email already exists")
	}

	// Prepare the SQL statement to catch any syntax errors
	stmt, err := db.Prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
	if err != nil {
		return 0, fmt.Errorf("failed to prepare SQL statement: %w", err)
	}
	defer stmt.Close()

	// Execute the statement
	result, err := stmt.Exec(u.Name, u.Email, hashedPassword)
	if err != nil {
		return 0, fmt.Errorf("failed to execute SQL statement: %w", err)
	}

	// Get the ID
	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("failed to get last insert ID: %w", err)
	}

	return id, nil
}

func Login(email, password string) (*User, string, error) {
	user := &User{}
	err := db.QueryRow("SELECT id, name, email, password FROM users WHERE email = ?", email).
		Scan(&user.ID, &user.Name, &user.Email, &user.Password)

	if err != nil {
		return nil, "", err
	}

	if !CheckPasswordHash(password, user.Password) {
		return nil, "", fmt.Errorf("invalid password")
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: user.ID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return nil, "", err
	}

	user.Password = ""
	return user, tokenString, nil
}

func GetUserByID(id int) (*User, error) {
	user := &User{}
	err := db.QueryRow("SELECT id, name, email FROM users WHERE id = ?", id).
		Scan(&user.ID, &user.Name, &user.Email)

	if err != nil {
		return nil, err
	}
	return user, nil
}

func ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})

	if err != nil || !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}

func UserExists(email string) (bool, error) {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", email).Scan(&count)
	if err != nil {
		return false, err
	}
	return count > 0, nil
}
