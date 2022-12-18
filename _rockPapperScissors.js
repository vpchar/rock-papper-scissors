// some global consts
const ROCK = 0, PAPER = 1, SCISSORS = 2, DRAW = 3, COMPWIN = 4, USRWIN = 5;
let names = ['ROCK','PAPER','SCISSORS']

// random pick
function getComputerChoice(){
    // random num between 0 and 2
    return Math.floor(Math.random() * 3)
}

//user input
function getUserChoice(userChoice = ''){
    userChoice = userChoice.toUpperCase();
    if(userChoice == 'ROCK'){
        return(ROCK);
    } else if(userChoice == 'PAPER'){
        return(PAPER);
    } else if(userChoice == 'SCISSORS'){
        return(SCISSORS);
    } else {
        return '';
    }
}
function compareChoices(user,computer){
    // console.log(user)
    // console.log(computer)
    if (user == NaN|| computer == NaN){
        console.log('Empty value.')
        return ''
    }
    switch(user){
        case(ROCK):
            if(computer==ROCK) return DRAW;
            if(computer==SCISSORS) return USRWIN;
            if(computer==PAPER) return COMPWIN;
        case(SCISSORS):
            if(computer==ROCK) return COMPWIN;
            if(computer==SCISSORS) return DRAW;
            if(computer==PAPER) return USRWIN;
        case(PAPER):
            if(computer==ROCK) return USRWIN;
            if(computer==SCISSORS) return COMPWIN;
            if(computer==PAPER) return DRAW;
        default:
            return '';
    }
}

let choice = NaN;
let result = NaN;
choice = prompt('Rock, Paper or Scissors?','')

let comp = getComputerChoice()
choice = getUserChoice(choice)
if (choice == NaN)result=NaN
else result = compareChoices(choice,comp);
// console.log(result)
switch(result){
    case(COMPWIN):
        console.log('You Lost! '+names[comp]+' beats '+names[choice])
        break;
    case(USRWIN):
        console.log('You WON! '+names[choice]+' beats '+names[comp])
        break
    case(DRAW):
        console.log('Hmm...a DRAW: '+names[choice]+' cannot beat '+names[comp])
        break
    default:
        console.log('Error')
}
/* tests
console.log(getComputerChoice())
console.log(getUserChoice('papEr'))
console.log(getUserChoice('ROck'))
console.log(getUserChoice('scissors')) */