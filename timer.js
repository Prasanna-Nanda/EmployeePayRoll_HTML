function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + 
    date.getMinutes() + "Mins:" + 
    date.getSeconds()+ "Secs";

}

function showSessionsExpire() {
    console.log("Acitivity-B: Your Session expired at " +showTime());

}

console.log("Acitivity-A: trigerring Activity-B at " +showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity-a: Triggered Activity-B at "+showTime()+"will execute after 5 seconds");
