import celery
from flask import Flask, app
from flask_jwt_extended import JWTManager
from backend.config import Config
from backend.models import db
from backend.routes.auth import auth_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=True
    )

    db.init_app(app)
    JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    
    from backend.routes.admin import admin_bp
    app.register_blueprint(admin_bp, url_prefix="/admin")

    from backend.routes.company import company_bp
    app.register_blueprint(company_bp, url_prefix="/company")

    from backend.routes.student import student_bp
    app.register_blueprint(student_bp, url_prefix="/student")

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    with app.app_context():
        db.create_all()

    @app.route("/")
    def index():
        return {
            "status": "Placement Portal API running",
            "version": "v2"
        }
    
    return app


