// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrZgHlPVX59zM68ENmAyXogc3JmoTU5rE",
    authDomain: "tentando-eed5d.firebaseapp.com",
    projectId: "tentando-eed5d",
    storageBucket: "tentando-eed5d.appspot.com",
    messagingSenderId: "103578231381",
    appId: "1:103578231381:web:485a8e94f53e8087e92adc",
    measurementId: "G-V3BFLM3V3X",
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCollection = collection(db, "to_do_list");

// Função para carregar tarefas do Firestore
async function loadTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Limpa a lista antes de carregar

    const snapshot = await getDocs(tasksCollection);
    snapshot.forEach((doc) => {
        const data = doc.data();
        const listItem = document.createElement("li");
        listItem.classList.add(data.priority);
        listItem.setAttribute("data-id", doc.id);
        listItem.innerHTML = `
            ${data.text}
            <div class="task-actions">
                <button onclick="editTask(this)"><i data-feather="edit"></i></button>
                <button onclick="deleteTask(this)"><i data-feather="trash-2"></i></button>
                <button onclick="completeTask(this)"><i data-feather="check"></i></button>
            </div>
        `;
        if (data.completed) {
            listItem.style.textDecoration = "line-through";
            listItem.querySelector(".task-actions").remove();
        }
        taskList.appendChild(listItem);
    });
    feather.replace();
}

// Função para adicionar uma nova tarefa
async function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const priority = document.getElementById("priority").value;

    if (taskInput === "") {
        alert("Por favor, adicione uma tarefa!");
        return;
    }

    const newTask = {
        text: taskInput,
        priority: priority,
        completed: false,
    };

    const docRef = await addDoc(tasksCollection, newTask);

    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    listItem.classList.add(priority);
    listItem.setAttribute("data-id", docRef.id);
    listItem.innerHTML = `
        ${taskInput}
        <div class="task-actions">
            <button onclick="editTask(this)"><i data-feather="edit"></i></button>
            <button onclick="deleteTask(this)"><i data-feather="trash-2"></i></button>
            <button onclick="completeTask(this)"><i data-feather="check"></i></button>
        </div>
    `;
    taskList.appendChild(listItem);
    document.getElementById("taskInput").value = "";
    feather.replace();
}

// Função para editar uma tarefa
async function editTask(button) {
    const listItem = button.parentElement.parentElement;
    const taskId = listItem.getAttribute("data-id");
    const taskText = prompt("Edite sua tarefa:", listItem.firstChild.textContent.trim());

    if (taskText) {
        await updateDoc(doc(db, "to_do_list", taskId), { text: taskText });
        listItem.firstChild.textContent = taskText;
    }
}

// Função para excluir uma tarefa
async function deleteTask(button) {
    const listItem = button.parentElement.parentElement;
    const taskId = listItem.getAttribute("data-id");

    await deleteDoc(doc(db, "to_do_list", taskId));
    listItem.remove();
}

// Função para marcar uma tarefa como concluída
async function completeTask(button) {
    const listItem = button.parentElement.parentElement;
    const taskId = listItem.getAttribute("data-id");

    await updateDoc(doc(db, "to_do_list", taskId), { completed: true });
    listItem.style.textDecoration = "line-through";
    listItem.querySelector(".task-actions").remove();
}

// Carrega as tarefas ao inicializar a página
document.addEventListener("DOMContentLoaded", loadTasks);

// Deixa as funções globais
window.addTask = addTask;
window.editTask = editTask;
window.completeTask = completeTask;
window.deleteTask = deleteTask;