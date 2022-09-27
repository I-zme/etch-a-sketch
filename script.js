const container = document.querySelector('.container');

const newSketchButton = document.getElementById('newSketch');
newSketchButton.addEventListener('click',newSketchFunction);

const refreshButton = document.getElementById('refresh');
refreshButton.addEventListener('click', refreshFunction);

const randomButton = document.getElementById('random');
randomButton.addEventListener('click', ()=>{
    if(container.classList.length>1){
        container.classList.remove(container.classList[1]);
    }
    container.classList.add('randomColor');
});

const grayscaleButton = document.getElementById('grayscale');
grayscaleButton.addEventListener('click',()=>{
    if(container.classList.length>1){
        container.classList.remove(container.classList[1]);
    }
    container.classList.add('darkenColor');
});

let currentSquareID=0;
// let squares;
// let game;
// let round=0;
// let newround=0;

window.addEventListener('load',()=>{
    createSquares(16);
});




container.addEventListener('DOMNodeInserted',()=>{
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
            break
        case "ArrowUp":
        case "w":
        case "W":
            if(currentSquareID<=numberOfSquares)break
            currentSquareID = currentSquareID-numberOfSquares;
            square = document.getElementById(currentSquareID);
            colorSquare(square);
            break

        case "ArrowLeft":
        case "a":
        case "A":
            if(currentSquareID<=1)break
            currentSquareID = currentSquareID-1;
            square = document.getElementById(currentSquareID);
            colorSquare(square);
            break
        case "ArrowRight":
        case "d":
        case "D":
            if(currentSquareID>=numberOfSquares**2)break
            currentSquareID = currentSquareID+1;
            square = document.getElementById(currentSquareID);
            colorSquare(square);
            break
    }
    

});




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

function newRound(numberOfSquares){
    currentSquareID=0;
    container.replaceChildren();
    if(container.classList.length>1){
        container.classList.remove(container.classList[1]);
    }
    // round+=1;
    createSquares(numberOfSquares);
}

function newSketchFunction(){
    do{
        numberOfSquares = prompt("Enter the number of squares per row,\n remember it can only go up to 100!");
    }
    while(numberOfSquares>100);
    newRound(numberOfSquares);
    // etchASketch(round);
}

function refreshFunction(){
    const squares = document.querySelectorAll('.square');
    let currentSquareSide = Math.sqrt(squares.length);
    newRound(currentSquareSide);
    // etchASketch(round);
}


