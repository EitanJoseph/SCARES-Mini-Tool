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

var states = [];
var stateAbbreviations = [];
var numStates = 0;

function buildStates(data) {
    for(var i = 0; i<data.length; i++)
    {
        if(states[data[i]['state_po']] === undefined || states[data[i]['state-po']] === null) {
            states[data[i]['state_po']] = {
                name: data[i]['state'],
                abbrev: data[i]['state_po'],
                years: []
            }
            stateAbbreviations.push(data[i]['state_po']);
            numStates++;
        }
        if(states[data[i]['state_po']].years[data[i]['year']] === undefined ||
            states[data[i]['state_po']].years[data[i]['year']] === null) {
            states[data[i]['state_po']].years[data[i]['year']] = {
                year: data[i]['year'],
                totalVotes: data[i]['totalvotes'],
                votes: [],
                parties: [],
                winningParty: ""
            };
        }
        var vote = {
            party: data[i]['party'],
            candidate: data[i]['candidate'],
            votes: data[i]['candidatevotes']
        }
        if(states[data[i]['state_po']].years[data[i]['year']].votes[data[i]['party']] === undefined ||
            states[data[i]['state_po']].years[data[i]['year']].votes[data[i]['party']] === null) {
            states[data[i]['state_po']].years[data[i]['year']].votes[data[i]['party']] = vote;
            states[data[i]['state_po']].years[data[i]['year']].parties.push(data[i]['party']);
        }
    }
}

function processCurrentYear() {
    d3.csv("1976-2016-president.csv",buildStates);
    console.log(stateAbbreviations);
    console.log(states);
    for(state of stateAbbreviations) {
        console.log("Info for " + state + " for " + states[state].years[$("#currYearInput").val()].year + ":");
        for(party of states[state].years[$("#currYearInput").val()].parties) {
            let vote = states[state].years[$("#currYearInput").val()].votes[party];
            if(party != "") {
                console.log("    " + party + /*"(" + vote.candidate + ")" +*/ ": " + vote.votes);
            }
            else {
                console.log("    " + "write-in:" + /*"(" + vote.candidate + "): " + */vote.votes);
            }
        }
    }
    console.log("states:");
    console.log(states);
    console.log(states.indexOf("CA"));
    getWinningParty("CA");
}

function getInfoYear() { 
    for(state of stateAbbreviations) {
        console.log(states);
        console.log("Info for " + state + " for " + states[state].years[$("#currYearInput").val()].year + ":");
        for(party of states[state].years[$("#currYearInput").val()].parties) {
            let vote = states[state].years[$("#currYearInput").val()].votes[party];
            if(party != "") {
                console.log("    " + party + /*"(" + vote.candidate + ")" +*/ ": " + vote.votes);
            }
            else {
                console.log("    " + "write-in:" + /*"(" + vote.candidate + "): " + */vote.votes);
            }
        }
    }
}

function getWinningParty(state) {
    console.log(states);
    console.log(stateAbbreviations);
    
    var max = 0;
    var maxParty = "hi";
    if(state[states] != undefined) {
        for(party of states[state].years[$("#currYearInput").val()].parties) {
            let vote = states[state].years[$("#currYearInput").val()].votes[party];
            if(vote.votes > max) {
                max = vote.votes;
                maxParty = party;
            }
        }
        console.log("The winning party for " + state + " for " + $("#currYearInput").val() + " is: " + maxParty);
    }
    console.log(maxParty);
}