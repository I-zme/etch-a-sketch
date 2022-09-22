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

createSquares(16)