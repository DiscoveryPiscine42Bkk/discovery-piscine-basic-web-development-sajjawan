// Cookie helpers
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
  }
  return null;
}

// Load todos from cookie
function loadTodos() {
  const data = getCookie('todo_list');
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save todos to cookie
function saveTodos(todos) {
  setCookie('todo_list', JSON.stringify(todos), 365);
}

// Render todos
function renderTodos() {
  const ft_list = document.getElementById('ft_list');
  ft_list.innerHTML = '';
  todos.forEach((todo, idx) => {
    const div = document.createElement('div');
    div.className = 'todo';
    div.textContent = todo;
    div.addEventListener('click', function() {
      if (confirm('Do you want to remove this TO DO?')) {
        todos.splice(idx, 1);
        saveTodos(todos);
        renderTodos();
      }
    });
    ft_list.appendChild(div);
  });
}

// Add new todo
document.getElementById('new-btn').onclick = function() {
  const text = prompt('Enter your new TO DO:');
  if (text && text.trim().length > 0) {
    todos.unshift(text.trim());
    saveTodos(todos);
    renderTodos();
  }
};

// Main
let todos = loadTodos();
renderTodos();