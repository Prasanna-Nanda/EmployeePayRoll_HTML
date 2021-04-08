let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(methodType, url, callback, async = true, data=null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log(methodType+"State Changed Called. Ready State: "+
        xhr.readyState+"Status:" +xhr.status);
        if (xhr.readyState == 4) {
            // Matching all 200 series responses
            if (xhr.status === 200 || xhr.status === 201) {
                    callback(xhr.responseText);
            }else if (xhr.status >= 400) {
                console.log("handle 400 Client Error or 500 Server Error");
            }
            
            
        }
    }

xhr.open(methodtype, url,async);
if(data) {
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}else xhr.send();
console.log(methodtype+"request sent to the serverat" +showTime());
}

const getURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data){
    console.log("Get User Data at: "+showTime()+ "data: " +data)
}

makeAJAXCall("GET",getURL, getUserDetails);

const deleteURL = "http://localhost:3000/employees/4";
function userDeleted(data){
    console.log(":\User Deleted" +data)

}
makeAJAXCall("DELETE", deleteURL,userDeleted, false);

const postURL = "http://localhost:3000/employees";
const emplData = {"name": "Harry", "Salary": "5000"};
function userAdded(data){
    console.log("User Added: " +data)
}

makeAJAXCall("POST",postURL, userAdded,true,emplData);


console.log("Made GET AJAX Call to Server at"+showTime());

