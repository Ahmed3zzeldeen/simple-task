# Simple Todo Web App
A simple todo web app built with Next.js and Firebase for learning purposes and to showcase my skills.
The app allows users to add, delete, and mark todos as completed.
Users can also filter todos by status and due date today, tomorrow, next week ,and all completed todos. 

## Demo 🎥
You can view a live demo of the app [here](https://simple-task-coral.vercel.app/)


## Features 🚀
- User authentication (Sign up, Sign in, Sign out)
- User can reset password
- Add a todo
- Delete a todo
- Mark a todo as completed
- Filter todos by status (All, Today, Next Week, Completed)
- Clear all completed todos
- Responsive design


## Tech Stack 🛠️
- Next.js
- Tailwind CSS
- Firebase

## Installation 📥
1. Clone the repository
```bash
git clone https://github.com/Ahmed3zzeldeen/simple-task.git
```

2. Install dependencies
```bash
npm install
```

3. Create a Firebase project and add a web app to it
4. Create a `.env.local` file in the root directory and add the following environment variables with your Firebase config then save the file
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
7. You can start adding todos!

## License 📝
This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.