let players = [];
}


function updateHP(index, hp) {
players[index].hp = parseInt(hp);
}


function addCondition(index, cond) {
if(cond.trim() !== '') {
players[index].conditions.push(cond);
renderPlayers();
}
}


function startCombat() {
if(players.length === 0) return;
players.sort((a,b) => b.init - a.init);
currentIndex = 0;
round = 1;
updateTurnIndicator();
renderPlayers();
}


function resortByInitiative() {
players.sort((a,b) => b.init - a.init);
renderPlayers();
}


function nextTurn() {
if(currentIndex === -1) return;
currentIndex++;
if(currentIndex >= players.length) {
currentIndex = 0;
round++;
}
updateTurnIndicator();
}


function endCombat() {
currentIndex = -1;
round = 0;
document.getElementById('turnIndicator').innerText = 'Combate encerrado.';
document.getElementById('roundCounter').innerText = 'Rodada: 0';
}


function updateTurnIndicator() {
if(currentIndex >= 0) {
document.getElementById('turnIndicator').innerText = `Vez de: ${players[currentIndex].name}`;
document.getElementById('roundCounter').innerText = `Rodada: ${round}`;
}
}


function enableDragAndDrop() {
const list = document.getElementById('playersList');
list.addEventListener('dragover', e => {
e.preventDefault();
const dragging = document.querySelector('.dragging');
const afterElement = getDragAfterElement(list, e.clientY);
if(afterElement == null) {
list.appendChild(dragging);
} else {
list.insertBefore(dragging, afterElement);
}
});


list.addEventListener('drop', () => {
const newOrder = [];
document.querySelectorAll('.player').forEach(li => {
const idx = li.dataset.index;
newOrder.push(players[idx]);
});
players = newOrder;
renderPlayers();
});
}


function getDragAfterElement(container, y) {
const draggableElements = [...container.querySelectorAll('.player:not(.dragging)')];
return draggableElements.reduce((closest, child) => {
const box = child.getBoundingClientRect();
const offset = y - box.top - box.height/2;
if(offset < 0 && offset > closest.offset) {
return { offset: offset, element: child };
} else {
return closest;
}
}, { offset: Number.NEGATIVE_INFINITY }).element;
}