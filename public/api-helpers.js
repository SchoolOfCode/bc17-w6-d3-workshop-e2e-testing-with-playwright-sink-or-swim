export async function getTodos() {
  const response = await fetch("/api/todos");
  const body = await response.json();
  return body;
}
//Asking what activities the code needs to do
export async function createTodo(todo) {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: todo.task,
      completed: todo.completed,
    }),
  });
  const body = await response.json();
  return body;
}
//Updating the activities if changes have been made
export async function updateTodoById(idToDelete, updates) {
  const response = await fetch(`/api/todos/${idToDelete}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: updates.task,
      completed: updates.completed,
    }),
  });
  const body = await response.json();
  return body;
}
//Deleting the activity
export async function deleteTodoById(idToDelete) {
  const response = await fetch(`/api/todos/${idToDelete}`, {
    method: "DELETE",
  });
  const body = await response.json();
  return body;
}
