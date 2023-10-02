document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('todoList');
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const uploadFileInput = document.getElementById('uploadFileInput');
  const selectedFileName = document.getElementById('selectedFileName');

  function resetSelectedFileName() {
    selectedFileName.textContent = '';
  }

  uploadFileInput.addEventListener('change', () => {
    const file = uploadFileInput.files[0];
    if (file) {
      selectedFileName.textContent = file.name;
    } else {
      resetSelectedFileName(); 
    }
  });

  function createTaskItem(task) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${task.text}</span>
      <img src="/uploads/${task.image}" alt="Uploaded Image" class="task-image" style="height: 100px; width: 100px;">
      <button class="tick-button">&#10003;</button>
      <button class="remove-button">&#10005;</button>
    `;
    if (task.completed) {
      listItem.classList.add('completed');
    }
    listItem.dataset.id = task.id;
    return listItem;
  }

  async function updateTaskOnServer(task) {
    try {
      await axios.put(`/api/tasks/${task.id}`, { completed: task.completed });
    } catch (error) {
      console.error('Error updating task on the server:', error);
    }
  }

  async function deleteTaskOnServer(task) {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
    } catch (error) {
      console.error('Error deleting task on the server:', error);
    }
  }

  async function fetchTasks() {
    try {
      const response = await axios.get('/api/tasks');
      const tasks = response.data;
      tasks.forEach((task) => {
        const listItem = createTaskItem(task);
        todoList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching tasks from the server:', error);
    }
  }

  todoList.addEventListener('click', (event) => {
    const listItem = event.target.closest('li');
    if (!listItem) return;

    if (event.target.matches('.tick-button')) {
      listItem.classList.toggle('completed');
      const taskId = parseInt(listItem.dataset.id);
      const completed = listItem.classList.contains('completed');
      updateTaskOnServer({ id: taskId, completed });
    } else if (event.target.matches('.remove-button')) {
      const taskId = parseInt(listItem.dataset.id);
      deleteTaskOnServer({ id: taskId });
      listItem.remove();
    }
  });

  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    const file = uploadFileInput.files[0];

    if (taskText !== '') {
      try {
    
        const formData = new FormData();
        formData.append('text', taskText);
        formData.append('image', file);
        const response = await axios.post('/api/tasks', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const task = response.data;
        const listItem = createTaskItem(task);
        todoList.appendChild(listItem);

        taskInput.value = '';
        uploadFileInput.value = null;
        resetSelectedFileName();
      } catch (error) {
        console.error('Error adding task on the server:', error);
      }
    }
  });

  fetchTasks();
});
