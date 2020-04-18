
var myFunc = function() {
    debugger;
    alert("myFunct Has called");
    Array.from(document.getElementsByClassName('igx-checkbox__input')).forEach(function(element, index, array) {

        element.addEventListener("click", function() { 
       console.log(element.checked);
       console.log(document.getElementsByClassName("igx-checkbox igx-checkbox--checked").length);
        if(element.checked && document.getElementsByClassName("igx-checkbox igx-checkbox--checked").length==1 ) { 
           document.getElementById("deletBtn").disabled = true;
         }
       else {
           document.getElementById("deletBtn").disabled = false
       }
       
        }) 
       })
}


