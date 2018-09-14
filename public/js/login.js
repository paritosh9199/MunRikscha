function login() {
    var emailInp = document.getElementById("emailUsr");
    var pass = document.getElementById("passwordUsr");
    var emailVal = emailInp.value;
    var passVal = pass.value;
    var remMe = document.getElementById("rem_me");
    var errorParagraph = document.getElementById("errorMsg");
    errorParagraph.style.color = "red";

    firebase.auth().signInWithEmailAndPassword(emailVal, passVal)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                console.log('Wrong password.');
                errorParagraph.innerText = "* " + errorMessage;
            } else {
                console.log(errorMessage);
                errorParagraph.innerText = "* " + errorMessage;
            }
            console.log(error);
            //errorParagraph.innerText = "*"+errorMessage;
        });


    if (remMe.checked) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function () {

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                errorParagraph.innerText = "* " + errorMessage;
            });
    }

    check_auth();
}
check_auth();
window.onload = check_auth();
window.onpageshow = check_auth();
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

function check_auth() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location = '/driverPortal.html';
        }
    });
}

function forgot() {
    document.location = "/forgot_password.html";
}

