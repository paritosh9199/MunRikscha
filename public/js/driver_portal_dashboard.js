console.log("connected to dashboard");
change_ui(1);
var database = firebase.database();
var user_object, loc_object;
var loaded = false;
var user_id = window.localStorage.getItem("UID");
// console.log(user_id);
console.log(Date.now());
var ref = database.ref('Drivers/' + user_id);
var ref1 = database.ref('loc/' + user_id);
get_data_info();
get_data_loc();
// document.getElementById("refreshLoc").addEventListener('click',function(){
//     document.getElementById("locStatus").innerHTML = "";
//     get_data_loc();
// });

setInterval(function () {
    get_data_loc();
}, 1000);
 //init
//test cases
if(!firebase.User.emailVerified){
    alert("email not verified");
}
document.getElementById("update-desc").addEventListener('click', function () {
    setDescription();
});
if (screen.width <= '340') {
    document.getElementById("namePerson").style.fontSize = "1.3em";
    // document.getElementById("phnNo").style.display = "none";
    // document.getElementById("photoThumbnail").classList.add("thumbnailSm");
    document.getElementById("photoThumbnail").classList.add("centerPhotoSm");
    document.getElementById("photoThumbnail").classList.add("thumbnail");

} else if (screen.width <= '640' && screen.width > '340') {
    document.getElementById("namePerson").style.fontSize = "1.5em";
    // document.getElementById("photoThumbnail").classList.add("thumbnailMd");
    document.getElementById("photoThumbnail").classList.add("centerPhotoMd");
} else {
    document.getElementById("namePerson").style.fontSize = "2em";
    document.getElementById("photoThumbnail").classList.add("thumbnail");
    document.getElementById("photoThumbnail").classList.add("my-4");
    document.getElementById("photoThumbnail").classList.add("centerLg");
}


function get_data_info() {
    ref.on("value", function (snapshot) {
        var childData = snapshot.val();
        user_object = snapshot.val();
        // user_object = childData;
        // var key = Object.keys(childData)[0];    //this will return 1st key.         
        // console.log(childData);
        // console.log(user_object);
        setDetails(user_object);
    });
}

function imgLoaded(imgElement) {
    return imgElement.complete && imgElement.naturalHeight !== 0;
}


function get_data_loc() {
    ref1.on("value", function (snapshot) {
        if (snapshot != null) {
            var childData = snapshot.val();
            loc_object = snapshot.val();
            // user_object = childData;
            // var key = Object.keys(childData)[0];    //this will return 1st key.         
            // console.log(childData);
            // console.log("location");
            // console.log(loc_object);
            setLocation(loc_object);
        } else {
            console.log("err");
            window.location = "/driverPortal.html";
        }


    });
}

function setLocation(obj) {
    // getAddress(obj.lat, obj.lng);

    var currTime = Date.now();
    if (obj != null) {
        if (!isNaN(obj.timestamp)) {
            var timeLeft = 86400 * 1000 + obj.timestamp;
            var counter = (Date.now() - timeLeft);
            var d = new Date(timeLeft);
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            // setInterval(function(){
            // currTime = Date.now();
            // var timeLeft = currTime - obj.timestamp;
            if (currTime > obj.timestamp && currTime < timeLeft) {
                document.getElementById("locStatus").innerHTML = "<div class='form-inline'><strong>Status: <span style='color: green;'>ACTIVE</span></strong></div>";
                document.getElementById("locActive").innerHTML = "<strong>Active till: </strong><span> " + days[d.getDay()] + " " + d.getDate() + " " + month[d.getMonth()] + " " + d.getHours() + ":" + d.getMinutes() + "</span>";
                // console.log("status 1");
            } else {
                document.getElementById("locStatus").innerHTML = "<div class='form-inline'><strong>Status: <span style='color: red;'>INACTIVE</span></strong></div>";

                // console.log("status 0");
            }


        } else {
            console.log("err status 1");
        }
    } else {
        document.getElementById("locStatus").innerHTML = "<div class='form-inline'><strong>Status: <span style='color: red;'>LOCATION NOT SET</span></strong></div>";
    }



}

function onImgLoaded() {
    if (loadTimer != null) clearTimeout(loadTimer);
    if (!imgObject.complete) {
        loadTimer = setTimeout(function () {
            onImgLoaded();
        }, 3);
    } else {
        alert(this.width + 'x' + this.height);
    }
}


