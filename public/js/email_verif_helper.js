check_auth();

changeUi(0);
function _(id){return document.getElementById(id);}
window.onload = check_auth();
window.onpageshow = check_auth();
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

_("send-verif-eml-btn").addEventListener('click',function(){
    //send verif email
    send_verif_email();
    changeUi(1);
});
function check_auth() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            window.location = '/login.html';
        }

        else if (user) {
            var currentUser = user.uid;
            if (user.emailVerified === true) {
                alert("email is already verified!");
                window.location.href="/driverPortal.html"
            }
        }
    });
}

function send_verif_email() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });

}

function changeUi(flg){
    if(flg == 0){
        _("verif1").style.display = "block";
        _("verif2").style.display = "none";
    }else if(flg == 1){
        _("verif1").style.display = "none";
        _("verif2").style.display = "block";
    }
}