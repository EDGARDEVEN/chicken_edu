from flask import Blueprint, request, jsonify
from flask_restful import Api, Resource
from .models import db, User, Content, Quiz, UserProgress

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
        return {
            'message': 'Login successful',
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'points': user.points
        }

class ContentList(Resource):
    def get(self):
        contents = Content.query.all()
        return jsonify([{'id': content.id, 'title': content.title, 'body': content.body} for content in contents])

class QuizList(Resource):
    def get(self):
        quizzes = Quiz.query.all()
        return jsonify([{'id': quiz.id, 'question': quiz.question, 'choices': quiz.choices} for quiz in quizzes])

class SubmitQuiz(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(id=data['user_id']).first()
        if not user:
            return {'message': 'User not found'}, 404
        quiz = Quiz.query.filter_by(id=data['quiz_id']).first()
        if not quiz:
            return {'message': 'Quiz not found'}, 404

        is_correct = (quiz.correct_answer == data['answer'])
        score = 1 if is_correct else 0
        new_progress = UserProgress(
            user_id=user.id,
            quiz_id=quiz.id,
            score=score
        )
        user.points += score
        user.progress += 1  # Increment progress for each quiz taken
        db.session.add(new_progress)
        db.session.commit()
        return {'message': 'Quiz submitted successfully', 'correct': is_correct}

class UserProgressList(Resource):
    def get(self, user_id):
        progress = UserProgress.query.filter_by(user_id=user_id).all()
        return jsonify([{'quiz_id': p.quiz_id, 'score': p.score} for p in progress])

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(ContentList, '/contents')
api.add_resource(QuizList, '/quizzes')
api.add_resource(SubmitQuiz, '/submit_quiz')
api.add_resource(UserProgressList, '/user_progress/<int:user_id>')
