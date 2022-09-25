const container = document.querySelector('.container');
createSquares()
const squares = document.querySelectorAll('.square');

const newSketchButton = document.getElementById('newSketch');
newSketchButton.addEventListener('click',newSketchFunction);

const refreshButton = document.getElementById('refresh');
const randomButton = document.getElementById('random');
const grayscaleButton = document.getElementById('grayscale');


function createSquares(numberOfSquares=16){
    let squareSide = `${Math.floor(container.getBoundingClientRect()['width']
    /numberOfSquares)}px`;
    for(let i=1; i<=(numberOfSquares**2); i++){
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('id',`${i}`);
        square.style.width = squareSide;
        square.style.height = squareSide;
        container.appendChild(square);
    }
    
}




window.addEventListener('resize',()=>{

    let newSquareSide = `${Math.floor(container.getBoundingClientRect()['width']/Math.sqrt(squares.length))}px`;
    squares.forEach(square=>{
        square.style.width = newSquareSide;
        square.style.height = newSquareSide;
    })
});


squares.forEach((square)=>{
    square.addEventListener('mouseenter', ()=>{
        if(container.classList.contains('randomColor')){
            square.style.backgroundColor = randomSquareColor();
        }
        else if(container.classList.contains('darkenColor')){
            square.style.backgroundColor = darkeningSquare(square);
        }
        else{
            square.style.backgroundColor = 'black';
        }
    });
});


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


function newSketchFunction(){
    do{
        numberOfSquares = prompt("Enter the number of squares per row,\n remember it can only go up to 100!");
    }
    while(numberOfSquares>100);
    container.classList.add(numberOfSquares);
    squares.forEach((square)=>{square.remove()});
    createSquares(numberOfSquares)
}