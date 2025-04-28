package database

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type TodoItem struct {
	ID        int       `json:"id"`
	Task      string    `json:"task"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"createdAt"`
}

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./todo.db")
	if err != nil {
		log.Fatal(err)
	}

	createTableSQL := `
	CREATE TABLE IF NOT EXISTS todo_items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		task TEXT NOT NULL,
		completed BOOLEAN DEFAULT 0,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	_, err = DB.Exec(createTableSQL)
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Database initialized successfully")
}

func GetAllTodos() ([]TodoItem, error) {
	rows, err := DB.Query("SELECT id, task, completed, created_at FROM todo_items ORDER BY id DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var todos []TodoItem
	for rows.Next() {
		var todo TodoItem
		var createdAt string

		if err := rows.Scan(&todo.ID, &todo.Task, &todo.Completed, &createdAt); err != nil {
			return nil, err
		}

		todo.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdAt)
		todos = append(todos, todo)
	}

	return todos, nil
}

func CreateTodo(task string) (TodoItem, error) {
	result, err := DB.Exec("INSERT INTO todo_items (task) VALUES (?)", task)
	if err != nil {
		return TodoItem{}, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return TodoItem{}, err
	}

	var todo TodoItem
	var createdAt string

	err = DB.QueryRow("SELECT id, task, completed, created_at FROM todo_items WHERE id = ?", id).
		Scan(&todo.ID, &todo.Task, &todo.Completed, &createdAt)
	if err != nil {
		return TodoItem{}, err
	}

	todo.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdAt)
	return todo, nil
}

func UpdateTodoStatus(id int, completed bool) error {
	_, err := DB.Exec("UPDATE todo_items SET completed = ? WHERE id = ?", completed, id)
	return err
}

func DeleteTodo(id int) error {
	_, err := DB.Exec("DELETE FROM todo_items WHERE id = ?", id)
	return err
}
