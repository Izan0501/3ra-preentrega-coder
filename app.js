const form = document.querySelector('#form')
const btn = document.querySelector('.btn-primary');
const inputTask = document.querySelector('#task');
const msgError = document.querySelector('.alert-danger');
const tasksContainer = document.querySelector('#tasksContainer');
const tasksTemplate = document.querySelector('#tasksTemplate');

let tasks = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

btn.addEventListener('click',(e) => {
    e.preventDefault();
    msgError.classList.add('d-none');

    if(!inputTask.value.trim()){
        msgError.classList.remove('d-none');
        return;
    }

    const task = inputTask.value;

    addTask(task);
});

const addTask = (task) => {
    const objectTask = {
        task: task,
        id: Date.now(),
    };

    tasks.push(objectTask);

    showTasks()
};

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        showTasks();
    }
})

const showTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));

    tasksContainer.textContent='';
    const fragment = document.createDocumentFragment();

    tasks.forEach((item) => {
        const clone = tasksTemplate.content.cloneNode(true);
        clone.querySelector('.lead').textContent = item.task;
        clone.querySelector('.btn-danger').dataset.id = item.id
        fragment.appendChild(clone);
    });

    tasksContainer.appendChild(fragment);
}

document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-danger')) {
        tasks = tasks.filter((item) => item.id !== parseInt(e.target.dataset.id));
        showTasks();
    }
});

