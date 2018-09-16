//console.log("connected");
//ver 0.0.9

var menuDivs = document.getElementById("pageItems");
var errorParagraph = document.getElementById("errorMsg");
var div1 = document.getElementById("mainOverView");
var div2 = document.getElementById("locationChangeView");
var div3 = document.getElementById("detailsChangeView");
var btn1 = document.getElementById("bt1_sod");
var btn2 = document.getElementById("bt2_sld");
var btn3 = document.getElementById("bt1_sdd");
var dpUpProg = 0, lscUpProg = 0;
var totalProg = 0;


setOvervDiv();


check_auth();
// function upload_file(fileVar, type) {
//     var storage = firebase.storage();
//     var storageRef = storage.ref();
//     var userId = window.localStorage.getItem("UID");
//     var file = fileVar;
//     if (type == "dp") {
//         var fileName = userId + " IMG";
//         var lscRef = storageRef.child(`images/${fileName}`);
//         var uploadTask = lscRef.put(file);

//         uploadTask.on('state_changed', function (snapshot) {
//             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             dpUpProg = progress;
//             update_progress();
//             switch (snapshot.state) {
//                 case firebase.storage.TaskState.PAUSED: // or 'paused'
//                     console.log('Upload is paused');
//                     break;
//                 case firebase.storage.TaskState.RUNNING: // or 'running'
//                     console.log('Upload is running');
//                     break;
//             }
//         }, function (error) {

//         }, function () {
//             uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//                 console.log("dp", downloadURL);
//                 var photoLink = downloadURL;
//                 var database = firebase.database();
//                 database.ref().child("Drivers").child(userId).child("links").child("photoLink").set(photoLink);
//             });
//         });


//     } else if (type == "lsc") {
//         var fileName = userId + " LSC";
//         var lscRef = storageRef.child(`licenses/${fileName}`);
//         var uploadTask = lscRef.put(file);

//         uploadTask.on('state_changed', function (snapshot) {
//             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log('Upload is ' + progress + '% done');
//             lscUpProg = progress;
//             update_progress();
//             switch (snapshot.state) {
//                 case firebase.storage.TaskState.PAUSED: // or 'paused'
//                     console.log('Upload is paused');
//                     break;
//                 case firebase.storage.TaskState.RUNNING: // or 'running'
//                     console.log('Upload is running');
//                     break;
//             }
//         }, function (error) {

//         }, function () {
//             uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//                 console.log("lsc", downloadURL);
//                 var licenseLink = downloadURL;
//                 var database = firebase.database();
//                 database.ref().child("Drivers").child(userId).child("links").child("licenseLink").set(licenseLink);
//             });
//         });
//     }

// }


// function upload_to_firebase(dataM) {
//     if (dataM != null) {
//         var database = firebase.database();
//         var userId = window.localStorage.getItem("UID");
//         //setting data to firebase
//         database.ref().child("Drivers").child(userId).set(dataM);
//     }
// }

// function update_progress() {
//     var tp = (dpUpProg + lscUpProg) / 2;
//     var perc = tp + '%';
//     //set progress to progress bar
//     var pb = document.getElementById("progressBarPB");

//     pb.style.width = perc;

//     if (tp == '100') {
//         document.getElementById("progressPB_header").innerHTML = "Success";
//         pb.classList.add("progress-bar-success");
//         //alert("upload complete");
//         setTimeout(function () {
//             // setOvervDiv();
//             window.location = "/driverPortal.html";
//         }, 3000);

//     }
// }
// update_progress();

window.onload = check_auth();
window.onpageshow = check_auth();
window.onunload = check_auth();
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};
function change_ui(flg) {
    // var formF = document.getElementById("form_change_detail");
    // var progF = document.getElementById("progress_bar_div");
    // if (flg == '1') {
    //     //in upload mode... hide not needed ui components
    //     document.getElementById("progressBarPB").classList.remove("progress-bar-success");
    //     document.getElementById("progressPB_header").innerHTML = "Upload Progress";
    //     formF.style.display = "none";
    //     progF.style.display = "block";
    // } else if (flg == '0') {
    //     //not in upload mode...need not hide ui comp
    //     // document.getElementById("progressBarPB").classList.remove("progress-bar-success");
    //     // document.getElementById("progressPB_header").innerHTML = "Upload Progress";
    //     formF.style.display = "block";
    //     progF.style.display = "none";
    // }
}


