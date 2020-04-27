window.onmousedown = function (e) {
    var el = e.target;
    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        // hack to correct buggy behavior
        var select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
}

function multiSelectDropdownRunner() {
    var ls = Array()
    for (var i = 1; i <= 26; i++) {
      var checked = document.getElementById("checkbox"+i).checked
      if (checked) {
        var label = document.getElementById("label"+i).innerText
        ls.push(label)
      }
    }
   console.log(ls)
  }