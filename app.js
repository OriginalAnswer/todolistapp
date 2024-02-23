let mainArr = JSON.parse(localStorage.getItem('100tools_todoapp')) || [];
const main = document.querySelector('main');

document.getElementById('addCard').addEventListener('click', function() {
    const cardName = prompt("Enter card name:");
    if (cardName) {
      createCard(cardName);
    }
  });

function updateLocalStorage() {
    localStorage.setItem('100tools_todoapp', JSON.stringify(mainArr));
}
function createCard(cardName) {
    const cardId = cardName + String(Date.now());
    mainArr.push({
        [cardId]: [
        { todolist: [] },
        { donelist: [] }
        ]
    });
    updateLocalStorage();
    const cardHTML = `
        <div class="card" id="${cardId}">
            <div class="card-header">
            <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
            <h3>${cardName}</h3>
            
            <div class="todolist-container">
                <div class="todolist" id="todo_${cardId}">        
                </div>

                <form class="todo-input-container" onsubmit="addTask('${cardId}')" >
                    <label for="input_${cardId}">
                        <i class="fa-solid fa-pen"></i>
                    </label>
                    <input type="text" id="input_${cardId}" placeholder="Enter task" class="todo-input" required>
                    <button type="submit">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </form>
            </div>

            <div class="listbar"></div>

            <div class="donelist" id="done_${cardId}"></div>
        </div>
        `;
    main.insertAdjacentHTML('beforeend', cardHTML);
}


function addTask(cardId) {
    const input = document.getElementById(`input_${cardId}`);
    const taskName = input.value;
    if (taskName) {
      const taskId = taskName + Date.now();
      const todoList = document.getElementById(`todo_${cardId}`);
      const taskHTML = `
        <div class="todo-item" id="${taskId}">
          <input type="checkbox" onchange="moveToDone('${cardId}', '${taskId}')">
          <span>${taskName}</span>
          <button onclick="deleteTask('${cardId}', '${taskId}')">Delete</button>
        </div>
      `;
      todoList.insertAdjacentHTML('beforeend', taskHTML);

      // 로컬 스토리지에 할 일 추가
      const cardIndex = mainArr.findIndex(card => Object.keys(card)[0] === cardId);
      if (cardIndex !== -1) {
        mainArr[cardIndex][cardId][0].todolist.push({ id: taskId, name: taskName });
        updateLocalStorage();
      }
      input.value = '';
    }
}
  

function moveToDone(cardId, taskId) {
    const task = document.getElementById(taskId);
    const doneList = document.getElementById(`done_${cardId}`);
    setTimeout(() => {
      task.classList.add('done-item');
      task.querySelector('input').disabled = true;
      doneList.appendChild(task);

      // mainArr에서 할 일 이동
      const cardIndex = mainArr.findIndex(card => Object.keys(card)[0] === cardId);
      if (cardIndex !== -1) {
        const taskIndex = mainArr[cardIndex][cardId][0].todolist.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          const movedTask = mainArr[cardIndex][cardId][0].todolist.splice(taskIndex, 1)[0];
          mainArr[cardIndex][cardId][1].donelist.push(movedTask);
          updateLocalStorage();
        }
      }
    }, 2000);
  }

  function deleteTask(cardId, taskId) {
    const task = document.getElementById(taskId);
    task.remove();

    // mainArr에서 할 일 삭제
    const cardIndex = mainArr.findIndex(card => Object.keys(card)[0] === cardId);
    if (cardIndex !== -1) {
      const todoIndex = mainArr[cardIndex][cardId][0].todolist.findIndex(task => task.id === taskId);
      if (todoIndex !== -1) {
        mainArr[cardIndex][cardId][0].todolist.splice(todoIndex, 1);
        updateLocalStorage();
      }
    }
  }


  // 페이지 로드 시 mainArr에서 카드 복원
  window.onload = function() {
    mainArr.forEach(card => {
      const cardId = Object.keys(card)[0];
      const cardName = cardId.split('-')[0];
      createCard(cardName);

      card[cardId][0].todolist.forEach(task => {
        const todoList = document.getElementById(`todo_${cardId}`);
        const taskHTML = `
          <div class="todo-item" id="${task.id}">
            <input type="checkbox" onchange="moveToDone('${cardId}', '${task.id}')">
            <span>${task.name}</span>
            <button onclick="deleteTask('${cardId}', '${task.id}')">Delete</button>
          </div>
        `;
        todoList.insertAdjacentHTML('beforeend', taskHTML);
      });

      card[cardId][1].donelist.forEach(task => {
        const doneList = document.getElementById(`done_${cardId}`);
        const taskHTML = `
          <div class="done-item" id="${task.id}">
            <input type="checkbox" checked disabled>
            <span>${task.name}</span>
            <button onclick="deleteTask('${cardId}', '${task.id}')">Delete</button>
          </div>
        `;
        doneList.insertAdjacentHTML('beforeend', taskHTML);
      });
    });
  }