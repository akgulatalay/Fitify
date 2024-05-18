
# Fitify App

This project is a React Native application that allows users to track their daily, weekly, and monthly step and calorie burn goals. Users can register and log in using Firebase for authentication.

## Features

- User registration and authentication (via Firebase)
- User goal setting: Daily, weekly, and monthly step and calorie burn goals can be set.
- Progress updating: Daily step and calorie burn data can be entered and subtracted from the goals.
- Goal and progress tracking: Users can view their goals and progress from the main menu.
- Data is stored locally using AsyncStorage.

## Usage

### User Registration and Login

When users first enter the app, they can register with their first name, last name, email address, and password. After registering, they can log in with the same information.

### Main Menu

In the main menu, users can view their set goals and current progress. There are three main tabs:
- **Home**: Main menu
- **Goals**: Goal setting screen
- **Profile**: User profile

### Goal Setting

Users can go to the `Goals` tab to set their daily, weekly, and monthly step and calorie burn goals.

### Progress Updating

Users can go to the `Progress` screen to enter their daily step and calorie burn data to update their progress. This data is subtracted from the set goals.

## To Do

- [ ] Add push notifications
- [ ] Add a feature to reset goals
- [ ] Enhance user registration and authentication features

## License

This project is licensed under the [MIT License](LICENSE).
