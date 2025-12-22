ProjectTask
📌 Overview

ProjectTask is a full-stack project management application built with React 19, Spring Boot (Java 17), and MySQL.
It allows users to manage projects and tasks with secure authentication and visual progress tracking.
The application is fully containerized using Docker Compose and follows clean, maintainable architecture principles.

Backend (Spring Boot)
Essentials

Java 17 + Spring Boot

    •  REST API

    •  Clean Architecture (Controller / Service / Repository)

    •  Spring Security + JWT

    •  DTO pattern

    •  MapStruct (Mapper)

    •  Project progress calculation (percentage)

    •  JUnit & Mockito (Unit Testing)

    •  Dockerized backend service

-  Responsibilities

        •  Authentication & authorization

        •  Business logic

        •  Projects & tasks management

        •  Calculate project progress in percentage

        •  Secure API endpoints

        •  Database access

-  Frontend (React)
Essentials

React 19

    •  Vite

    •  Tailwind CSS v4

    •  JWT-based authentication
    
    •  Protected routes
    
    •  Custom hooks
    
    •  Projects & tasks pagination (UI level)
    
    •  Projects & tasks search (UI level)
    
    •  Project progress bar on each project card
    
    •  Reusable components
    
    •  Docker + Nginx

Responsibilities

    •  User interface
    
    •  Projects & tasks management
    
    •  Search and pagination UI
    
    •  Visual project progress display
    
    •  API consumption
    
    •  Client-side routing and state handling

Database (MySQL)
Essentials

    •  MySQL
    
    •  Relational database
    
    •  JPA / Hibernate
    
    •  Docker volume for persistence

Responsibilities

    •  Store users, projects, and tasks
    
    •  Ensure data consistency and integrity

Environment Variables

To avoid hardcoding sensitive or environment-specific values, the project uses environment variables.

Backend

    SPRING_DATASOURCE_URL
    SPRING_DATASOURCE_USERNAME
    SPRING_DATASOURCE_PASSWORD
    JWT_SECRET

Database

    MYSQL_ROOT_PASSWORD
    MYSQL_DATABASE
    MYSQL_USER
    MYSQL_PASSWORD

Frontend

    VITE_API_URL

All environment variables are managed via .env files and Docker Compose.

Docker & Orchestration

  Docker Compose

  Three containers : 

    Frontend

    Backend

    MySQL

Centralized configuration using environment variables

    docker-compose up --build

🔐 Security

    •  JWT authentication
    
    •  Role-based authorization
    
    •  Secured backend endpoints

Protected frontend routes

🧪 Testing

    •  Postman for API testing
    
    •  JUnit & Mockito for backend unit testing

