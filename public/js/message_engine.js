var database = firebase.database();
var msg = null;
console.log("connected to message js");

setPerm();
setMsg();
function setPerm() {
    var adref = database.ref("Admin/msgAdmin");
    // console.log(ref);
    adref.on("value", function (snapshot) {
        var childData = snapshot.val();
        // user_object = childData;
        var key = Object.keys(childData)[0];    //this will return 1st key.         
        console.log(childData.adminUid);
        // alert(childData.adminUid);
        msgPermSet(childData);
        // console.log(user_object);
        // setDetails(user_object);
    });
    // adminref.on("value", function (snapshot) {
    //     var childData = snapshot.val();
    //     console.log(childData);
    //     alert(childData);
    //     if (childData != null) {
    //         msgPermSet(childData);
    //     } else {
    //         console.log("err-msg err");
    //         document.getElementById("msg-send-model-btn").style.display = "none";
    //     }
    // });
}


function msgPermSet(obj) {
    var userId = window.localStorage.getItem("UID");
    // console.log("msgPerm function started");
    // console.log("my uid from message engine: " + userId);
    if (obj.adminUid != null && userId != null) {
        if (obj.adminUid == userId) {
            // document.getElementById("admin-notif").innerHTML = "<div class='list-group notif-link'><a id='bt1_notif' href='/notification.html' class='list-group-item'><i class='fas fa-bell'></i> Notification</a></div>";
            document.getElementById("admin-notif").style.display = "block";
            document.getElementById("msg-send-model-btn").style.display = "block";
            document.getElementById("send-msg-btn").addEventListener('click', function () {
                sendMessage();
            });
        } else {
            document.getElementById("msg-send-model-btn").style.display = "none";
            document.getElementById("admin-notif").style.display = "none";
        }
    } else {
        console.log("err: acc null");
        document.getElementById("msg-send-model-btn").style.display = "none";
        document.getElementById("admin-notif").style.display = "none";
    }

}
function setMsg() {
    var ref = database.ref("Messages/msg");
    document.getElementById("msg").innerHTML = "";
    document.getElementById("msg-modal-message").innerHTML = "";
    ref.on("value", function (snapshot) {
        document.getElementById("msg").innerHTML = "";
        document.getElementById("msg-modal-message").innerHTML = "";
        
        var i = 0;
        var data = [];
        if (snapshot != null) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                data.push(childData);

            });
            var msCt = 0;
            for (i = data.length - 1; i >= 0; i--) {
                msCt++;
                if (msCt < 4) {
                    setMessage(data[i]);
                }
                setMessageModal(data[i]);
            }
            if (msCt > 3) {
                var msgModalMessage = "<a href='#' type='button' data-toggle='modal' data-target='#msg-modal'>See All messages</a>";
                document.getElementById("msg").innerHTML += msgModalMessage;
            }

        } else {
            console.log("err: Message read failed");
            document.getElementById("msg").innerHTML = "This is where all messages from admin will be displayed!";
        }


    });
}
// var dm = {
//     "sub":"Subject",
//     "timeStamp":Date.now(),
//     "msg":"Sample message 123"
// };
// var i=0;
// for(i=0;i<11;i++){
//     database.ref().child("Messages").child("msg").push().set(dm);
// }
function setMessageModal(obj) {

    var d = new Date(obj.timeStamp);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var msg = "<span class='sub-msg'><h6>" + obj.sub + "</h6></span>" + "<span class='msg-ms'>" + obj.msg + "</span><br>";
    msg += "<span class='ts-msg'>" + days[d.getDay()] + " " + d.getDate() + " " + month[d.getMonth()] + " " + d.getHours() + ":" + d.getMinutes() + "</span><hr>";
    document.getElementById("msg-modal-message").innerHTML += msg;
}
function setMessage(obj) {

    var d = new Date(obj.timeStamp);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var msg = "<span class='sub-msg'><h6>" + obj.sub + "</h6></span>" + "<span class='msg-ms'>" + obj.msg + "</span><br>";
    msg += "<span class='ts-msg'>" + days[d.getDay()] + " " + d.getDate() + " " + month[d.getMonth()] + " " + d.getHours() + ":" + d.getMinutes() + "</span><hr>";
    document.getElementById("msg").innerHTML += msg;
}

function sendMessage() {
    var errorParagraph = document.getElementById("err-send-msg");
    errorParagraph.style.color = "red";
    var sub = document.getElementById("subject-msg").value;
    var msg = document.getElementById("message-msg").value;

    if (sub != null && sub != "") {
        if (msg != null && msg != "") {
            document.getElementById("msg").innerHTML = "";
            document.getElementById("msg-modal-message").innerHTML = "";
            var dm = {
                "sub": sub,
                "timeStamp": Date.now(),
                "msg": msg
            };

            database.ref().child("Messages").child("msg").push().set(dm).then(function () {
                setMsg();
                $('#msg-send-modal').modal('hide');
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                errorParagraph.innerText = "* " + errorMessage;
                console.log(error);
            });
        } else {
            errorParagraph.innerText = "* " + "Please check the subject and try again";
        }
    } else {
        errorParagraph.innerText = "* " + "Please check the message and try again";
    }


}
//todo write class for msg