from celery.schedules import crontab
from backend.celery_app import celery

celery.conf.beat_schedule = {
    "daily-reminders-test": {
        "task": "backend.tasks.reminders.send_daily_reminders",
        "schedule": crontab(hour=9, minute=0),
    },
    "monthly-report-test": {
        "task": "backend.tasks.reports.generate_monthly_report",
        "schedule": crontab(day_of_month=1, hour=10, minute=0),
    },
}
