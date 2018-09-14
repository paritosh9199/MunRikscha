// console.log("connected");
//===================================
var errorParagraph = document.getElementById("errorMsg");
var dpUpProg, lscUpProg;

//====================================
change_ui(0);
//====================================
function register() {
    var emailInp = document.getElementById("emailUsr");
    var pass = document.getElementById("passwordUsr");
    var conf_pass = document.getElementById("confirm_passwordUsr");
    var emailVal = emailInp.value;
    var passVal = pass.value;
    var conf_passVal = conf_pass.value;
    if (passVal.length >= 7) {
        if (passVal === conf_passVal) {
            //alert("email:" + emailVal + "\n" + "password: " + passVal);


            firebase.auth().createUserWithEmailAndPassword(emailVal, passVal).then(function(){
                fillDetails(emailVal, passVal);
            }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        console.log('The password is too weak.');
                    } else {
                        console.log(errorMessage);
                    }
                    //alert(error);
                    console.log(error);
                    errorParagraph.style.color = "red";
                    errorParagraph.innerText = "* Error:" + errorMessage;
                });
            
             


        } else {
            errorParagraph.style.color = "red";
            errorParagraph.innerText = "* Passwords do not match!";
        }
    } else {
        errorParagraph.style.color = "red";
        errorParagraph.innerText = "* Password is too small!";
    }
}


function fillDetails(email, pass) {



    // firebase.auth().signInWithEmailAndPassword(email, pass)
    //     .catch(function (error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         if (errorCode === 'auth/wrong-password') {
    //             console.log('Wrong password.');
    //         } else {
    //             console.log(errorMessage);
    //         }
    //         console.log(error);
    //     });
    if (firebase.User != null) {
        change_ui(1);
        setUid();
    }
}

function setUid() {
    var currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user.uid;
            window.localStorage.setItem("UID", currentUser);
        }
    });
}

//=========================================
function submitDetails() {
    // check_auth();
    var frstName = document.getElementById("frstName").value;
    var lastName = document.getElementById("lstName").value;
    var phoneNumber = document.getElementById("phnNumber").value;
    var dob = document.getElementById("dobUsr").value;
    var address = document.getElementById("adrUsr").value;
    var city = document.getElementById("ctyUsr").value;
    var pinCode = document.getElementById("pinUsr").value;
    // var filePhoto = document.getElementById("photoFile").files[0];
    // var fileLicense = document.getElementById("licenseFile").files[0];
    var errorPara = document.getElementById("errorMsg1");
    var termsCheck = document.getElementById("agreeCond");
    //alert("photo:" + " file size " + filePhoto.size + "\n lsc:" + " file size " + fileLicense.size);
    if (frstName != null && lastName != null && phoneNumber != null && dob != null && address != null && city != null && pinCode != null) {
        if (frstName != "" && lastName != "" && phoneNumber != "" && dob != "" && address != "" && city != "" && pinCode != "") {
            if (termsCheck.checked) {
                // if (filePhoto != null && fileLicense != null) {
                //     if (filePhoto.size != NaN && fileLicense.size != NaN && filePhoto.size > '1' && fileLicense.size > '1'){
                //         if (filePhoto.size < '512000') {
                //             if (fileLicense.size < '1024000') {
                                var dataModel = {
                                    "name": {
                                        "firstName": frstName,
                                        "lastName": lastName
                                    },
                                    "dob": dob,
                                    "phoneNumber": phoneNumber,
                                    "address": {
                                        "street": address,
                                        "city": city,
                                        "zipCode": pinCode
                                    },
                                    "links": {
                                        "photoLink": "https://firebasestorage.googleapis.com/v0/b/munrikscha.appspot.com/o/sample%2Fprs.png?alt=media&token=e00b30cb-4398-4509-9afc-899eedbb2202",
                                        "licenseLink": "na"
                                    },
                                    "terms": "agreed",
                                    "reg":Date.now()
                                }
                                console.log(dataModel);
                                upload_to_firebase(dataModel);
                                //alert("photo:" + " file size " + filePhoto.size + "\n lsc:" + " file size " + fileLicense.size);
                                // change_ui(2);
                                // upload_file(filePhoto, "dp");
                                // upload_file(fileLicense, "lsc");
    
                                //console.log(dataModel);
                                // send_verif_email();
                //             } else {
                //                 errorPara.style.color = "red";
                //                 errorPara.innerText = "* License file is too big.\n* Please try again with a file less than 1mb in size";
                //             }
                //         } else {
                //             errorPara.style.color = "red";
                //             errorPara.innerText = "* Image is too big.\n* Please try again with a file less than 1mb in size";
                //         }
                //     }else {
                //         errorPara.style.color = "red";
                //         errorPara.innerText = "* Please select a properly formated file and try again!";
                //     }
                // } else {
                //     errorPara.style.color = "red";
                //     errorPara.innerText = "* Please select a file and try again!";
                // }

            } else {
                errorPara.style.color = "red";
                errorPara.innerText = "* Please agree to the conditions";
            }

        } else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please check all the fields and try again";
        }
    } else {
        errorPara.style.color = "red";
        errorPara.innerText = "* Please check all the fields and try again";
    }
}
//========================================
function upload_to_firebase(dataM) {
    if (dataM != null) {
        var database = firebase.database();
        var userId = window.localStorage.getItem("UID");
        //setting data to firebase
        database.ref().child("Drivers").child(userId).set(dataM).then(function(){
            send_verif_email();
            window.location = "/login.html";
        });
    }
}

