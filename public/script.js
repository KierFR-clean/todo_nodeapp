document.addEventListener("DOMContentLoaded", () => {
    loadtodoTask();  
    document.getElementById("todoInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTodoTask();
      }
    });
  });
  
  async function addTodoTask() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();  
    if (text) {
      try {
        const response = await fetch("/api/task", {  
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),  
        });
        if (response.ok) {
          input.value = "";
          loadtodoTask();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  async function loadtodoTask() { 
    try {
      const response = await fetch("/api/task"); 
      const tasks = await response.json();
      displayTasks(tasks);  
    } catch (error) {
        console.log(error);
    }
  }
  
  async function removeTask(id) {  
    try {
      await fetch(`/api/task/${id}`, {
        method: "DELETE"
      });
      loadtodoTask();
    } catch (error) {
        console.log(error);
        }
  }

  async function toggleTask(id, completed) {
    try {
      await fetch(`/api/task/${id}`, {  
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      loadtodoTask();
    } catch (error) {
        console.log(error);
    }
  }
  
  function displayTasks(tasks) {  
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    
    tasks.forEach((task) => {
      const todoElement = document.createElement("div");
      todoElement.className = "todo-item";
      todoElement.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}
          onchange="toggleTask(${task.id}, this.checked)">
        <span class="todo-txt ${task.completed ? "completed" : ""}">${task.text}</span>
        <button class="delete-button" onclick="removeTask(${task.id})">Delete</button>
      `;
      todoList.appendChild(todoElement);  
    });
  }