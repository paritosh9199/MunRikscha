function change_ui(flg) {
    var for_forget = document.getElementById("formRes");
    var form_conf = document.getElementById("confMsg");
    if(flg == '0'){
        for_forget.style.display="block";
        form_conf.style.display="none";
    }else{
        for_forget.style.display="none";
        form_conf.style.display="block";
    }


}
change_ui(0);
function reset_pass() {
    var email = document.getElementById("emailUsr").value;
    var errorParagraph = document.getElementById("errorMsg");
    firebase.auth().sendPasswordResetEmail(
        email)
        .then(function () {
            // Password reset email sent.
            change_ui(1);
            setTimeout(function () {
                window.location = "/login.html";
            }, 3000);
        })
        .catch(function (error) {
            // Error occurred. Inspect error.code.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            //alert(error);
            errorParagraph.style.color = "red";
            errorParagraph.innerText = "* Error: " + errorMessage;
        });
}





