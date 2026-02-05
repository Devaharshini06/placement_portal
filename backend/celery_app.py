from celery import Celery

celery = Celery(
    "placement_portal",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
    include=[
        "backend.tasks.exports",
        "backend.tasks.reminders",
        "backend.tasks.reports",
    ]
)
