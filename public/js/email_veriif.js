check_auth();

window.onload = check_auth();
window.onpageshow = check_auth();
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

function check_auth() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location = '/login.html';
        }
    });
}