function completeItem(item) {
  const parent = item.parentNode;
  const completedItem = parent.querySelector('li.completed');
  if(completedItem) {
    parent.insertBefore(item, completedItem);
  } else {
    parent.appendChild(item);
  }
  item.className = 'completed';
}

function uncompleteItem(item) {
  const parent = item.parentNode;
  parent.insertBefore(item, parent.children[0]);
  item.className = 'todo';
}

function removeItem(item) {
  const parent = item.parentNode;
  parent.removeChild(item);
}

async function saveItem(text) {
  const result = await (await fetch('/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({text}),
  })).json();

  return result;
}

async function updateItem(id, state) {
  const result = await (await fetch('/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id, state}),
  })).json();

  return result;
}

const list = document.querySelector('ul.todolist');
const addItemBtn = document.getElementById('addItem');
const inputText = document.getElementById('itemText');

addItemBtn.addEventListener('click', async () => {
  const text = inputText.value;
  if(text) {
    const result = await saveItem(text);
    if(!result.err) {
      const item = document.createElement('li');
      item.className = 'todo';
      item.innerHTML = `${text}<button class="remove">${removeSVG}</button><button class="complete">${completeSVG}</button>`;
      list.insertBefore(item, list.children[0]);
      item.dataset.id = result._id;
      inputText.value = '';
      inputText.focus();
    } else {
      throw new Error(result.error);
    }
  }
});

window.addEventListener('keydown', (event) => {
  const code = event.code;
  if(code === 'Enter' || code === 'NumpadEnter') {
    addItemBtn.click();
  }
});

list.addEventListener('click', async ({target}) => {
  if(target.tagName === 'BUTTON' && target.className === 'complete') {
    const item = target.parentNode;
    const id = item.dataset.id;
    const state = item.className;
    if(state === 'todo') {
      const result = await updateItem(id, 1);
      completeItem(item);
    } else if(state === 'completed') {
      const result = await updateItem(id, 0);
      uncompleteItem(item);
    }
  } else if(target.tagName === 'BUTTON' && target.className === 'remove') {
    const item = target.parentNode;
    const id = item.dataset.id;
    const result = await updateItem(id, 2);
    removeItem(item);
  }
});