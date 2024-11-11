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

    let cartToggle = document.querySelector("#Cart");
    let cart = document.querySelector(".cart");
    
    cartToggle.onclick = function () {
        cart.classList.toggle("active");
    };
    
    // This script assumes you have a method to fetch user data
function updateProfile(user) {
    const userNameElement = document.querySelector("#user_name span");
    const userEmailElement = document.querySelector("#user_email span");

    if (user) {
        userNameElement.textContent = user.name;
        userEmailElement.textContent = user.email;
    }
}

// Example usage after logging in
// You would call this function with the user data if using AJAX or similar methods.
