const container = document.querySelector('.container');
const instructions = document.querySelector('.instructions');
const leftKnob = document.querySelector('.knob.left');
const rightKnob = document.querySelector('.knob.right');

const overlay = document.getElementById('overlay');
const modal = document.querySelector('.modal');
const submitButtom = document.querySelector('.submit');
const userInput = document.querySelector('.newSquareSide');
const closeModalButton = document.querySelector('[data-close-button]');

const newSketchButton = document.getElementById('newSketch');
const refreshButton = document.getElementById('refresh');
const randomButton = document.getElementById('random');
const grayscaleButton = document.getElementById('grayscale');
const hoveredButtons = document.querySelectorAll('.board button');

let currentSquareID = 0;
let numberOfSquares;
let horizontalDegree = 0;
let verticalDegree = 0;
let rotationDegree = 15;

const newSketchText = ["New Sketch:","Create a custom sized grid, e.g. '16' for a 16*16 grid."];
const refreshText =["Refresh:", "Resets the sketch, start again with the same grid."];
const randomColorText = ["Random:","Highlight the squares and see as they color at random!"];
const grayscaleText = ["Grayscale:", "Highlight the squares, each pass makes the square darker."];

//  button event listeners
refreshButton.addEventListener('click', ()=>{
    displayInstruction(refreshText);
    horizontalDegree = 0;
    verticalDegree = 0;
    refreshFunction();
});

randomButton.addEventListener('click', ()=>{
    grayscaleButton.classList.remove('clicked');
    if(container.classList.length>1){
        container.classList.remove(container.classList[1]);
    }
    container.classList.add('randomColor');
    randomButton.classList.add('clicked');
});

grayscaleButton.addEventListener('click',()=>{
    randomButton.classList.remove('clicked');
    if(container.classList.length>1){
        container.classList.remove(container.classList[1]);
    }
    container.classList.add('darkenColor');
    grayscaleButton.classList.add('clicked');
});

// modal and new sketch
newSketchButton.addEventListener('click',()=>{
    openModal(modal);
});

closeModalButton.addEventListener('click',()=>{
    closeModal(modal);
});

overlay.addEventListener('click',()=>{
    const modal = document.querySelector('.modal.active');
    closeModal(modal);
});

submitButtom.addEventListener('click', ()=>{
    submitUserInput();
});

document.addEventListener('keypress', (e)=>{
    if(modal.classList.contains('active')&&(e.key==='Enter')){
       submitUserInput();
    }
});

function submitUserInput(){
    if(userInput.value>100 || userInput.value<1)return
    numberOfSquares = userInput.value;
    newRound(numberOfSquares);
    closeModal(modal);
}

function openModal(modal){
    if(modal===null) return
    newSketchButton.classList.add('clicked');
    modal.classList.add('active');
    overlay.classList.add('active');
    instructions.classList.add('active');
    userInput.focus();
}

function closeModal(modal){
    if(modal===null) return
    userInput.value = '';
    newSketchButton.classList.remove('clicked');
    modal.classList.remove('active');
    overlay.classList.remove('active');
    instructions.classList.remove('active');
}

// display instruction upon hovering
newSketchButton.addEventListener('mouseenter', ()=>{
    displayInstruction(newSketchText);
});

refreshButton.addEventListener('mouseenter', ()=>{
    displayInstruction(refreshText);
});

randomButton.addEventListener('mouseenter', ()=>{
    displayInstruction(randomColorText);
});

grayscaleButton.addEventListener('mouseenter', ()=>{
    displayInstruction(grayscaleText);
});

hoveredButtons.forEach((button)=>{    
    button.addEventListener('mouseleave',()=>{
        if(button.classList.contains('clicked'))return
        else{
            displayInstruction('');
        }
    });
});

function displayInstruction(array){
    const temporaryTitle = document.querySelector('.temporaryTitle');
    const temporaryBody = document.querySelector('.temporaryBody');
    temporaryTitle.textContent = array[0];
    temporaryBody.textContent = array[1];
}


