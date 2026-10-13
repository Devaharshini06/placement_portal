# Placement Management Portal

A full-stack placement management platform that centralizes placement
drives and application workflows for students, companies, and
administrators. The system supports student profiles and resume uploads,
company and drive approval, application status tracking, interview
scheduling, offer-letter generation, and administrative analytics.

## Overview

Institutions often coordinate campus placements through spreadsheets and
disconnected tools. This portal provides a shared workflow for
publishing opportunities, reviewing applications, tracking hiring
progress, and recording final placement outcomes.

### User roles

-   **Student:** Maintain a profile, upload a resume, browse placement
    drives, apply for opportunities, track application status, and view
    placement information.
-   **Company:** Register and manage company details, create placement
    drives, review applicants, update application statuses, and manage
    interview-related information.
-   **Administrator:** Review and approve companies and placement
    drives, oversee users and placement activity, and view platform
    analytics.

## Features

-   Role-based authentication and authorization using
    Flask-JWT-Extended.
-   Student profile management and resume uploads.
-   Company registration and administrator approval workflow.
-   Placement-drive creation and approval.
-   Application lifecycle tracking:
    `Applied → Shortlisted → Interview → Selected/Rejected`.
-   Interview scheduling and feedback.
-   PDF offer-letter generation using ReportLab.
-   Administrative dashboard with visual statistics using Chart.js.
-   CSV export of student applications.
-   Redis caching for frequently accessed data.
-   Celery background tasks for exports, interview reminders, and
    monthly reports.

> Redis and Celery features require their corresponding services and
> worker/scheduler processes to be configured and running.

## Technology Stack

  Layer                   Technologies
  ----------------------- ---------------------------
  Backend                 Python, Flask
  ORM and database        SQLAlchemy, SQLite
  Authentication          Flask-JWT-Extended
  Frontend                Vue.js, JavaScript, Axios
  Styling                 Bootstrap 5
  Charts                  Chart.js
  PDF generation          ReportLab
  Caching                 Redis
  Background processing   Celery

## Architecture

The backend uses Flask API routes organized by responsibility.
SQLAlchemy models represent users, students, companies, job positions,
applications, and final placements. The frontend uses Vue.js to provide
role-specific views and communicates with the backend through HTTP APIs.

``` text
placement-portal/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── routes/
│   │   ├── auth.py
│   │   ├── admin.py
│   │   ├── company.py
│   │   ├── student.py
│   │   └── utils.py
│   ├── tasks/
│   │   ├── exports.py
│   │   ├── reminders.py
│   │   └── reports.py
│   ├── celery_app.py
│   ├── celery_worker.py
│   ├── celery_beat.py
│   ├── cache.py
│   ├── init_admin.py
│   ├── exports/
│   ├── reports/
│   ├── uploads/
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   └── js/
│       ├── app.js
│       ├── router.js
│       ├── auth.js
│       ├── register.js
│       ├── admin.js
│       ├── company.js
│       ├── student.js
│       ├── studentProfile.js
│       ├── sidebar.js
│       └── navbar.js
└── README.md
```

The structure above follows the submitted project report. Update it if
the repository uses different paths or filenames.

## Data Model

The database design described in the project report includes:

-   **User:** Login identity, email, password hash, role, and active
    status.
-   **Student:** Education, skills, CGPA, resume, and student-specific
    details.
-   **Company:** Company name, industry, location, and approval status.
-   **JobPosition:** Company-linked placement drive information,
    requirements, salary, benefits, and status.
-   **Application:** Student/job relationship, application status,
    interview details, feedback, and application date.
-   **Placement:** Final hiring outcome linked to an application,
    including position, salary, and joining date.

Key relationships include one-to-one relationships between User and
Student/Company, one-to-many relationships between Company and
JobPosition, Student and Application, and JobPosition and Application,
and a one-to-one relationship between Application and Placement.

## API Overview

