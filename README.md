**TaskMate – AI-Assisted Task Management App**

TaskMate is a mobile productivity application developed using Generative AI tools to demonstrate how AI can support the software development lifecycle.
It combines AI-assisted code generation, automated UI ideation, and human-in-the-loop refinement to build an intuitive and ethical task management system.

**Features**

✅ Task Management: Add, complete, see history and delete tasks.

🔁 History Tracking: View completed tasks and progress history.

🎨 AI-Generated UI Design: Initial UI prototypes created with Galileo AI and refined in Figma.

🤖 AI-Assisted Development: Code components generated and optimized using ChatGPT and GitHub Copilot.

🔥 Firebase Integration: Real-time database for task storage and synchronization.

🌐 Multi-Screen Navigation: React Navigation used to build modular, scalable navigation.

🧑‍💻 Human-in-the-Loop Workflow: Every AI-generated artifact manually reviewed, debugged, and ethically verified.

**Tech Stack**

Frontend	-> React Native (v0.81.4)
Backend	-> Firebase Realtime Database
Design	-> Galileo AI + Figma
AI Tools	-> ChatGPT, GitHub Copilot
IDE	-> Visual Studio Code
Language -> JavaScript / JSX

**TaskMate_App_Using_GenAI/**
│
├── src/
│   ├── components/        # Reusable UI components (Buttons, Inputs, etc.)
│   ├── screens/           # Splash, Home, History, Settings
│   ├── navigation/        # Navigation between screens
│   ├── utils/             # Helper functions, Firebase config
    ├── assets/            # images
    ├── firebase/          # firebase functionality for data storage
│
├── App.js                 # Main application entry
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation


**⚙️ Installation**
Prerequisites

Node.js

npm

React Native CLI

Android Studio for running the application

# Clone the repository
git clone https://github.com/MuhammadAdil1234/TaskMate_App_Using_GenAI.git

# Navigate into the project directory
cd TaskMate_App_Using_GenAI

# Install dependencies
npm install

# Start Metro bundler
npx react-native start

# Run on Android emulator or connected device
npx react-native run-android

**Generative AI Was Used**

This project explored AI as a co-developer:

ChatGPT and GitHub Copilot generated components and logic, code suggestions and guidance.

Galileo AI generated early-stage UI mock-ups from text prompts.

Human refinement: Every AI output was reviewed, debugged, and ethically verified.

The development process was documented through prompt logs (DP00–DP13) and evaluated through a System Usability Scale (SUS) achieving a score of 85.8 (Excellent).


**Evaluation Summary**
Metric	Result
AI Contribution	94.6 % of codebase
SUS Score	85.8 (Excellent)
Participants	5 users (task testing + SUS survey)
Findings	AI accelerated development and design, but required human validation.


**Author**

Muhammad Adil
MSc Artificial Intelligence and Data Science – Keele University
📧 muhammadadil0994@gmail.com

if you face any difficulty to run this project and need any further infromation please contact me on above email address.


