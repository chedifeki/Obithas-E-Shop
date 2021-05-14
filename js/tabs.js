function openTab(evt, tabName) {
    var i;
    var x = document.getElementsByClassName("categ");
    for (i = 0; i < x.length; i++) {
      x[i].classList.add("d-none");
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].classList.remove("activeCateg");
    }
    document.getElementById(tabName).classList.remove("d-none");
    evt.currentTarget.classList.add("activeCateg");
  }
  /* based on code from w3school */ 