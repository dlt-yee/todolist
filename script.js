let saveBtnEl = document.querySelector('.btn-add');
let deleteBtnEl = document.querySelector('.btn-delete');
let editBtnEl = document.querySelector('.btn-edit');
let taskList = document.querySelector('.list');
let btnCompleteEdit = document.querySelector('.btn-complete-edit');

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemElems =[];

saveBtnEl.addEventListener('click', () => {
    addTask()
})

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Ф-ция обновления локального хранилища
}

function addTask() {
    let titleInputEl = document.querySelector('.title-input')
    let descriptionInputEl = document.querySelector('.description-input')
    let obj = {
        title: titleInputEl.value,
        description: descriptionInputEl.value,
        completed: false,
    }
    
    if (titleInputEl.value !== '' && descriptionInputEl.value !== '') {
        tasks.push(obj)
        window.localStorage.setItem('tasks', JSON.stringify(tasks))
        fillHTMLlist()
        titleInputEl.value = ''
        descriptionInputEl.value = ''
    }

    // Ф-ция добавления задачи
}

const createTemplate = (tasks, index) => {
    return `
        <li class="list-item ${tasks.completed ? 'checked' : ''}">
            <input onClick="completeTask(${index})" class="btn-complete" type="checkbox" ${tasks.completed ? 'checked' : ''}>
            <div class="task-block">
                <div class="title-block">
                    <p class="title">${tasks.title}</p>
                </div>
            <div class="line"></div>
            <div class="description-block">
                <p class="description">${tasks.description}</p>
            </div>
            </div>
            <div class="btn-block">
                <button onclick="editTask(${index})" class="btn-edit"><img class="miniicon-edit" src="./src/assets/edit-icon.svg"></button>
                <button onclick="deleteTask(${index})" class="btn-delete"><img class="miniicon-delete" src="./src/assets/delete-icon.svg"></button>
            </div>
        </li>
    `
    // Шаблон задачи
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHTMLlist();

    // Ф-ция логического описания сделанных и не сделанных задач
}

const filterTask = ()=> {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];

    // Ф-ция сортировки задач (сначала показывает не сделанные)
}

const fillHTMLlist = () => {
    taskList.innerHTML = 'Add your first task!';
    if (tasks.length > 0) {
        taskList.innerHTML = '';
        filterTask();
        tasks.forEach((item, index) => {
            taskList.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.list-item')
    }

    // Ф-ция отрисовки списка задач
}

fillHTMLlist();

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');
    setTimeout(() =>{
        tasks.splice(index, 1);
        updateLocal();
        fillHTMLlist();
    }, 300)

    // Ф-ция удаления задачи
}

const deleteAll = () => {
    taskList.classList.add('delition');
    setTimeout(() =>{
        tasks = [];
        updateLocal();
        fillHTMLlist();
    }, 300)
    saveBtnEl.classList.remove('editing')
    btnCompleteEdit.classList.remove('editing')
    
    // Ф-ция очистки всех задач
}

let editedTask;
const editTask = index => {
    let titleInputEl = document.querySelector('.title-input')
    let descriptionInputEl = document.querySelector('.description-input')
    titleInputEl.value = tasks[index].title;
    descriptionInputEl.value = tasks[index].description;

    saveBtnEl.classList.add('editing')
    btnCompleteEdit.classList.add('editing')

    editedTask = index;

    // Ф-ция которая вставляет в инпуты задачу которую нужно изменить
}

const completeEdit = index => {
    let titleInputEl = document.querySelector('.title-input')
    let descriptionInputEl = document.querySelector('.description-input')

    index = editedTask;
    if (titleInputEl.value !== '' && descriptionInputEl.value !== '') {
    tasks[index].title = titleInputEl.value;
    tasks[index].description = descriptionInputEl.value;
    }
    updateLocal();
    fillHTMLlist();

    titleInputEl.value = '';
    descriptionInputEl.value = '';

    saveBtnEl.classList.remove('editing')
    btnCompleteEdit.classList.remove('editing')

    // Ф-ция подтверждения изменений
}
