const asyncHandler = require('express-async-handler');
const Todo = require('../models/todoModel');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
const getTodos = asyncHandler(async (req, res) => {
  // Add filter by status if provided in query params
  const filter = req.query.status ? { status: req.query.status } : {};
  
  const todos = await Todo.find(filter);
  res.status(200).json(todos);
});

// @desc    Get a specific todo
// @route   GET /api/todos/:id
// @access  Public
const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  
  res.status(200).json(todo);
});

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
const createTodo = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  
  if (!title || title.trim() === '') {
    res.status(400);
    throw new Error('Title is required and cannot be empty');
  }
  
  const todo = await Todo.create({
    title,
    description,
    status: status || 'pending'
  });
  
  res.status(201).json(todo);
});

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  
  // Validate title if provided
  if (req.body.title !== undefined && req.body.title.trim() === '') {
    res.status(400);
    throw new Error('Title cannot be empty');
  }
  
  // Validate status if provided
  if (req.body.status && !['pending', 'in-progress', 'completed'].includes(req.body.status)) {
    res.status(400);
    throw new Error('Status must be one of: pending, in-progress, completed');
  }
  
  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  res.status(200).json(updatedTodo);
});

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  
  if (!todo) {
    res.status(404);
    throw new Error('Todo not found');
  }
  
  await todo.deleteOne();
  
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
};