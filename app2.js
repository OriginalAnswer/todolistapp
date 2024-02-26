let mainArr = JSON.parse(localStorage.getItem('100tools_todoapp')) || {};

const todolists = document.querySelector('.todolist');
function addTask(e){
    event.preventDefault();
    const date = Date.now();
    const listID = 'list' + String(date); 
    const v = document.getElementById('input-todo');
    const li = document.createElement('li');
    const btnX = document.createElement('button');

    li.id = listID;
    btnX.textContent = 'x';

    li.innerHTML = `
    <input type="checkbox" id='${listID}span' class='list-cb'>
    <label for="${listID}span">
        <span class='list-span'>${v.value}</span>
    </label>
    `;
    li.appendChild(btnX);
    todolists.appendChild(li);
    
    btnX.addEventListener('click', ()=>{
        const confirmDelete = confirm('정말로 삭제할까요?');
        if (confirmDelete) {
            li.remove();
                }
            }
    )
    v.value = '';
}