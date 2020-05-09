document.getElementById("careerAreas").innerHTML =
  "<h4>Career Areas</h4>" +
  "<p>" +
  "  Leaving all boxes unchecked will yield results for all career areas." +
  "</p>" +
  "" +
  "<div" +
  "  style='width: 335px'" +
  "  onmouseleave='hideDiv('careerarea_checkboxes')'" +
  ">" +
  "  <button" +
  "    onclick='viewDiv('careerarea_checkboxes')'" +
  "    style='width:160px; height:25px; font-size:small; background-color: white; color:black; margin-bottom:0px'" +
  "  >" +
  "    Select a Career Area ▼" +
  "  </button>" +
  "  <div" +
  "    id='careerarea_checkboxes'" +
  "    style='display: none; border: 2px solid; width: 335px'" +
  "    class='checkbox_select'" +
  "  >" +
  "    <br />" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox1'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(1)'" +
  "      />" +
  "      <label id='label1' for='checkbox1'>Planning and Analysis</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox2'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(2)'" +
  "      />" +
  "      <label id='label2' for='checkbox2'>Engineering</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox3'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(3)'" +
  "      />" +
  "      <label id='label3' for='checkbox3'" +
  "        >Agriculture, Horticulture, & the Outdoors</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox4'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(4)'" +
  "      />" +
  "      <label id='label4' for='checkbox4'" +
  "        >Customer and Client Support</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox5'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(5)'" +
  "      />" +
  "      <label id='label5' for='checkbox5'>Science and Research</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox6'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(6)'" +
  "      />" +
  "      <label id='label6' for='checkbox6'>Sales</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox7'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(7)'" +
  "      />" +
  "      <label id='label7' for='checkbox7'>Education and Training</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox8'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(8)'" +
  "      />" +
  "      <label id='label8' for='checkbox8'" +
  "        >Health Care including Nursing</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox9'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(9)'" +
  "      />" +
  "      <label id='label9' for='checkbox9'>Information Technology</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox10'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(10)'" +
  "      />" +
  "      <label id='label10' for='checkbox10'>Finance</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox11'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(11)'" +
  "      />" +
  "      <label id='label11' for='checkbox11'>Other</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox12'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(12)'" +
  "      />" +
  "      <label id='label12' for='checkbox12'" +
  "        >Law, Compliance, and Public Safety</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox13'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(13)'" +
  "      />" +
  "      <label id='label13' for='checkbox13'>Performing Arts</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox14'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(14)'" +
  "      />" +
  "      <label id='label14' for='checkbox14'" +
  "        >Hospitality, Food, and Tourism</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox15'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(15)'" +
  "      />" +
  "      <label id='label15' for='checkbox15'" +
  "        >Marketing and Public Relations</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox16'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(16)'" +
  "      />" +
  "      <label id='label16' for='checkbox16'" +
  "        >Design, Media, and Writing</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox17'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(17)'" +
  "      />" +
  "      <label id='label17' for='checkbox17'>Transportation</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox18'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(18)'" +
  "      />" +
  "      <label id='label18' for='checkbox18'>Personal Services</label>" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox19'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(19)'" +
  "      />" +
  "      <label id='label19' for='checkbox19'" +
  "        >Maintenance, Repair, and Installation</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox20'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(20)'" +
  "      />" +
  "      <label id='label20' for='checkbox20'" +
  "        >Business Management and Operations</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox21'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(21)'" +
  "      />" +
  "      <label id='label21' for='checkbox21'" +
  "        >Manufacturing and Production</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox22'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(22)'" +
  "      />" +
  "      <label id='label22' for='checkbox22'" +
  "        >Construction, Extraction, and Architecture</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox23'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(23)'" +
  "      />" +
  "      <label id='label23' for='checkbox23'" +
  "        >Community and Social Services</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox24'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(24)'" +
  "      />" +
  "      <label id='label24' for='checkbox24'" +
  "        >Clerical and Administrative</label" +
  "      >" +
  "    </div>" +
  "    <div>" +
  "      <input" +
  "        type='checkbox'" +
  "        id='checkbox25'" +
  "        name='checkbox_select'" +
  "        onclick='updateCheckBox(25)'" +
  "      />" +
  "      <label id='label25' for='checkbox25'>Human Resources</label>" +
  "    </div>" +
  "    <br />";
