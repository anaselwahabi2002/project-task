ProjectTask
📌 Overview

ProjectTask is a full-stack project management application built with React 19, Spring Boot (Java 17), and MySQL.
It allows users to manage projects and tasks with secure authentication and visual progress tracking.
The application is fully containerized using Docker Compose.

🛠️ Technologies Used

    •    Backend: Java 17, Spring Boot, Spring Security (JWT), MapStruct, JUnit, Mockito

    •    Frontend: React 19, Vite, Tailwind CSS v4

    •    Database: MySQL

Tools: Docker, Docker Compose, Postman

✨ Key Features

    •    JWT authentication & protected routes

    •    Projects & tasks CRUD

    •    Project progress calculation (backend)

    •    Progress bar per project (frontend)

    •    Search & pagination for projects and tasks

    •    Clean architecture (Controller / Service / Repository)

    •    Environment variables (no hardcoded values)

🐳 Run with Docker 
        docker-compose up --build


Starts:

    •    Frontend

    •    Backend

    •    MySQL database

▶️ Run Locally (Optional)
Backend
        cd backend
        ./mvnw spring-boot:run

Frontend
        cd frontend
        npm install
        npm run dev

🗄️ Database

    •    MySQL (Docker container)

    •    JPA / Hibernate

    •    Persistent Docker volume

🧪 Testing

    •    Postman (API testing)

    •    JUnit & Mockito (backend unit tests)

Link Of video :
https://drive.google.com/file/d/1BzK_YaDWXooA4NLg5OYQWf0Phado3HjI/view?usp=sharing
