$.getJSON('states.json', function (data) {
    states = data;
}).then(function () {
    processCurrentYear();
});


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

function getTextForVote(vote) {
    let party = vote.party;
    if (party != "") {
        return "    " + party + "(" + vote.candidate + ")" + ":" + vote.votes
    }
    else {
        return "    " + "write-in:" + vote.votes
    }
}

function getElectionTextForState(state) {
    let yearIndex = $("#currYearInput").val() / 4 - 494
    let stateVoteDataForYr = state.years[yearIndex].votes
    let maxIndex = 0;
    var txt = [];

    // this will not work for stateVoteDataForYear that's empty (add further protections later)
    txt.push("" + state.name + " " + state.years[yearIndex].year + " voting results:");
    txt.push(getTextForVote(stateVoteDataForYr[0]))
    for (var k = 1; k < stateVoteDataForYr.length; k++) {
        let vote = stateVoteDataForYr[k];
        if (vote.votes > stateVoteDataForYr[maxIndex]) {
            maxIndex = k
        }
        txt.push(getTextForVote(vote))
    }
    txt.splice(1, 0, txt[maxIndex+1])
    txt.splice(maxIndex+1, 1)
    return txt;
}

function updateElectionInfoText(d, txt) {
    d3.select("#infoTextGroup").selectAll("text").remove();
    d3.select("#infoTextGroup").append("text")
        .text(txt[0])
        .attr("x", 10)
        .attr("y", 20)
        .style("font-size", "14px");
    d3.select("#infoTextGroup").append("text")
        .text(txt[1])
        .attr("x", 30)
        .attr("y", 20 + 18)
        .style("font-size", "12px")
        .style("font-weight", "bold")
    for (var i = 2; i < txt.length; i++) {
        d3.select("#infoTextGroup").append("text")
            .text(txt[i])
            .attr("x", 30)
            .attr("y", 20 + 18 * i)
            .style("font-size", "12px");
    }
    
}

function processCurrentYear() {
    getAllWinningParties();
    for (state of states) {
        let abbrev = state.abbrev;
        let txt = getElectionTextForState(state)
        d3.select("#country" + abbrev).on("mouseover", function(d) {
            updateElectionInfoText(d, txt)
            d3.select("#countryLabel" + d.properties.postal).style("visibility", "visible");
        });
        d3.select("#country" + abbrev).on("mouseout", function (d) {
            d3.select("#infoTextGroup").selectAll("text").remove();
            d3.select("#countryLabel" + d.properties.postal).style("visibility", "hidden");
        });
        d3.select("#countryLabel" + abbrev).on("mouseover", function(d) {
            updateElectionInfoText(d, txt)
            d3.select("#countryLabel" + d.properties.postal).style("visibility", "visible");
        })
        d3.select("#countryLabel" + abbrev).on("mouseout", function(d) {
            d3.select("#infoTextGroup").selectAll("text").remove();
            d3.select("#countryLabel" + d.properties.postal).style("visibility", "hidden"); 
        })
    }
}

function getAllWinningParties() {
    d3.selectAll(".country").classed("republican", false);
    d3.selectAll(".country").classed("democrat", false);
    d3.selectAll(".country").classed("other", false);
    for (state of states) {
        let win = getWinningParty(state.name);
        if (win === "republican") {
            d3.select("#country" + state.abbrev).classed("republican", true);
        }
        else if (win === "democrat") {
            d3.select("#country" + state.abbrev).classed("democrat", true);
        }
        else {
            d3.select("#country" + state.abbrev).classed("other", true);
        }
    }
}

function getWinningParty(state) {
    var max = 0;
    var maxParty = "hi";
    for (var i = 0; i < states.length; i++) {
        if (states[i].name === state) {
            for (party of states[i].years[$("#currYearInput").val() / 4 - 494].parties) {
                let vote = {};
                for (var j = 0; j < states[i].years[$("#currYearInput").val() / 4 - 494].votes.length; j++) {
                    if (states[i].years[$("#currYearInput").val() / 4 - 494].votes[j].party === party)
                        vote = states[i].years[$("#currYearInput").val() / 4 - 494].votes[j];
                }
                if (vote.votes > max) {
                    max = +vote.votes;
                    maxParty = party;
                }
            }
        }
    }
    //console.log("The winning party for " + state + " for " + $("#currYearInput").val() + " is: " + maxParty);
    return maxParty;
}

function updateButton(button, clicked){
    button.innerText = (clicked) ? "Cancel" : "Animate";
    updateColor(button, button.value);
}

function updateColor(button, value){
    button.style.backgroundColor = (value == "1") ? "red" : "#525aff" /* blue */;
}

function revertColor(button){
    button.style.backgroundColor = 'white';
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const animateYears = async () => {
    var button = document.getElementById("animate");
    updateButton(button, true);
    for (var i = 1976; i <= 2016; i = i + 4) {
        if (button.value == "0"){
            updateButton(button, false);
            break;
        }
        document.getElementById("myRange").value = i;
        document.getElementById("currYearInput").value = i;
        processCurrentYear()
        await delay(700);
    }

};
