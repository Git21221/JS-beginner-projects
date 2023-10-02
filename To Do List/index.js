const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const multer = require('multer'); // Add multer for handling file uploads

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration for multer to handle file uploads
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const tasksFilePath = './tasks.json';

// Read tasks from the JSON file
function readTasksFromFile() {
  try {
    const data = fs.readFileSync(tasksFilePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write tasks to the JSON file
function writeTasksToFile(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// API endpoint to get all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
});

// API endpoint to add a new task with an image
app.post('/api/tasks', upload.single('image'), (req, res) => {
  const { text } = req.body;
  if (text) {
    const tasks = readTasksFromFile();
    const newTask = { id: Date.now(), text, completed: false, image: req.file ? req.file.filename : null };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: 'Task text is required.' });
  }
});

// API endpoint to update the completion status of a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid request body.' });
  }

  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks[taskIndex].completed = completed;
  writeTasksToFile(tasks);

  res.json(tasks[taskIndex]);
});

// API endpoint to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  const tasks = readTasksFromFile();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(taskIndex, 1);
  writeTasksToFile(tasks);

  res.json({ message: 'Task deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
