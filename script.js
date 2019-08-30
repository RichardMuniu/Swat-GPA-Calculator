var submitBtn = document.getElementById("submit-btn");
var resetBtn = document.getElementById("reset-btn");
var dataField = document.getElementById("input");
var output = document.getElementById("output");

submitBtn.addEventListener("click", submit);
document.addEventListener("keydown", (event) => {
    if (event.which == 13) submit();
});
resetBtn.addEventListener("click", () => {
    output.innerHTML = "";
    dataField.value = "", dataField.focus();
    output.style.backgroundColor = "white";
    output.style.background= "none";
});



function submit() {
    if (dataField.value == "") {
        output.innerHTML = "Requires text from mySwat above!";
        output.style.backgroundColor = "lightcoral";
    } else {
        var gpa =  calcGPA(dataField.value);
    }
}

function calcGPA(text) {
    console.log(text);
    try {    
        var gradeMapper = {"A+": 4.0,
                        "A" : 4.0, 
                        "A-": 3.7,
                        "B+": 3.3, 
                        "B" : 3.0, 
                        "B-": 2.7,    
                        "C+": 2.3, 
                        "C" : 2.0, 
                        "C-": 1.7,    
                        "D+": 1.3, 
                        "D" : 1.0, 
                        "D-": 0.7,
                        "F" : 0.0};

        var matches = text.match(/	\d?(?:\.\d)?	[A-Z][^A-Z][+\-]?/);
        console.log(matches);
        var splitMatches = matches.map(match => match.split("	"));
        splitMatches.forEach(match => {
            match.pop(); // remove empty char at end
            match.shift(); // remove empty char at start
        })

        // Now matches are of the form ["credits", "grade"] with well defined indexing. 
        // We now start accumulating.
        var totalCreds = 0.0;
        var totalGPs = 0.0;
        splitMatches.forEach(matchPair => {
            if (matchPair.length == 2) { // prevent errors from bad input or previous parses
                console.log(matchPair);
                totalCreds += parseFloat(matchPair[0]);
                totalGPs += gradeMapper[matchPair[1]];
            } 
        });
        var gpa = parseFloat(totalGPs/totalCreds);
        var result = `Your GPA is ${gpa.toFixed(2)}`; 
        result += `<br><h5>Total Credits: ${totalCreds.toFixed(2)}`;
        result += "<br><h6>Thanks for using our site!";
        output.innerHTML = result;
        output.style.background = "linear-gradient(to bottom, lightblue, cyan)"; 
    } 
    catch(error) {
        output.innerHTML = "Parsing Error :( <br>Please reset and try again.";
        output.style.backgroundColor = "lightcoral";
        console.log(error);
    };
}
