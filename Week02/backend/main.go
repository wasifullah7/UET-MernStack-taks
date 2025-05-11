package main

import (
	"auth-app/controllers"
	"auth-app/middlewares"
	"auth-app/models"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	err := models.InitDB()
	if err != nil {
		log.Fatal("Database initialization failed:", err)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", controllers.Register)
			auth.POST("/login", controllers.Login)
		}

		user := api.Group("/user")
		user.Use(middlewares.AuthMiddleware())
		{
			user.GET("/profile", controllers.GetProfile)
		}
	}

	r.Run(":8080")
}
