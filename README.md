# Placement Portal

A full-stack placement management platform designed to streamline the process of managing student placement applications, recruitment drives, and administrative workflows through a centralized web application.

## Overview

The Placement Portal provides a role-based platform for students and administrators to manage placement-related activities.

The application focuses on:

- Secure authentication and authorization
- Student placement applications
- Job and recruitment management
- Administrative workflows
- RESTful backend APIs
- Relational database management
- Performance optimization through caching
- Interactive dashboards

The project was built to practice real-world full-stack software engineering concepts including API design, database modeling, authentication, caching, and frontend-backend integration.

---

## Features

### Student

- Secure user authentication
- View available placement opportunities
- Apply for eligible opportunities
- Track application status
- Manage placement-related information

### Administrator

- Manage students and users
- Create and manage placement opportunities
- Review student applications
- Track recruitment activity
- Manage placement records
- Access application statistics through dashboards

### Authentication & Authorization

- JWT-based authentication
- Role-based access control
- Protected API endpoints
- Secure session management

### Performance

- Redis-based caching
- Optimized database queries
- Efficient API responses
- Cached frequently accessed data

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │      User           │
                    │ Student / Admin     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Vue.js Frontend  │
                    │    Dashboard / UI   │
                    └──────────┬──────────┘
                               │
                         REST API / HTTP
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Flask Backend    │
                    │                     │
                    │ Authentication      │
                    │ Business Logic      │
                    │ REST APIs           │
                    └──────┬───────┬──────┘
                           │       │
                 ┌─────────┘       └─────────┐
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │   PostgreSQL    │        │      Redis      │
        │   Database      │        │     Cache       │
        └─────────────────┘        └─────────────────┘
