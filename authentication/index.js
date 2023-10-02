const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const taskSchema = new mongoose.Schema({
  taskName: String,
  image: mongoose.Schema.Types.ObjectId,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.json());

app.get('/images/:imageId', (req, res) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'images',
  });

  const downloadStream = bucket.openDownloadStream(mongoose.Types.ObjectId(req.params.imageId));

  downloadStream.pipe(res);
});

app.post('/tasks', upload.single('image'), async (req, res) => {
  try {
    console.log('Received image upload request.');

    const readableImageStream = new Readable();
    readableImageStream.push(req.file.buffer);
    readableImageStream.push(null);

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'images',
    });

    const uploadStream = bucket.openUploadStream(req.file.originalname);
    readableImageStream.pipe(uploadStream);

    uploadStream.on('finish', async () => {
      console.log('Image uploaded successfully.');

      const task = new Task({
        taskName: req.body.taskName,
        image: uploadStream.id,
        completed: false,
      });

      await task.save();
      console.log('Task saved with image reference:', task);

      res.status(201).send(task);
    });

    uploadStream.on('error', (error) => {
      console.error('Error during image upload:', error);
      res.status(500).send(error.message);
    });
  } catch (error) {
    console.error('Error processing image upload request:', error);
    res.status(400).send(error.message);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, {
      completed: true,
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task.image) {
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'images',
      });
      bucket.delete(task.image);
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
