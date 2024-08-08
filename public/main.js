// importing from api-helpers.js
import * as apiHelpers from "./api-helpers.js";

//Constant Variable for form and todo list
const form = document.querySelector("form");
const todoList = document.querySelector("#todo-list");

//Making sure the submit button works and waits for the response
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const inputs = Object.fromEntries(formData);

  const result = await apiHelpers.createTodo({
    task: inputs.task,
    completed: false,
  });
//When a new todo is created, the list is amended to display all features including the new todo 
  const todoItem = createViewFromTodo(result.payload);
  todoList.append(todoItem);
  event.target.reset();
});
// 23-46 is info from the HTML
function createViewFromTodo(todo) {
  const container = document.createElement("li");
  container.classList.add("container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", async (e) => {
    await apiHelpers.updateTodoById(todo.id, {
      task: todo.task,
      completed: e.target.checked,
    });
    container.classList.toggle("completed", e.target.checked);
  });

  const label = document.createElement("label");
  label.append(checkbox, todo.task);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", async () => {
    await apiHelpers.deleteTodoById(todo.id);
    container.remove();
  });
  //functioning delete button
  deleteButton.classList.add("delete");
  container.append(label, deleteButton);
  return container;
}
//updating todo list when it is refreshed
async function refreshTodos() {
  const result = await apiHelpers.getTodos();
  const todoItems = result.payload.map(createViewFromTodo);
  todoList.append(...todoItems);
}

await refreshTodos();
