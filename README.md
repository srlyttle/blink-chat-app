# Chat App

A chat using a static json file to retrieve initial messages then subsequent chats are stored in memory.

## Features

- **Conversations List**: 
  - Displays a sorted list of conversations on the left side.
  - Arranged by their last update, with the newest at the top.

- **Chat Messages**: 
  - Clicking on a conversation brings up its associated messages on the right side.
  - Messages are sorted by their last update with the oldest at the top.

- **Reply Section**: 
  - A text field at the bottom allows users to add new messages to the conversation.

- **Date Stamps**: 
  - Each message is timestamped and displays its date.

- **Message Editing (Optional)**: 
  - Clicking on a message lets users edit it. 
  - This functionality changes the 'Send' button to 'Edit' in the reply section.

## Development

The app is built using several modern tools and libraries:

- **Vite**: Provides a faster and leaner development environment.
- **TypeScript**: Offers static type checking and modern JavaScript features.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Daisy UI**: Used for crafting certain UI components.

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. Open the app in your browser, and start chatting!