// function submitDetails() {
//     // check_auth();
//     var frstName = document.getElementById("frstName").value;
//     var lastName = document.getElementById("lstName").value;
//     var phoneNumber = document.getElementById("phnNumber").value;
//     var dob = document.getElementById("dobUsr").value;
//     var address = document.getElementById("adrUsr").value;
//     var city = document.getElementById("ctyUsr").value;
//     var pinCode = document.getElementById("pinUsr").value;
//     var filePhoto = document.getElementById("photoFile").files[0];;
//     var fileLicense = document.getElementById("licenseFile").files[0];;
//     var errorPara = document.getElementById("errorMsg1");
//     var termsCheck = document.getElementById("agreeCond");
//     //alert("photo:" + " file size " + filePhoto.size + "\n lsc:" + " file size " + fileLicense.size);
//     if (frstName != null && lastName != null && phoneNumber != null && dob != null && address != null && city != null && pinCode != null) {
//         if (frstName != "" && lastName != "" && phoneNumber != "" && dob != "" && address != "" && city != "" && pinCode != "") {
//             if (termsCheck.checked) {
//                 if (filePhoto != null && fileLicense != null) {
//                     if (filePhoto.size != NaN && fileLicense.size != NaN && filePhoto.size > '1' && fileLicense.size > '1'){
//                         if (filePhoto.size < '512000') {
//                             if (fileLicense.size < '1024000') {
//                                 var dataModel = {
//                                     "name": {
//                                         "firstName": frstName,
//                                         "lastName": lastName
//                                     },
//                                     "dob": dob,
//                                     "phoneNumber": phoneNumber,
//                                     "address": {
//                                         "address": address,
//                                         "city": city,
//                                         "pinCode": pinCode
//                                     },
//                                     "links": {
//                                         "photoLink": "test",
//                                         "licenseLink": "test"
//                                     },
//                                     "terms": "agreed"
//                                 }
//                                 console.log(dataModel);
//                                 upload_to_firebase(dataModel);
//                                 //alert("photo:" + " file size " + filePhoto.size + "\n lsc:" + " file size " + fileLicense.size);
//                                 change_ui(1);
//                                 upload_file(filePhoto, "dp");
//                                 upload_file(fileLicense, "lsc");

//                                 //console.log(dataModel);
//                                 // send_verif_email();
//                             } else {
//                                 errorPara.style.color = "red";
//                                 errorPara.innerText = "* License file is too big.\n* Please try again with a file less than 1mb in size";
//                             }
//                         } else {
//                             errorPara.style.color = "red";
//                             errorPara.innerText = "* Image is too big.\n* Please try again with a file less than 1mb in size";
//                         }
//                     }else {
//                         errorPara.style.color = "red";
//                         errorPara.innerText = "* Please select a properly formated file and try again!";
//                     }
//                 } else {
//                     errorPara.style.color = "red";
//                     errorPara.innerText = "* Please select a file and try again!";
//                 }

//             } else {
//                 errorPara.style.color = "red";
//                 errorPara.innerText = "* Please agree to the conditions";
//             }

//         } else {
//             errorPara.style.color = "red";
//             errorPara.innerText = "* Please check all the fields and try again";
//         }
//     } else {
//         errorPara.style.color = "red";
//         errorPara.innerText = "* Please check all the fields and try again";
//     }
// }



function setDetailDiv() {
    div1.style.display = "none";
    div2.style.display = "none";
    div3.style.display = "block";
    btn1.classList.remove("active");
    btn2.classList.remove("active");
    btn3.classList.add("active");
    // change_ui(0);
}
function setLocDiv() {
    div1.style.display = "none";
    div2.style.display = "block";
    div3.style.display = "none";
    btn1.classList.remove("active");
    btn2.classList.add("active");
    btn3.classList.remove("active");
}
function setOvervDiv() {
    div1.style.display = "block";
    div2.style.display = "none";
    div3.style.display = "none";
    btn1.classList.add("active");
    btn2.classList.remove("active");
    btn3.classList.remove("active");
}
function email_verif() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user.uid;
            if (user.emailVerified === false) {
                alert("email is not verified");
                window.location.href="/email_verif.html"
            }
            window.localStorage.setItem("UID", currentUser);
            menuDivs.style.display = "block";

        }
    });
}
email_verif();
function check_auth() {
            var currentUser;

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    currentUser = user.uid;
                    // if (user.emailVerified === false) {
                    //     alert("email is not verified");
                    // }
                    window.localStorage.setItem("UID", currentUser);
                    menuDivs.style.display = "block";

                } else {
                    window.location = "/login.html"

                    // No user is signed in.
                }
            });


        }



function log_out() {

            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                window.localStorage.removeItem("UID");
                window.location.href = "/login.html";
            }).catch(function (error) {
                // An error happened.
            });
        }