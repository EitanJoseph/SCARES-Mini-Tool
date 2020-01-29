$.getJSON('states.json', function (data) {
    states = data;
}).then(function () {
    processCurrentYear();
});

// collects clicked state name
function updateStateColors(state, scalingFactors){
    var scalingFactor = scalingFactors.get(state.properties.name)*255;
    return "rgb("+scalingFactor+", "+scalingFactor+", "+scalingFactor+")"
    //console.log(state.properties.name);
   // return calculateScalingFactor(state.properties.name);
}



function calculateScalingFactor(state){
    state = captureState(state);
    
    var scalingMap = new Map()
    let stateYrMaxes = new Array()
    for (let i = 0; i < state.years.length; i++) {
        stateYrMaxes.push(state.years[i].votes[0].party)
    }
    
    for(var i = 0; i < states.length; i++) {

        let count = 0
        for (var j = 0; j < states[i].years.length; j++){
            count += (states[i].years[j].votes[0].party === stateYrMaxes[j])
        }

        let fac = count/11
        scalingMap.set(states[i].name, fac)
    }

    return scalingMap;

}

function captureState(state){
    for (let i = 0; i < states.length; i++){
        if (states[i].name === state.properties.name){
            return states[i];
        }
    }

    return null;
}
