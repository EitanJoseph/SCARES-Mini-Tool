function updateCurrYearSlider() {
    $("#currYearInput").val($("#myRange").val())
    processCurrentYear();
}

function updateCurrYearText() {
    let v = $("#currYearInput").val()
    if (v >= 1976 && v <= 2016) {
        $("#myRange").val($("#currYearInput").val())
        processCurrentYear();
    }
    else {
        $("#currYearInput").val(1996)
        $("#myRange").val(1996)
    }
    
}

function buildStates() {
    let states = new Array();
    // initialize 50 states
    // parse csv into each one
}

class State {

    constructor(/* csv data */) {
        this.years = new Array()        
        
    }

    

}



class ElectionYear {

}

function processCurrentYear() {
    
}

