let rules = {
     logic: {
        f1beats: 2, 
        f2beats: 3,
        f3beats: 1,
    },

     names:{
        f1name: "Paper", //we want user to be able to change those
        f2name: "Rock",
        f3name: "Scissors"
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
        this.logic.f1beats= 2;
        this.logic.f2beats= 3;
        this.logic.f3beats= 1;
        this.names.f1name= "Paper";
        this.names.f2name= "Rock";
        this.names.f3name= "Scissors";
        localStorage.removeItem("logic");
        localStorage.removeItem("names");
    } 
}
let game = {
    userChoice: 0,
    computerChoice: 0,
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
    }
}


//attach click events
const buttons = document.querySelectorAll('.button');
buttons.forEach(button =>{
    // console.log(button.id)
    button.addEventListener('click',(e)=>{
        //button.id clicked
        game.userSelected(button.id);
        game.computerSelected();
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