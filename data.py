import requests
from app import create_app, db
from app.models import Content, Quiz

app = create_app()

def fetch_wikipedia_articles():
    articles = []
    search_url = 'https://en.wikipedia.org/w/api.php'
    for _ in range(5):  # Fetch 5 articles
        params = {
            'action': 'query',
            'format': 'json',
            'list': 'search',
            'srsearch': 'chicken',
            'srlimit': 1,
        }
        response = requests.get(search_url, params=params)
        data = response.json()
        if data['query']['search']:
            page = data['query']['search'][0]
            title = page['title']
            snippet = page['snippet']
            articles.append({'title': title, 'body': snippet})
    return articles

def generate_chicken_quizzes():
    quizzes = [
        {
            'question': 'What is a chicken?',
            'choices': ['A type of bird', 'A type of fish', 'A type of mammal', 'A type of reptile'],
            'correct_answer': 'A type of bird'
        },
        {
            'question': 'What do chickens primarily eat?',
            'choices': ['Meat', 'Grains', 'Grass', 'Insects'],
            'correct_answer': 'Grains'
        },
        {
            'question': 'How many eggs does a chicken lay per year on average?',
            'choices': ['50', '150', '250', '350'],
            'correct_answer': '250'
        },
        {
            'question': 'Which part of a chicken is called a "comb"?',
            'choices': ['Leg', 'Wing', 'Head', 'Tail'],
            'correct_answer': 'Head'
        },
        {
            'question': 'What is the name of a young chicken?',
            'choices': ['Pullet', 'Chick', 'Rooster', 'Hen'],
            'correct_answer': 'Chick'
        }
    ]
    return quizzes

def populate_database(content_data, quizzes_data):
    with app.app_context():
        db.create_all()

        # Populate contents
        for content in content_data:
            new_content = Content(title=content['title'], body=content['body'])
            db.session.add(new_content)

        # Populate quizzes
        for quiz in quizzes_data:
            new_quiz = Quiz(
                question=quiz['question'],
                choices=quiz['choices'],
                correct_answer=quiz['correct_answer']
            )
            db.session.add(new_quiz)

        db.session.commit()

if __name__ == '__main__':
    content_data = fetch_wikipedia_articles()
    quizzes_data = generate_chicken_quizzes()
    populate_database(content_data, quizzes_data)
    print('Database populated successfully')