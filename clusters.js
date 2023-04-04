
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeStartCentriods() {
  while (centroids.length != centroidsCounter) {
    //Эта строчка исправила все проблемы (шлубокое копировние нахрен)
    const pointsClone = JSON.parse(JSON.stringify(points));
    let index = getRandomInRange(0, pointsClone.length - 1);
    if (!centroids.includes(pointsClone[index])) {
      centroids.push(pointsClone[index]);
    }
  }
  return centroids;
}

function dist(point1, point2) {
  return Math.abs(point2.y - point1.y) + Math.abs(point2.x - point1.x);
}

function kMean() {
  if (centroidsCounter == undefined) return;
  makeStartCentriods(centroidsCounter);

  for (let iterator = 0; iterator < 50; iterator++) {

    let distancePointsToCentroids = new Array(points.length);
    for (let i = 0; i < points.length; i++) {
      distancePointsToCentroids[i] = [];
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < centroidsCounter; j++) {
        let distance = dist(points[i], centroids[j]);
        distancePointsToCentroids[i].push(distance);
      }
    }
    console.log(distancePointsToCentroids);

    let tempArr = new Array(centroidsCounter);
    for (let i = 0; i < centroidsCounter; i++) {
      tempArr[i] = [];
    }

    for (let i = 0; i < points.length; i++) {
      let minDist = distancePointsToCentroids[i][0];
      let centroidIndex = 0;
      for (let j = 0; j < centroidsCounter; j++) {
        if (minDist > distancePointsToCentroids[i][j]) {
          minDist = distancePointsToCentroids[i][j];
          centroidIndex = j;
        }
      }
      tempArr[centroidIndex].push(points[i]);
    }

    for (let i = 0; i < centroidsCounter; i++) {
      let avgX = 0, avgY = 0;
      let countEl = 0;
      for (let j = 0; j < tempArr[i].length; j++) {
        avgX += Number(tempArr[i][j].x);
        avgY += Number(tempArr[i][j].y);
        countEl += 1;

      }
      avgX = Math.round(avgX / countEl);
      avgY = Math.round(avgY / countEl);
      centroids[i].x = avgX;
      centroids[i].y = avgY;
    }
      answer = tempArr;
    }
  }

function drawClusters() {
  for (let i = 0; i < centroidsCounter; i++) {
    for (let j = 0; j < answer[i].length; j++) {
      let y = answer[i][j].y;
      let x = answer[i][j].x;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, 2 * Math.PI);
      ctx.fillStyle = colors[i];
      ctx.fill();
    }
  }
}

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');

let centroidsCounter = 2;
let points = [];
let centroids = [];
let answer = [];
let colors = ['red', 'green', 'blue', 'pink', 'orange', 'darkBlue', 'purple', 'brown', 'gray'];

canvas.addEventListener('mousedown', function (event) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;

  ctx.beginPath();
  ctx.arc(x, y, 15, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  points.push({ y: y, x: x });
});

let findBtn = document.querySelector('.findClusters');
findBtn.addEventListener('click', function () {
  if (points.length == 0) {
    alert("Поле пустое!");
  }
  else {
    centroidsCounter = document.querySelector('.clusterCounter').value;
    if (centroidsCounter < 1) centroidsCounter = 1;
    if (centroidsCounter > 9) centroidsCounter = 9;
    kMean();
    drawClusters(centroidsCounter);

    for (let i = 0; i < centroidsCounter; i++) {
      let x = centroids[i].x;
      let y = centroids[i].y;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = 'yellow';
      ctx.fill();
    }
  }
})
let clearButton=document.querySelector('.clearMap');
clearButton.addEventListener('click', function(){
  var canvas = document.querySelector('.myCanvas');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
  centroidsCounter = undefined;
  points = [];
  centroids = [];
  answer = [];
})
let Astar = document.querySelector('.A-star');
Astar.addEventListener('click', function() {
  Astar.classList.add('clicked');
  setTimeout(function() {
    window.location.href = 'http://127.0.0.1:5500/astar.html';
  }, 500);
})
