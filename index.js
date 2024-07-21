// Initialize user list from localStorage
var userList = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

// Signup functionality
var nameInput = document.getElementById("nameInput");
var emailInput = document.getElementById("emailInput");
var passInput = document.getElementById("passInput");
var tryAgainMsg = document.getElementById("tryAgainMsg");
var confirmMsg = document.getElementById("confirmMsg");
var userNameAlert = document.getElementById("userNameAlert");
var userPassAlert = document.getElementById("userPassAlert");
var userMailAlert = document.getElementById("userMailAlert");
var signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", function () {
    var userExists = isExist();

    if (!userExists && nameInput.classList.contains("is-valid") && passInput.classList.contains("is-valid") && emailInput.classList.contains("is-valid")) {
        var user = {
            name: nameInput.value,
            email: emailInput.value,
            password: passInput.value
        };
        userList.push(user);
        localStorage.setItem("users", JSON.stringify(userList));
        tryAgainMsg.classList.replace("d-block", "d-none");
        confirmMsg.classList.replace("d-none", "d-block");
        nameInput.value = "";
        emailInput.value = "";
        passInput.value = "";
        
    } else {
        tryAgainMsg.classList.replace("d-none", "d-block");
    }
});

// Check if user already exists
function isExist() {
    var existMsg = document.getElementById("existMsg");
    if (!existMsg) {
        
        return false;
    }
    
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].name.toLowerCase() === nameInput.value.toLowerCase() || userList[i].email.toLowerCase() === emailInput.value.toLowerCase()) {
            existMsg.classList.remove("d-none");
            return true;
        }
    }
    existMsg.classList.add("d-none");
    return false;
}

// Validate name input
nameInput.addEventListener("input", function () {
    var regex1 = /^[A-Za-z-]{1,}$/; // Updated regex
    if (regex1.test(nameInput.value) && nameInput.value !== "") {
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        userNameAlert.classList.add("d-none");
    } else {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        userNameAlert.classList.remove("d-none");
    }
});

// Validate password input
passInput.addEventListener("input", function () {
    var regex2 = /^.{5,15}$/; // Regex for password validation
    if (regex2.test(passInput.value) && passInput.value !== "") {
        passInput.classList.add("is-valid");
        passInput.classList.remove("is-invalid");
        userPassAlert.classList.add("d-none");
    } else {
        passInput.classList.add("is-invalid");
        passInput.classList.remove("is-valid");
        userPassAlert.classList.remove("d-none");
    }
});

// Validate email input
emailInput.addEventListener("input", function () {
    var regex3 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    if (regex3.test(emailInput.value) && emailInput.value !== "") {
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        userMailAlert.classList.add("d-none");
    } else {
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        userMailAlert.classList.remove("d-none");
    }
});

// Login functionality
function login() {
    var loginMail = document.getElementById("loginEmail");
    var loginPass = document.getElementById("loginPass");
    var fillMsg = document.getElementById("fillMsg");
    var wrongMsg = document.getElementById("wrongMsg");

    // Check if inputs are filled
    if (loginMail.value === "" || loginPass.value === "") {
        fillMsg.classList.replace("d-none", "d-block");
        wrongMsg.classList.add("d-none");
        return false;
    }

    for (var i = 0; i < userList.length; i++) {
        if (userList[i].email.toLowerCase() === loginMail.value.toLowerCase() && userList[i].password === loginPass.value) {
            localStorage.setItem("sessionName", userList[i].name);
            
            window.location.href = "welcome.html";
            return;
        }
    }

    // If login fails
    wrongMsg.classList.replace("d-none", "d-block");
    fillMsg.classList.add("d-none");
}

// Display username on welcome page
function displayName() {
    var userName = localStorage.getItem("sessionName");
    

    if (userName) {
        document.getElementById("userName").innerText = "Welcome " + userName;
    } else {
        document.getElementById("userName").innerText = "No user logged in";
    }
}

// Ensure displayName runs on page load for welcome page
window.onload = displayName;
