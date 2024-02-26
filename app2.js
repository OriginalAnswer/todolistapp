let mainArr = JSON.parse(localStorage.getItem('100tools_todoapp')) || {};

const todolists = document.querySelector('.todolist');
function addTask(e){
    event.preventDefault();
    const date = Date.now();
    const listID = 'list' + String(date); 
    const v = document.getElementById('input-todo');
    const li = document.createElement('li');
    li.innerHTML = `
    <label for="${listID}">
        <input type="checkbox">
    </label>
    <span id='${listID}'>${v.value}</span>
    <button>x</button>
    `;
    todolists.appendChild(li);
}