const container = document.querySelector('.container');

function createSquares(numberOfSquares){
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

createSquares(16);


window.addEventListener('resize',()=>{
    const squares = document.querySelectorAll('.square');

    let newSquareSide = `${Math.floor(container.getBoundingClientRect()['width']/Math.sqrt(squares.length))}px`;
    squares.forEach(square=>{
        square.style.width = newSquareSide;
        square.style.height = newSquareSide;
    })
});