The project report lists the following API resources. Confirm the route
prefixes and methods against the current implementation before treating
this list as exhaustive.

  -------------------------------------------------------------------------------------
  Endpoint                              Method                  Purpose
  ------------------------------------- ----------------------- -----------------------
  `/auth/login`                         `POST`                  Authenticate a user and
                                                                issue a JWT

  `/student/jobs`                       `GET`                   Retrieve available
                                                                placement drives

  `/student/jobs/<id>/apply`            `POST`                  Apply to a placement
                                                                drive

  `/student/profile`                    `GET`, `PUT`            Retrieve or update a
                                                                student profile

  `/company/jobs`                       `POST`                  Create a placement
                                                                drive

  `/company/jobs/<id>/applications`     `GET`                   View applicants for a
                                                                drive

  `/company/applications/<id>/status`   `PUT`                   Update an application's
                                                                status

  `/company/offer/<placement_id>`       `GET`                   Download a PDF offer
                                                                letter

  `/admin/dashboard`                    `GET`                   Retrieve administrative
                                                                analytics

  `/admin/company/<id>/approve`         `PUT`                   Approve a company

  `/admin/company/<id>/reject`          `PUT`                   Reject a company
  -------------------------------------------------------------------------------------

The report also describes CSV export of student applications. Consult
the implementation or its API specification for the exact export route,
request schemas, response codes, and authorization requirements.

## Setup and Installation

The report identifies `backend/requirements.txt` as the backend
dependency file. The exact launch commands, frontend dependencies, and
environment-variable names were not specified in the report, so use the
commands below as a starting point and adjust them to match the
repository.

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <REPOSITORY_DIRECTORY>
```

### 2. Set up the backend

``` bash
python -m venv .venv
```

Activate the environment:

**Windows PowerShell**

``` powershell
.venv\Scripts\Activate.ps1
```

**macOS/Linux**

``` bash
source .venv/bin/activate
```

Install dependencies:

``` bash
pip install -r backend/requirements.txt
```

### 3. Configure the application

Review the project's configuration files and set appropriate development
secrets and database settings. Do not commit real passwords, JWT
secrets, API keys, or production configuration.

The project report identifies SQLite as the database. Follow the
project's initialization instructions and ensure the configured database
path is writable.

### 4. Start the application

The exact startup command depends on the current repository. Inspect the
backend entry point and frontend setup before running it. The report
identifies `backend/app.py` as the main Flask application entry point
and `frontend/index.html` as the frontend entry page.

For example, if the Flask application object is named `app` in
`backend/app.py`, the backend may be started with:

``` bash
flask --app backend.app run --debug
```

Use this command only if it matches the actual Flask import path and
application object. Start the frontend using the command defined by the
repository's package configuration, if one exists.

## Background Jobs and Caching

The project report describes optional Redis caching and Celery tasks
for:

-   CSV export processing.
-   Interview reminders.
-   Monthly report generation.

These features need Redis, a Celery worker, and, for scheduled tasks,
the configured scheduler. Their exact launch commands and configuration
variables should be taken from the current codebase. The core
application should be tested independently of these optional services.

## Security Notes

-   Use hashed passwords and keep secret keys outside source control.
-   Protect role-specific endpoints with server-side authorization;
    hiding UI elements alone is not access control.
-   Validate uploaded resume file types and sizes, and avoid exposing
    uploaded files publicly without authorization.
-   Restrict access to generated offer letters and CSV exports.
-   Use environment-specific configuration and disable debug mode in
    production.
-   Never commit a populated database containing real student, company,
    or placement data.

## Testing

Run the tests provided by the repository using its documented test
command. The project report does not specify a test framework or a
verified test count, so no test result is claimed here.

## Future Improvements

Possible extensions include stronger audit logging for approval and
application-status changes, email delivery for interview reminders,
richer placement analytics, and deployment using a production database
and managed background workers.

## Project Demonstration

The project report includes a demonstration video:

[Watch the Placement Management Portal
demo](https://drive.google.com/file/d/11Cus98fRMgIRNvuwwo5tp47FStVAErVT/view?usp=sharing)

## Acknowledgements

AI tools were used for debugging support, UI suggestions, and resolving
framework-specific issues, as described in the project report.

