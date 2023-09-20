const X_Class='x'
const Circle_Class='circle'
const board=document.getElementById('board')
const Winning_Comb=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements=document.querySelectorAll('[data-cell]')
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
const winningMessageElement=document.getElementById('winning-message')
const restart=document.getElementById('restartButton')
let circleTurn
startGame()
restart.addEventListener('click',startGame)
function startGame()
{
    circleTurn=false
    cellElements.forEach(cell=>{
        cell.classList.remove(X_Class)
        cell.classList.remove(Circle_Class)
        cell.removeEventListener('click',handleclick)
        cell.addEventListener('click' , handleclick ,{once:true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
function handleclick(e)
{
    const cell=e.target
    let currentClass=circleTurn?Circle_Class : X_Class
    //place mark
    placeMark(cell,currentClass)
    if(checkWin(currentClass))
    {
        endGame(false)
        //console.log("Winner")
    }
    else if(isDraw())
    {
        endGame(true)
    }
    else 
    {
        swapTurns()
        setBoardHoverClass()
    }
    
}
function endGame(draw)
{
    if(draw) 
    {
        winningMessageTextElement.innerText="Draw!"
    }
    else{
        winningMessageTextElement.innerText=`${circleTurn ? "O's winner":"X's winner"}`
    }
    winningMessageElement.classList.add('show')
}
function isDraw()
{
    return [...cellElements].every(cell=>
        {
            return cell.classList.contains(X_Class)||cell.classList.contains(Circle_Class)
        })
}
function placeMark(cell,currentClass)
{
    cell.classList.add(currentClass)
}
function swapTurns()
{
    circleTurn=!circleTurn
}
function setBoardHoverClass()
{
    board.classList.remove(X_Class)
    board.classList.remove(Circle_Class)
    if(circleTurn)
    {
        board.classList.add(Circle_Class)
    }
    else board.classList.add(X_Class)
}
function checkWin(currentClass)
{
    return Winning_Comb.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}