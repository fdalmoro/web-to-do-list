// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput').value.trim();
    const priority = document.getElementById('priority').value;

    if (taskInput === '') {
        alert('Por favor, adicione uma tarefa!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.classList.add(priority);
    listItem.innerHTML = `
        ${taskInput}
        <div class="task-actions">
            <button onclick="editTask(this)"><i data-feather="edit"></i></button>
            <button onclick="deleteTask(this)"><i data-feather="trash-2"></i></button>
            <button onclick="completeTask(this)"><i data-feather="check"></i></button>
        </div>
    `;

    taskList.appendChild(listItem);
    document.getElementById('taskInput').value = '';
    
    // Inicializa os ícones
    feather.replace();
}

// Função para editar uma tarefa
function editTask(button) {
    const listItem = button.parentElement.parentElement;
    const taskText = prompt("Edite sua tarefa:", listItem.firstChild.textContent.trim());
    if (taskText) {
        listItem.firstChild.textContent = taskText;
    }
}

// Função para excluir uma tarefa
function deleteTask(button) {
    const listItem = button.parentElement.parentElement;
    listItem.remove();
}

// Função para marcar uma tarefa como concluída
function completeTask(button) {
    const listItem = button.parentElement.parentElement;
    listItem.style.textDecoration = 'line-through';
    listItem.querySelector('.task-actions').remove();
}
