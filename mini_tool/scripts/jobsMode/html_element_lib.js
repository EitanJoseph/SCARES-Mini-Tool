/**
This file contains functions for reading data from the client interaction HTML elements on views/jobsMode.ejs 
It should probably be renamed from just "slider.js". 

The file has separate functions for each HTML element which updates a global variable that can then be accessed 
from jobsMode.js' updateMap() function. 
*/

// this tracks the last valid year 1 slider input
var lastValidYear1 = 2007;

// this tracks the last valid year 2 slider input
var lastValidYear2 = 2017;

// this tracks the last division (science, social science, etc.) that was input
var lastDivision = "unrestricted";

// this tracks the last institution type (private, is research 1, etc.) that was input
var lastInstitutionType = "unrestricted";

// this tracks the last career areas that were checked
var lastCareerAreas = new Set();

// this is the current year that has been input on first slider
var currYear1 = 2007;

// this is the current year that has been
var currYear2 = 2017;

// this tracks the current division (science, social science, etc.)
var currDivision = "unrestricted";

// this tracks the current institution type (private, research1, etc.)
var currInstitutionType = "unrestricted";

// this tracks which elements have been checked currently
var currCareerAreas = new Set();

/*
This function is run when either a slider is changed. This will update the
lastValidYear1, lastValidYear2 global variables. 
*/
function updateYears() {
  // get the years from the range sliders
  var year1 = $("#year1Slider").val();
  var year2 = $("#year2Slider").val();

  // No data for years 2008, 2009
  // can't be comparing the same year
  if (
    year1 > year2 ||
    year1 == 2008 ||
    year1 == 2009 ||
    year2 == 2008 ||
    year2 == 2009
  ) {
    // Update the sliders to be at the last valid year entries and then return
    // don't want to do any querying for invalid data inputs
    $("#year1Slider").val(currYear1);
    $("#year2Slider").val(currYear2);
  }
  // if user just keeps clicking on the same start and end years, don't want to keep re-running the queries..
  else if (year1 != lastValidYear1 || year2 != lastValidYear2) {
    currYear1 = year1;
    currYear2 = year2;
    $("#year1Label").text(currYear1)
    $("#year2Label").text(currYear2)
  }
}

// This function updates the current division selected from the dropdown
function updateDivisionSelection() {
  currDivision = $("#division_select_id").val();
}

// This function updates the current institution type selected from the dropdown
function updateInstitutionTypeSelection() {
  currInstitutionType = $("#inst_type_select_id").val();
}

/*
  Tracks that a specific checkbox has been updated. If the checkbox is now checked, then
  its associated label is added to the set of currently selected subjects. If the checkbox
  is now unchecked, then its associated label is removed from the set of currently selected
  subjects. 

  @param i this is the index of the checkbox (1-25) from the page 
*/
function updateCheckBox(i) {
  // JQuery method of retrieving label text
  var labelText = $("#label" + i).text();

  // JQuery method of checking if checkbox is checked
  if ($("#checkbox" + i).is(":checked")) {
    currCareerAreas.add(labelText);
  } else {
    currCareerAreas.delete(labelText);
  }
}

/**
 * Tracks that the same checkboxes were checked before the "GO" button is clicked.
 * All this does is a set comparison between the sets "currSubjs" and "lastSubjs".
 *
 * @return true if a checkbox was checked/unchecked or a new checkbox was checked
 * and false if checkboxes all remained in the same state
 */
function sameChecked() {

  // sets different size => sets different
  if (currCareerAreas.size != lastCareerAreas.size) {
    return false;
  }

  // for each value in currSubjs, check if its in lastSubjs
  for (v of currCareerAreas.values()) {
    // if its not there, then currSubjs must have some other
    // element => return false
    if (!lastCareerAreas.has(v)) {
      return false;
    }
  }

  // lastSubjs has each element in currSubjs and no other elements
  return true;
}

/**
 * This function resets the map to display the job counts for each state when the user wants
 * to switch back from looking at out of state job postings for a given state. 
 */
function resetMap() {
  // reset server data 
  serverData = oldServerData;

  // draw the data (no need to re-query)
  drawData(-1)

  // disable reset button
  disableResetButton();
}

/**
 * Disables the reset map button to be clicked and
 * turns it white. This should be called after jobs
 * data is pulled from the map in updateMap() in
 * jobsMode.js and after the map is reset in resetMap().
 */
function disableResetButton() {
  $("#reset").prop("disabled", true);
  $("#reset").css("background-color", "white");
}

/**
 * Enables the reset map button to be clicked and turns
 * it red. This should be called after a state is clicked
 * on in map.js.
 */
function enableResetButton() {
  $("#reset").prop("disabled", false);
  $("#reset").css("background-color", "red");
}

/**
 * This method determines if jobsMode.js should send the server a POST request for a new
 * SQL query to be run.
 *
 * @return true if at least one HTML attribute is changed and false if none are changed
 */
function shouldRunNewQuery() {
  if (
    // if year1 / year 2 (sliders) were changed
    currYear1 != lastValidYear1 ||
    currYear2 != lastValidYear2 ||
    // if division / inst type (dropdowns) were changed
    currDivision != lastDivision ||
    currInstitutionType != lastInstitutionType ||
    // if checkboxes changed state 
    !sameChecked()
  ) {

    // if something was changed, update "last" versions of the attributes
    lastValidYear1 = currYear1;
    lastValidYear2 = currYear2;
    lastDivision = currDivision;
    lastInstitutionType = currInstitutionType;
    // we cannot simply set lastSubjs = currSubjs here because then they point
    // to the same set
    lastCareerAreas.clear()
    currCareerAreas.forEach(careerarea => lastCareerAreas.add(careerarea))
    return true;
  }
  // no change, no need to update "last" versions
  return false;
}