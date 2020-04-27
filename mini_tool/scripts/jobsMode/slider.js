// Updates the animate button when clicked
function updateButton(button, clicked) {
    button.innerText = clicked ? "Pause" : "Animate";
    updateColor(button, button.value);
  }
  
  // Updates the animate button color
  function updateColor(button, value) {
    button.style.backgroundColor =
      value == "1" ? "#b786f0" : "#525aff" /* blue */;
  }
  
  // Reverts the animate button color to original
  function revertColor(button) {
    button.style.backgroundColor = "white";
  }
  
  // Resets the button
  function resetButton(button) {
    button.value = this.value == "0" ? "1" : "0";
    updateButton(button, false);
    revertColor(button);
  }
  
  /*
   * disables go button
   */
  function disableGo() {
    document.getElementById("go").disabled = true;
  }
  
  // enables go button
  function enableGo() {
    document.getElementById("go").disabled = false;
  }
  
  // Runs animation
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  //cycles through all possible years (2007, 2010-2017) and generates the bar graph for each year
  const animateYears = async () => {
    disableGo();
    var button = document.getElementById("animate");
    updateButton(button, true);
    for (var i = 2007; i <= 2017; i++) {
      // Skip over 2008, 2009 in the outer loop
      if (i == 2008 || i == 2009) {
        continue;
      }
      $("#yearSlider").val(i);
      // ALlows user to pause animation
      if (button.value == "0") {
        updateButton(button, false);
        break;
      }
      // Re-generate the graph, display it for 2 seconds
      updateData();
      await delay(2000);
    }
    // Reset, allow user to manually generate graph
    resetButton(button);
    enableGo();
  };