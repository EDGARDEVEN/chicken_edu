import requests
from app import create_app, db
from app.models import Content, Quiz

app = create_app()

def fetch_wikipedia_articles():
    articles = []
    search_url = 'https://en.wikipedia.org/w/api.php'
    search_terms = ['poultry keeping', 'chicken farming', 'egg production', 'broiler chickens', 'free-range chickens']

    for search_term in search_terms:  # Iterate through search terms directly
        search_params = {
            'action': 'query',
            'format': 'json',
            'list': 'search',
            'srsearch': search_term,
            'srlimit': 1,
        }
        search_response = requests.get(search_url, params=search_params)
        search_data = search_response.json()

        if search_data['query']['search']:
            page = search_data['query']['search'][0]
            title = page['title']
            
            content_params = {
                'action': 'query',
                'format': 'json',
                'prop': 'extracts',
                'explaintext': True,
                'titles': title,
            }
            content_response = requests.get(search_url, params=content_params)
            content_data = content_response.json()
            
            page_id = next(iter(content_data['query']['pages']))
            if page_id != '-1':
                content = content_data['query']['pages'][page_id]
                articles.append({'title': content['title'], 'body': content['extract']})
    
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
        },
        {
            'question': 'What is poultry keeping?',
            'choices': ['Raising birds for meat and eggs', 'Growing crops', 'Fishing', 'Hunting wild animals'],
            'correct_answer': 'Raising birds for meat and eggs'
        },
        {
            'question': 'Which of the following is a common poultry bird?',
            'choices': ['Chicken', 'Parrot', 'Eagle', 'Ostrich'],
            'correct_answer': 'Chicken'
        },
        {
            'question': 'What do poultry birds primarily eat?',
            'choices': ['Grains', 'Meat', 'Fish', 'Fruits'],
            'correct_answer': 'Grains'
        },
        {
            'question': 'What is the purpose of a chicken coop?',
            'choices': ['To house poultry', 'To grow plants', 'To store tools', 'To breed fish'],
            'correct_answer': 'To house poultry'
        },
        {
            'question': 'Which part of a chicken is commonly used for meat?',
            'choices': ['Legs', 'Beak', 'Feathers', 'Claws'],
            'correct_answer': 'Legs'
        }
    ]
    return quizzes

def clear_existing_data():
    with app.app_context():
        db.session.query(Content).delete()
        db.session.query(Quiz).delete()
        db.session.commit()

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
    clear_existing_data()
    content_data = fetch_wikipedia_articles()
    quizzes_data = generate_chicken_quizzes()
    populate_database(content_data, quizzes_data)
    print('Database populated successfully')