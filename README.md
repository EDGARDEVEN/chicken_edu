# Chicken Education Gamification System

## Overview

The Chicken Education Gamification System is an interactive web application designed to educate users about chickens through a series of engaging activities and quizzes. The project aims to provide a fun and educational experience that encourages users to learn more about chickens, their behaviors, and their significance.

## Features

- **User Authentication**: Users can register and log in to access personalized content.
- **Educational Content**: Users can access a variety of educational articles and resources about chickens.
- **Quizzes**: Interactive quizzes to test users' knowledge and understanding.
- **Gamification**: Points system to reward users for completing quizzes and activities.
- **Progress Tracking**: Users can track their learning progress and achievements.
- **Chicken Rearing and Animal Conservation**: Helps users understand the importance of rearing animals both for food and income.


## Setup Instructions

### Backend Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/EDGARDEVEN/chicken_edu.git
    cd chicken_edu/
    ```

2. **Create and Activate Virtual Environment**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Configure Environment Variables**:
    Create a `.env` file in the `backend` directory and add the following:
    ```ini
    SECRET_KEY=your_secret_key
    DATABASE_URL=sqlite:///chicken_edu.db
    ```

5. **Initialize the Database**:
    ```bash
    flask db init
    flask db migrate -m "Initial migration"
    flask db upgrade
    ```

6. **Run the Backend Server**:
    ```bash
    export FLASK_APP=run.py
    export FLASK_ENV=development
    flask run
    ```

### Frontend Setup

1. **Navigate to the Frontend Directory**:
    ```bash
    cd chicken-edu-frontend
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Frontend Development Server**:
    ```bash
    npm start
    ```

4. **Access the Application**:
    Open your web browser and navigate to `http://localhost:3000`.

## Usage

1. **Home Page**: Provides an overview of the project and navigation links to other pages.
2. **Register**: Users can register for a new account.
3. **Login**: Users can log in to their accounts.
4. **Contents**: Users can view educational content about chickens.
5. **Quizzes**: Users can take quizzes to test their knowledge.

## API Endpoints

- **Register**: POST `/api/register`
- **Login**: POST `/api/login`
- **Get Contents**: GET `/api/contents`
- **Get Quizzes**: GET `/api/quizzes`

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [edgardeven303@gmail.com].

