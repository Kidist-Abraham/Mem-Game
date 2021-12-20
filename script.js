const gameContainer = document.getElementById("game");
const startButton = document.querySelector("#start-button")
const resetButton = document.querySelector("#reset-button")
const scoreH4 = document.querySelector("#score")
const bestScoreH4 = document.querySelector("#bestScore")
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let boxsClicked=[]
let colorsMatched =[]
let score = 0

const scoreSpan = document.createElement("span")
scoreSpan.innerHTML="0"
scoreH4.append(scoreSpan)

bestScoreSpan = document.createElement("span")
bestScoreSpan.innerHTML= localStorage.getItem("score")
bestScoreH4.append(bestScoreSpan)

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card

function createDivsForColors(colorArray) {
  let count =1
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.setAttribute("data-color",color)
    newDiv.setAttribute("data-id", count++)
  

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

startButton.addEventListener("click",()=>{
  gameContainer.innerHTML=""
  boxsClicked=[]
  colorsMatched =[]
  createDivsForColors(shuffledColors);
})

resetButton.addEventListener("click",()=>{
  gameContainer.innerHTML=""
  boxsClicked=[]
  colorsMatched =[]
  score=0
  scoreSpan.innerHTML=score
  bestScoreSpan.innerHTML= localStorage.getItem("score")
  shuffledColors = shuffle(COLORS)
  createDivsForColors(shuffledColors);

})

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let boxId= event.target.getAttribute("data-id")
  let boxColor= event.target.getAttribute("data-color")
  if(boxsClicked.length<2 && !boxsClicked.includes(boxId) && !colorsMatched.includes(boxColor) ){
    score++
    scoreSpan.innerHTML=score

    boxsClicked.push(boxId)
    event.target.classList.add(boxColor);

    if(boxsClicked.length==2){
      console.log("here")
      const firstBox = document.querySelector(`div[data-id="${boxsClicked[0]}"]`)
      const firstBoxColor = firstBox.getAttribute("data-color")
      const firstBoxId = firstBox.getAttribute("data-id")
      if (firstBoxColor!== boxColor){
        setTimeout(()=>{
          event.target.classList.remove(boxColor);
          firstBox.classList.remove(firstBoxColor)
          boxsClicked=  boxsClicked.filter(b=>b!== boxId && b!==firstBoxId)
        },1000)
      }
      else{
        colorsMatched.push(firstBoxColor)
        boxsClicked=[]
        if(COLORS.length / 2 === colorsMatched.length){
          if(localStorage.getItem("score")){
          if (score< parseInt(localStorage.getItem("score"))){
            localStorage.setItem("score", score)
          }
        }
        else{
          localStorage.setItem("score", score)
        }
          
        }
      }
   
    }

  }

}


