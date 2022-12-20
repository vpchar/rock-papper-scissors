
let rules = {
     logic: {
        f1beats: 2, //rules of the game
        f2beats: 3,
        f3beats: 1,
    },

     names:{
        f1name: "JavaScript", //we want user to be able to change those
        f2name: "C++",
        f3name: "Binary"
    },
    save(){
        //.stringify() will pack the whole data object in one line
        localStorage.setItem("logic",JSON.stringify(this.logic));
        localStorage.setItem("names",JSON.stringify(this.names));
    },
    load(){
        //if there is saved data, use it; the .parse method explodes the string back to object
        const logic = JSON.parse(localStorage.getItem("logic"));
        const names = JSON.parse(localStorage.getItem("names"));
        if (logic!=null) this.logic = logic;
        if (names!=null) this.names = names;
    },
    defaults(){ //for the 'restore defaults' button
        //note that this is repetition of the default init. Can we optimise it?
        this.logic.f1beats= 2;
        this.logic.f2beats= 3;
        this.logic.f3beats= 1;
        this.names.f1name= "JavaScript";
        this.names.f2name= "C++";
        this.names.f3name= "Binary";
        localStorage.removeItem("logic");
        localStorage.removeItem("names");
    } 
}
let game = {
    userChoice: 0,
    computerChoice: 0,
    winner: 0,
    userGames: 0,
    computerGames: 0,
    winnerExplain:"",
    resultExplain: "",
    userSelected(e){
        if(e === 'a') {this.userChoice = 1}
        else if(e === 'b'){ this.userChoice = 2}
        else if( e === 'c'){ this.userChoice = 3}
        else {userChoice = 0;}
        // console.log(e);
        // console.log(this.userChoice)
    },
    computerSelected(){
        this.computerChoice= (Math.floor(Math.random() * 3))+1;
        //console.log(this.computerChoice)
    },
    returnWinner(){
        //current user/computer choice according to logic + explain why
        if (this.computerChoice >0 && this.computerChoice<4 && 
            this.userChoice >0 && this.userChoice<4 ){
                //input is OK
            }   else { 
                this.winner=-1;
                this.resultExplain="";
                return -1; //ERROR: wrong input
            }
        //check who wins
        if (Object.values(rules.logic)[ this.userChoice-1 ] == this.computerChoice){
            this.winner=1;
            this.winnerExplain="You Win!";
            this.userGames+=1;
            this.resultExplain=Object.values(rules.names)[ this.userChoice-1 ] 
                    + " beats "+Object.values(rules.names)[ this.computerChoice-1 ] 
            return 1; //you win
        } else if (Object.values(rules.logic)[ this.computerChoice-1 ] == this.userChoice){
            this.winner=2;
            this.computerGames+=1;
            this.winnerExplain="Computer Wins!";
            this.resultExplain=Object.values(rules.names)[ this.computerChoice-1 ] 
                + " beats "+Object.values(rules.names)[ this.userChoice-1 ] 
            return 2; //computer wins
        } else {
            this.winner=0;
            this.winnerExplain="Draw!";
            this.resultExplain="No Winner"
            return 0; //draw
        }
    }
}

//audio -- copy/paste in action from JavaScript30 example
function playSound(e){
    //console.log(e);
    //--used this to find srcElement.id below
    const audioPointer = document.querySelector(`audio[data-key="${e.srcElement.id}"]`);
    if(!audioPointer)return;
    audioPointer.currentTime = 0;
    audioPointer.play();
}

//attach click events to process user input:
const buttons = document.querySelectorAll('.button');
const buttons1 = document.querySelectorAll('.button1');
const result = document.querySelector('.result');
buttons.forEach(button =>{
    // console.log(button.id)
    button.addEventListener('click',(e)=>{
        //button.id clicked
        playSound(e);
        game.userSelected(button.id);
        game.computerSelected();
        if (game.returnWinner()>-1){
            //we have result, watch console to see how it works
          //  console.log(game);
           // console.log(rules.logic);
        }
        //mark selections
        button.classList.add('selected');
        buttons1.forEach(button1=>{
            //O(n*m) but who cares ;-)
            //there is MUCH faster, proper way to do this, but let KISS
            if(game.computerChoice==1 && button1.id=='a1'){button1.classList.add('selected');}
            else if(game.computerChoice==2 && button1.id=='b1'){button1.classList.add('selected');}
            else if(game.computerChoice==3 && button1.id=='c1'){button1.classList.add('selected');}
        });
        result.innerHTML="<strong>"+game.winnerExplain+' -- '+game.resultExplain+"</strong>"
                        +"<br />You - "+game.userGames+ ' | '
                        +" "+game.computerGames+" - Computer ";
        //finalize game if > 5
        if(game.computerGames>4 || game.userGames>4){
            //someone won
            if(game.computerGames>4){
                result.innerHTML+="<br /><h1>You Lost the Game!</h1>";
            } else {
                result.innerHTML+="<br /><h1>You Won the Game!</h1>"
            }
            //final cleanup
            game.computerGames = game.userGames = 0;
            const audio = document.getElementById('end');
            if(audio)audio.play();
        }
        //animate button clicks and  results...
        window.setTimeout(function(){
            button.classList.remove('selected');
            buttons1.forEach(button1=>{
                button1.classList.remove('selected');
            });
            
        },1000);
    })
});

//settings button
const settings = document.getElementById('settings');
const modal = document.querySelector('.modal');
const board = document.querySelector('.board');
const defaultBtn = document.getElementById('defaults');
const saveBtn= document.getElementById('save');
const cancelBtn= document.getElementById('cancel');

const f1 = document.getElementById('f1');
const f2 = document.getElementById('f2');
const f3 = document.getElementById('f3');
const b1 = document.getElementById('bu1');
const b2 = document.getElementById('bu2');
const b3 = document.getElementById('bu3');

function closeModal(){
    modal.style.display="none";
    board.style.display="flex";
}
function populateView(){
    //this sets the UI view
    const headTitle = document.getElementById('headTitle');
    const a = document.getElementById("a");
    const b = document.getElementById("b");
    const c = document.getElementById("c");
    const a1 = document.getElementById("a1");
    const b1 = document.getElementById("b1");
    const c1 = document.getElementById("c1");
    headTitle.textContent=rules.names.f1name+", "+rules.names.f2name+", "+rules.names.f3name;
    a.textContent=a1.textContent=rules.names.f1name;
    b.textContent=b1.textContent=rules.names.f2name;
    c.textContent=c1.textContent=rules.names.f3name;
}

rules.load();
populateView();

defaultBtn.addEventListener('click',(e)=>{
    //restore defaults
    closeModal();
    rules.defaults();
    populateView();
});
cancelBtn.addEventListener('click',(e)=>{
    closeModal();
});
saveBtn.addEventListener('click',(e)=>{
    //save settings
    closeModal();
    rules.names.f1name=f1.value;
    rules.names.f2name=f2.value;
    rules.names.f3name=f3.value;
    rules.logic.f1beats=b1.value;
    rules.logic.f2beats=b2.value;
    rules.logic.f3beats=b3.value;
    rules.save();
    populateView();
});

settings.addEventListener('click', (e) =>{
    //show modal   
    board.style.display="none"; 
    modal.style.display="flex";
    //load current rules
    f1.value=rules.names.f1name;
    f2.value=rules.names.f2name;
    f3.value=rules.names.f3name;
    b1.value=rules.logic.f1beats;
    b2.value=rules.logic.f2beats;
    b3.value=rules.logic.f3beats;
});




