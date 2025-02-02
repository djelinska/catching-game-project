# CATching GAME

CATching GAME is a dynamic arcade game where players must click on appearing cat tiles to score a certain number of points within a set time. The game offers different difficulty levels that affect the frequency and number of appearing cat tiles.

## Features

- **Gameplay Mode**: Click on appearing cat tiles to collect the required number of points.

- **Different Difficulty Levels**: Ability to choose the frequency of cat tiles appearing on the board.

- **Scoring System**: Keeps track of points and displays the final score.

- **Leaderboard**: A scoreboard where players can compete.

- **Login System**: Allows players to create accounts and track their progress.

- **Chat and Comments**: Option for players to communicate with each other.

- **Challenges**: Additional challenges to complete during gameplay.

- **WebSocket and MQTT Support**: Real-time score fetching

## Installation and Configuration

### Requirements

- Node.js (for both frontend and backend)

- MongoDB database

### Installation

#### Clone the Repository

```sh
git clone https://github.com/djelinska/catching-game-project.git
cd catching-game-project
```

#### Database Configuration

Set up the MongoDB connection in the .env file.

#### Install Dependencies (Backend)

```sh
cd backend
npm install
npm start
```

#### Install Dependencies (Frontend)

```sh
cd frontend
npm install
npm start
```

## Technologies

- **Frontend**: React.js, TailwindCSS

- **Backend**: Node.js, Express.js

- **Database**: MongoDB

- **Communication**: WebSockets, MQTT

- **Authentication**: JWT