// knob movement
container.addEventListener('mousemove', (e)=>{
    if(e.movementX>0){
        horizontalDegree+=rotationDegree;
    }
    else if(e.movementX<0){
        horizontalDegree-=rotationDegree;
    }
    
    if(e.movementY>0){
        verticalDegree+=rotationDegree;
    }
    else if(e.movementY<0){
        verticalDegree-=rotationDegree;
    }

    leftKnob.style.transform = `rotate(${horizontalDegree}deg)`;
    rightKnob.style.transform = `rotate(${verticalDegree}deg)`;
});

// grid and game
window.addEventListener('load',()=>{
    createSquares(numberOfSquares = 16);
});


container.addEventListener('DOMNodeInserted',()=>{
    if(container.childElementCount===numberOfSquares**2){
    const squares = document.querySelectorAll('.square');

    numberOfSquares = Math.sqrt(squares.length);
    window.addEventListener('resize',()=>{
        let newSquareSide = `${container.getBoundingClientRect()['width']/Math.sqrt(squares.length)}px`;
        squares.forEach(square=>{
            square.style.width = newSquareSide;
            square.style.height = newSquareSide;
        })
    });

    squares.forEach((square)=>{
        square.addEventListener('mouseenter', ()=>{
            colorSquare(square);
            currentSquareID = Number(square.id);
        });
    });
}
});

document.addEventListener('keydown',(e)=>{
    let square;
    switch(e.key){
        case "ArrowDown":
        case "s":
        case "S":
            if(currentSquareID>=(numberOfSquares**2)-numberOfSquares)break
            currentSquareID = currentSquareID+numberOfSquares;
            square = document.getElementById(currentSquareID);
            colorSquare(square);
            verticalDegree-=rotationDegree;
            break
        case "ArrowUp":
        case "w":
        case "W":
            if(currentSquareID<=numberOfSquares)break
            currentSquareID = currentSquareID-numberOfSquares;
            square = document.getElementById(currentSquareID);
            colorSquare(square);
            verticalDegree+=rotationDegree;
            break

        case "ArrowLeft":
        case "a":
        case "A":
            if(currentSquareID<=1)break
            currentSquareID = currentSquareID-1;
            square = document.getElementById(currentSquareID);
            colorSquare(square);
            horizontalDegree-=rotationDegree;
            break
        case "ArrowRight":
        case "d":
        case "D":
            if(currentSquareID>=numberOfSquares**2)break
            currentSquareID = currentSquareID+1;
            square = document.getElementById(currentSquareID);
            colorSquare(square);
            horizontalDegree+=rotationDegree;
            break
    
    }
    leftKnob.style.transform = `rotate(${horizontalDegree}deg)`;
    rightKnob.style.transform = `rotate(${verticalDegree}deg)`;

});


// grid and game -- main functons (except newsketch)
function colorSquare(square){
    if(container.classList.contains('randomColor')){
        square.style.backgroundColor = randomSquareColor();
    }
    else if(container.classList.contains('darkenColor')){
        square.style.backgroundColor = darkeningSquare(square);
    }
    else{
        square.style.backgroundColor = '#000000';
    }
}

function randomSquareColor(){
    const randomColorNumber = Math.floor(Math.random()*16777215).toString(16);
    return ("#" + randomColorNumber);
}

function darkeningSquare(square){
    let currentColor = window.getComputedStyle(square).backgroundColor;
    let newShadeNumber = Number(currentColor.split(',')[1])-27;
    if(newShadeNumber<0){
        newShadeNumber=0;
    }
    const newColor = `rgb(${newShadeNumber},${newShadeNumber},${newShadeNumber})`;
    return newColor;
}

function createSquares(numberOfSquares){
    let squareSide = `${container.getBoundingClientRect()['width']
    /numberOfSquares}px`;
    
    for(let i=1; i<=(numberOfSquares**2); i++){
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('id',`${i}`);
        square.style.width = squareSide;
        square.style.height = squareSide;
        container.appendChild(square);
    }
}

function newRound(numberOfSquares){
    currentSquareID=0;
    container.replaceChildren();
    if(container.classList.length>1){
        container.classList.remove(container.classList[1]);
    }
    createSquares(numberOfSquares);
}

function refreshFunction(){
    const squares = document.querySelectorAll('.square');
    let currentSquareSide = Math.sqrt(squares.length);
    newRound(currentSquareSide);
}


