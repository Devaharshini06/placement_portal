from werkzeug.security import generate_password_hash
from backend.app import create_app
from backend.models import db, User

app = create_app()

with app.app_context():
    admin = User.query.filter_by(role="admin").first()
    if not admin:
        admin = User(
            email="admin@institute.com",
            password=generate_password_hash("admin123"),
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin created")
    else:
        print("Admin already exists")
