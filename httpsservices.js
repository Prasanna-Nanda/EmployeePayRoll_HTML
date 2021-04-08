let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data=null) {
    return new Promise(function (resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log(methodType+"State Changed Called. Ready State: "+
        xhr.readyState+"Status:" +xhr.status);
        if (xhr.readyState == 4) {
            // Matching all 200 series responses
            if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
            }else if (xhr.status >= 400) {
                reject({
                    status: xhr.status,
                    statustext: xhr.sattusText
                });
                console.log("XHR Failed");
                console.log("handle 400 Client Error or 500 Server Error");
            }
            
            
        }
    }

    xhr.onerror = function() {
        reject({
            status: this.status,
            statusText: Xhttp.statusText
        });
    }

xhr.open(methodtype, url, async);
if(data) {
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}else xhr.send();
console.log(methodtype+"request sent to the server at" +showTime());
});
} 
