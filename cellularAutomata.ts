const width = 100;
const height = 100;
const itterations = 10;

const gameField = document.getElementById('game-field');

const replayButton = document.getElementById('replay') as HTMLButtonElement;

setTimeout(() => {
    replayButton.disabled = false;
}, 5000)

replayButton?.addEventListener('click', () => {
    startGame();
})


const field = Array(height).fill(0).map(i => Array(height).fill(0).map(i => Math.floor(Math.random() * 2)));

const fillGameField = () => {
    gameField!.innerHTML = '';
    for(let i = 0; i < field.length; i++) {
        for(let j = 0; j < field.length; j++) {
            const divElement = document.createElement('div');
            if(field[i][j] === 1) {
                divElement.className = 'live';
            } else if (field[i][j] === 0) {
                divElement.className = 'dead';
            }
            gameField?.appendChild(divElement);
        }
    }
}

fillGameField();

const startGame = () => {
    let executeCount = 0;
    const interval = setInterval(() => {
        game();
        fillGameField();
        if(executeCount >= itterations) {
            clearInterval(interval)
        }
        executeCount++;
    }, 1000)
}

startGame();

const game = () => {
 for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
        if(field[i][j] === 0) {
            continue;
        } else {
            processGame(i, j);
        }
    }
 }   
}

const processGame = (widthIndex: number, heightIndex: number) => {
    const leftUpperDiagonal = [-1, -1];
    const rightUpperDiagonal = [1, -1];
    const leftDownDiagonal = [-1, 1];
    const rightDownDiagonal = [1, 1];

    let digonalValueCount = 0;
    
    const leftUpperValue = getDiagonalValue(widthIndex, heightIndex, leftUpperDiagonal);
    const rightUpperValue = getDiagonalValue(widthIndex, heightIndex, rightUpperDiagonal);
    const leftDownValue = getDiagonalValue(widthIndex, heightIndex, leftDownDiagonal);
    const rightDownValue = getDiagonalValue(widthIndex, heightIndex, rightDownDiagonal);

    if(leftUpperValue) {
        digonalValueCount++;
    }
    if(rightUpperValue) {
        digonalValueCount++;
    }
    if(leftDownValue) {
        digonalValueCount++;
    }
    if(rightDownValue) {
        digonalValueCount++;
    }

    setValue(widthIndex, heightIndex, digonalValueCount);
}

const getDiagonalValue = (widthIndex: number, heightIndex: number, diagonalPosition: number[]) => {
    const diagonalWidthIndex = widthIndex + diagonalPosition[0];
    const diagonalHeightIndex = heightIndex + diagonalPosition[1];
    let value;
    if(isIndexValueValid(diagonalWidthIndex, diagonalHeightIndex)) {
        value = field[diagonalWidthIndex][diagonalHeightIndex];
        return value;
    }
    return 0;
}

const isIndexValueValid = (widthIndex: number, heightIndex: number) => {
    if(widthIndex > width - 1 || widthIndex < 0 || heightIndex > height - 1 || heightIndex < 0) {
        return false;
    } else {
        return true;
    }
}

const setValue = (widthIndex: number, heightIndex: number, diagonalValueCount: number) => {
    if(diagonalValueCount < 2) {
        field[widthIndex][heightIndex] = 0;
    } else {
        return;
    }
}