function setDetails(obj) {

    // var imgObject = new Image();
    // imgObject.src = obj.links.photoLink;
    // imgObject.onLoad = onImgLoaded();
    // var user = firebase.auth().currentUser;
    // if(obj!=null){}else{progbar;}
    var user = firebase.auth().currentUser;
    var email = user.email;
    var img = new Image();
    var taxobj = null;
    var taxRef = database.ref('tax');
    taxRef.on("value", function (snapshot) {
        if (snapshot != null) {
            // var childData = snapshot.val();
            taxobj = snapshot.val();
            document.getElementById("tax-modal").innerHTML = "Tax: " + taxobj.tx;

        } else {
            console.log("err");
            window.location = "/driverPortal.html";
        }
    });


    document.getElementById("namePerson").innerHTML = "<strong>" + obj.name.firstName + " " + obj.name.lastName + "</strong>";
    document.getElementById("seats").innerHTML = "<strong>Seats: </strong>" + obj.seats;
    document.getElementById("price").innerHTML = "<strong>Price:</strong> €" + obj.price;
    if(obj.seats!=null){
        document.getElementById("seats").innerHTML = "<strong>Seats: </strong>" + obj.seats;
    }else{
        document.getElementById("seats").innerHTML = "<strong>Seats: </strong>" + "N/A";
    }
    if(obj.price!=null){
        document.getElementById("price").innerHTML = "<strong>Price:</strong> €" + obj.price;
    }else{
        document.getElementById("price").innerHTML = "<strong>Price:</strong> €" + "N/A";
    }
    //======modal data =============
    //write test cases ... TODO
    document.getElementById("name-modal").innerHTML = "<strong>" + obj.name.firstName + " " + obj.name.lastName + "</strong>";
    document.getElementById("email-modal").innerHTML = email;
    document.getElementById("phone-modal").innerHTML = "Phone: " + obj.phoneNumber;
    document.getElementById("dob-modal").innerHTML = "DOB: " + obj.dob;
    document.getElementById("addr-modal").innerHTML = obj.address.street + "<br>" + obj.address.city + ", " + obj.address.zipCode;
    if (obj.links != null) {
        var lnk = "";
        if (obj.links.facebook != null) {
            lnk += "Facebook: " + obj.links.facebook + "<br>";
        }else{
            lnk += "Facebook: " + "N/A" + "<br>";
        }
        if (obj.links.twitter != null) {
            lnk += "Twitter: " + obj.links.twitter + "<br>";
        }else{
            lnk += "Twitter: " + "N/A" + "<br>";
        }
        if (obj.links.web != null) {
            lnk += "Website: " + obj.links.web;
        }else{
            lnk += "Website: " + "N/A";
        }
        document.getElementById("web-modal").innerHTML = lnk;
    } else {
        document.getElementById("web-modal").innerHTML = "No links provided!";
    }
    // document.getElementById("web-modal").innerHTML = obj.links;
    if(obj.seats!=null){
        document.getElementById("seats-modal").innerHTML = "Seats: " + obj.seats;
    }else{
        document.getElementById("seats-modal").innerHTML = "Seats: N/A";
    }
    if(obj.price!=null){
        document.getElementById("price-modal").innerHTML = "Price: €" + obj.price;
    }else{
        document.getElementById("price-modal").innerHTML = "Price: N/A";
    }
    // document.getElementById("seats-modal").innerHTML = "Seats: " + obj.seats;
    // document.getElementById("price-modal").innerHTML = "Price: €" + obj.price;;
    // document.getElementById("tax-modal").innerHTML = "Tax: "+taxobj.tx;
    //write iterator for lang todo
    document.getElementById("lang-modal").innerHTML = "---";
    var d = new Date(obj.reg);
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    document.getElementById("reg-date-modal").innerHTML = "<strong>Registered on: </strong>" + days[d.getDay()] + " " + d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear()+" at "+ d.getHours() + ":" + d.getMinutes();
    //==============================
    var editStr = "  <a href='#' data-toggle='modal' data-target='#desc-modal'><i class='far fa-edit'></i></a>";
    if (obj.description != null) {

        document.getElementById("descDb").innerHTML = obj.description + editStr;
    } else {
        document.getElementById("descDb").innerHTML = "Enter a description." + editStr;
    }
    // document.getElementById("phnNo").innerHTML = "<strong>Phone: </strong>" + obj.phoneNumber;
    document.getElementById("imageDp1").src = obj.links.photoLink;
    var width = document.getElementById("imageDp1").naturalWidth;
    var height = document.getElementById("imageDp1").naturalWidth;
    setTimeout(function () {
        //for fast internet and cached data
        loaded = imgLoaded(document.getElementById("imageDp1"));
        if (!loaded) {
            change_ui(1);
        } else {
            change_ui(0);
        }
    }, 100);
    setTimeout(function () {
        //for fast internet and cached data
        loaded = imgLoaded(document.getElementById("imageDp1"));
        if (!loaded) {
            change_ui(1);
        } else {
            change_ui(0);
        }
    }, 200);
    setTimeout(function () {
        //for avg internet speeds
        loaded = imgLoaded(document.getElementById("imageDp1"));
        if (!loaded) {
            change_ui(1);
        } else {
            change_ui(0);
        }
    }, 500);
    setInterval(function () {
        //for slow internet
        loaded = imgLoaded(document.getElementById("imageDp1"));
        if (!loaded) {
            change_ui(1);
        } else {
            change_ui(0);
        }
    }, 1000);

    if (width > height) {
        document.getElementById("imageDp1").classList.add("landscape");
    } else if (width < height) {
        document.getElementById("imageDp1").classList.add("portrait");
    } else {
        document.getElementById("imageDp1").classList.add("portrait");
    }
    // "<strong>Email: </strong>"
    // document.getElementById("email").innerHTML = email;
}

// function getAddress(myLatitude, myLongitude) {

//     var geocoder = new google.maps.Geocoder();							// create a geocoder object
//     var location = new google.maps.LatLng(myLatitude, myLongitude);		// turn coordinates into an object

//     geocoder.geocode({ 'latLng': location }, function (results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {						// if geocode success
//             alert(results[0].formatted_address);					// if address found, pass to processing function
//         } else {
//             //   alert("Geocode failure: " + status);								// alert any other error(s)
//             return false;
//         }
//     });
// }

function setDescription() {
    var desc = document.getElementById("desc-text").value;
    var errorPara = document.getElementById("errorDesc");
    if (desc != null && desc != "") {
        database.ref().child("Drivers").child(user_id).child("description").set(desc).then(function () {
            window.location = "/driverPortal.html";
        });
    } else {
        errorPara.style.color = "red";
        errorPara.innerText = "* Set a valid description";
    }
}

function change_ui(flg) {
    if (flg == 0) {
        document.getElementById("info").style.display = "block";
        document.getElementById("infospnner").style.display = "none";
    } else if (flg == 1) {
        document.getElementById("info").style.display = "none";
        document.getElementById("infospnner").style.display = "block";
    }
}

