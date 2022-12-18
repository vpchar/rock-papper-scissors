let rules = {
     logic: {
        f1beats: 2, //by default rock beats scissors etc.
        f2beats: 3,
        f3beats: 1
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
console.log('test')
rules.save();
rules.load();
console.log(rules.names)
console.log(rules.logic)
rules.defaults();