function update_progress() {
    var tp = (dpUpProg + lscUpProg) / 2;
    var perc = tp + '%';
    //set progress to progress bar
    var pb = document.getElementById("progressBarPB");

    pb.style.width = perc;

    if (tp == '100') {
        document.getElementById("progressPB_header").innerHTML = "Success";
        pb.classList.add("progress-bar-success");
        //alert("upload complete");
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            window.localStorage.removeItem("UID");
        }).catch(function (error) {
            
        });
        setTimeout(function () {
            window.location = "/login.html";
        }, 5000);

    }
}
update_progress();
//==========================================
function upload_file(fileVar, type) {
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var userId = window.localStorage.getItem("UID");
    var file = fileVar;
    if (type == "dp") {
        var fileName = userId + " IMG";
        var lscRef = storageRef.child(`images/${fileName}`);
        var uploadTask = lscRef.put(file);

        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            dpUpProg = progress;
            update_progress();
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log("dp", downloadURL);
                var photoLink = downloadURL;
                var database = firebase.database();
                database.ref().child("Drivers").child(userId).child("links").child("photoLink").set(photoLink);
            });
        });


    } else if (type == "lsc") {
        var fileName = userId + " LSC";
        var lscRef = storageRef.child(`licenses/${fileName}`);
        var uploadTask = lscRef.put(file);

        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            lscUpProg = progress;
            update_progress();
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {

        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log("lsc", downloadURL);
                var licenseLink = downloadURL;
                var database = firebase.database();
                database.ref().child("Drivers").child(userId).child("links").child("licenseLink").set(licenseLink);
            });
        });
    }

}
//============================================
//============================================
//============================================



function send_verif_email() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });

}

function change_ui(flg) {
    var formF = document.getElementById("form_change_detail");
    var progF = document.getElementById("progress_bar_div");
    var formReg = document.getElementById("form_reg");
    if (flg == '0') {
        //initialise
        formReg.style.display="block";
        formF.style.display = "none";
        // progF.style.display = "none";
        // document.getElementById("progressBarPB").classList.remove("progress-bar-success");
        // document.getElementById("progressPB_header").innerHTML = "Upload Progress";
    } else if (flg == '1') {
        //show the form
        formReg.style.display="none";
        formF.style.display = "block";
        // progF.style.display = "none";
        // document.getElementById("progressBarPB").classList.remove("progress-bar-success");
        // document.getElementById("progressPB_header").innerHTML = "Upload Progress";
    } else if (flg == '2') {
        //upload status mode
        // formReg.style.display="none";
        // formF.style.display = "none";
        // progF.style.display = "block";
        
    } 
}

