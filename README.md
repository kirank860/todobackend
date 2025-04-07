## Backend Setup

1. Navigate to the backend directory:
   
   cd backend
   

2. Install dependencies:
   
   npm install
   

3. Create a .env file in the root of the backend directory with the following variables:
   
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo-app
   
   
   Note: Update the MONGO_URI with your MongoDB connection string if needed.

4. Run the server:
   
   npm run dev
   

The server will start on port 5001 (or the port specified in your .env file).

## API Endpoints

### Todos
- GET /api/todos - Get all todos
- GET /api/todos?status=pending - Get todos filtered by status
- GET /api/todos/:id - Get a specific todo
- POST /api/todos - Create a new todo
- PUT /api/todos/:id - Update a todo
- DELETE /api/todos/:id - Delete a todo

## env file for mongodb
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb+srv://kkiru889:monQN0dCkESM2GkD@cluster0.ywhkhnc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0