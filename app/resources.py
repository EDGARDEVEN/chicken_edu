from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from .models import db, User, Content, Quiz

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

class Register(Resource):
    def post(self):
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first() is not None:
            return {'message': 'User already exists'}, 400
        new_user = User(
            username=data['username'],
            email=data['email']
        )
        new_user.set_password(data['password'])
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User created successfully'}, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user is None or not user.check_password(data['password']):
            return {'message': 'Invalid credentials'}, 401
        return {'message': 'Login successful'}, 200

class ContentList(Resource):
    def get(self):
        contents = Content.query.all()
        return jsonify([{'id': content.id, 'title': content.title, 'body': content.body} for content in contents])

class QuizList(Resource):
    def get(self):
        quizzes = Quiz.query.all()
        return jsonify([{'id': quiz.id, 'question': quiz.question, 'answer': quiz.answer} for quiz in quizzes])

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(ContentList, '/contents')
api.add_resource(QuizList, '/quizzes')
