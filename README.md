# rbirdy.github.io
# Rbirdy Game

## Overview
Rbirdy is an engaging web-based game where players control a bird navigating through a series of obstacles. The game combines simple mechanics with captivating graphics, providing an enjoyable experience for players of all ages. With a login and signup system, users can track their scores and compete against others for the highest score.

## Features
- **User Authentication**: Players can sign up and log in to save their scores and track their progress.
- **Dynamic Gameplay**: Avoid obstacles while scoring points by successfully passing through pipes.
- **Responsive Design**: The game is designed to work seamlessly on various devices, including desktops, tablets, and smartphones.
- **Customizable Difficulty Levels**: Players can choose between easy, medium, and hard difficulty levels that adjust the game’s challenge.
- **Sound Effects and Background Music**: The game features engaging sound effects and background music to enhance the playing experience.
- **High Score Tracking**: Users can view their high scores and compare them with others.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose for object modeling)
- **Audio**: Custom sound effects and background music

## Installation

### Prerequisites
- Node.js and npm installed on your machine
- MongoDB database (local or cloud)

### Steps to Set Up Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/rbirdy-game.git
   cd rbirdy-game
   ```

2. **Set Up the Backend**
   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `server` directory and add your MongoDB connection string:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```

3. **Start the MongoDB Server**
   Ensure your MongoDB server is running.

4. **Start the Backend Server**
   ```bash
   node server.js
   ```

5. **Set Up the Frontend**
   - Navigate back to the project root and into the `client` directory:
     ```bash
     cd ../client
     ```
   - Open `index.html`, `login.html`, or `signup.html` in your browser to access the game.

## Game Controls
- **Arrow Buttons**: Use the arrow buttons on the screen to control the bird's movement.
- **Keyboard Controls**: (Optional) You can also implement keyboard controls for more interactivity.

## Contribution
Contributions are welcome! If you have suggestions for improvements or additional features, feel free to open an issue or submit a pull request.

## Contact
For any inquiries, please contact:
- RAHUL CHUABE (rahulchaube900@gmail.com)
