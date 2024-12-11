const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const map = document.getElementById('map');
const speed = 5;
const enemySpeedInitial = 2;
let enemySpeed = enemySpeedInitial;
let maxEnemySpeed = 5;
let x = 100;
let y = 100;
let enemyX = enemy.getBoundingClientRect().left;
let enemyY = enemy.getBoundingClientRect().top;
let points = 0;
let keys = {};
let object = createObject();

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});
addEventListener("DOMContentLoaded", (event) => {
  alert("!!!Zbierz jak najwięcej diamentów zanim zostaniesz złapany!!!");
});
function update() {
  const mapRect = map.getBoundingClientRect();
  const playerWidth = player.offsetWidth;
  const playerHeight = player.offsetHeight;

  if (keys['ArrowUp'] && y > 0) y -= speed;
  if (keys['ArrowDown'] && y + playerHeight < mapRect.height) y += speed;
  if (keys['ArrowLeft'] && x > 0) x -= speed;
  if (keys['ArrowRight'] && x + playerWidth < mapRect.width) x += speed;
  
  player.style.left = x + 'px';
  player.style.top = y + 'px';

  updateEnemyPosition();

  checkCollision();
  
  checkObjectCollection();

  if (enemySpeed < maxEnemySpeed) {
    enemySpeed += 0.001;
  }

  requestAnimationFrame(update);
}

function updateEnemyPosition() {

  const dx = x - enemyX;
  const dy = y - enemyY;


  let direction = '';


  if (Math.abs(dx) > Math.abs(dy)) {

    if (dx > 0) {
      direction = 'right';
    } else {
      direction = 'left';
    }
  } else {
 
    if (dy > 0) {
      direction = 'down';
    } else {
      direction = 'up';
    }
  }


  if (Math.abs(dx) > 0 && Math.abs(dy) > 0) {
    if (dx > 0 && dy > 0) {
      direction = 'down-right';
    } else if (dx < 0 && dy > 0) {
      direction = 'down-left';
    } else if (dx < 0 && dy < 0) {
      direction = 'up-left';
    } else if (dx > 0 && dy < 0) {
      direction = 'up-right';
    }
  }

  switch (direction) {
    case 'up':
      if (enemyY > 0) enemyY -= enemySpeed;
      break;
    case 'down':
      if (enemyY + enemy.offsetHeight < map.offsetHeight) enemyY += enemySpeed;
      break;
    case 'left':
      if (enemyX > 0) enemyX -= enemySpeed;
      break;
    case 'right':
      if (enemyX + enemy.offsetWidth < map.offsetWidth) enemyX += enemySpeed;
      break;
    case 'up-left':
      if (enemyX > 0 && enemyY > 0) {
        enemyX -= enemySpeed;
        enemyY -= enemySpeed;
      }
      break;
    case 'up-right':
      if (enemyX + enemy.offsetWidth < map.offsetWidth && enemyY > 0) {
        enemyX += enemySpeed;
        enemyY -= enemySpeed;
      }
      break;
    case 'down-left':
      if (enemyX > 0 && enemyY + enemy.offsetHeight < map.offsetHeight) {
        enemyX -= enemySpeed;
        enemyY += enemySpeed;
      }
      break;
    case 'down-right':
      if (enemyX + enemy.offsetWidth < map.offsetWidth && enemyY + enemy.offsetHeight < map.offsetHeight) {
        enemyX += enemySpeed;
        enemyY += enemySpeed;
      }
      break;
  }


  enemy.style.left = enemyX + 'px';
  enemy.style.top = enemyY + 'px';
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();
  if (
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top
  ) {
    alert(`Koniec gry! Zebrałeś po drodze ${points} diamentów,\naby zresetować grę przeładuj stronę(f5) i kliknij ok`);
  }
}

function checkObjectCollection() {
  const objectRect = object.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();
  if (
    playerRect.left < objectRect.right &&
    playerRect.right > objectRect.left &&
    playerRect.top < objectRect.bottom &&
    playerRect.bottom > objectRect.top
  ) {
    points++;
    object.remove();
    object = createObject();
  }
}

function createObject() {
  const newObject = document.createElement('img');
  newObject.src = 'diament.jpg';
  newObject.style.position = 'absolute';
  newObject.style.width = '30px';
  newObject.style.height = '30px';
  newObject.style.left = Math.random() * (map.offsetWidth - 30) + 'px';
  newObject.style.top = Math.random() * (map.offsetHeight - 30) + 'px';
  map.appendChild(newObject);
  return newObject;
}

update();
