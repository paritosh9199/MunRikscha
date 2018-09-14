document.getElementById("driverPortal").addEventListener('click', function () {
    checkAuth();
});
function checkAuth() {
    var currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location = "/login.html";
        } else {
            window.location = "/driverPortal.html";
        }
    });
}

if (screen.width <= '640'){
    document.getElementById("contact-form-heading").innerHTML = "<br>";
}