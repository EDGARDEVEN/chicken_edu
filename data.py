import requests
from app import create_app, db
from app.models import Content, Quiz

app = create_app()

def fetch_external_data():
    # Fetch quizzes from Open Trivia Database
    quizzes_url = 'https://opentdb.com/api.php?amount=10&type=multiple'
    quizzes_response = requests.get(quizzes_url)
    quizzes_data = quizzes_response.json()['results']

    # Fetch content from Wikipedia
    content_data = []
    for _ in range(5):  # Fetch 5 random articles
        content_url = 'https://en.wikipedia.org/api/rest_v1/page/random/summary'
        content_response = requests.get(content_url)
        content = content_response.json()
        content_data.append({
            'title': content['title'],
            'body': content['extract']
        })

    return content_data, quizzes_data

def populate_database(content_data, quizzes_data):
    with app.app_context():
        db.create_all()

        # Populate contents
        for content in content_data:
            new_content = Content(title=content['title'], body=content['body'])
            db.session.add(new_content)

        # Populate quizzes
        for quiz in quizzes_data:
            choices = quiz['incorrect_answers'] + [quiz['correct_answer']]
            new_quiz = Quiz(
                question=quiz['question'],
                choices=choices,
                correct_answer=quiz['correct_answer']
            )
            db.session.add(new_quiz)

        db.session.commit()

if __name__ == '__main__':
    content_data, quizzes_data = fetch_external_data()
    populate_database(content_data, quizzes_data)
