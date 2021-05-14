window.onscroll = function() {
    var distanceScrolled = document.documentElement.scrollTop;
    var currHeight = document.querySelector('#logo').clientHeight;
    if (distanceScrolled >= currHeight) {
        document.getElementById("calibrator").classList.remove("d-none");
        document.getElementsByClassName("navbar-brand")[0].classList.remove('invisible');
        document.getElementsByClassName("navbar-brand")[0].classList.add('visible');
        document.getElementsByClassName("navbar")[0].classList.add('fixed-top');
        
    }

    if (distanceScrolled <currHeight){
        document.getElementById("calibrator").classList.add("d-none");
        document.getElementsByClassName("navbar-brand")[0].classList.add('invisible');
        document.getElementsByClassName("navbar-brand")[0].classList.remove('visible');
        document.getElementsByClassName("navbar")[0].classList.remove('fixed-top');
    }

}
