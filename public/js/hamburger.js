hamburger = document.querySelector(".hamburger");
hamburger.onclick= function() {
    links = document.querySelector(".links");
    links.classList.toggle("active");
}
hamburger = document.querySelector(".hamburger");
    hamburger.classList.toggle("active");

    let profileToggle = document.querySelector("#Profile");
    let profile = document.querySelector(".profile");
    
    profileToggle.onclick = function () {
        profile.classList.toggle("active");
    };
    
    