var markers = [];
var loc = null;



function initMap() {
    var options = {
        zoom: 13,
        center: { lat: 48.142859, lng: 11.5769127 }
    }


    var map1 = new google.maps.Map(document.getElementById("map1"), options);
    map1.addListener('click', function (event) {
        addM(event.latLng, map1);
    });
}

function addM(location, map) {
    console.log("lat:" + location.lat() + " lng:" + location.lng());

    // if (location.lat() >='48.132031' && location.lat() <= '48.158059') {
    //     if (location.lng() >=   '11.588658' && location.lat() <= '11.548039') {
    deleteMarkers();
    change_info_val("<strong>Latitude:</strong> " + location.lat() + "<br><strong>Longitude:</strong> " + location.lng());
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    loc = location;

    markers.push(marker);
    //     } else {
    //         alert("select valid area \nError::LNG \nLng:"+location.lng());
    //     }
    // } else {
    //     alert("select valid area \nError::LAT\nLat:"+location.lat());
    // }

}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
    loc = null;
    change_info_val("---");
    // var infoPara = document.getElementById("info_loc1");
    // infoPara.style.innerHTML = " reset complete!";
}

function change_info_val(val) {
    document.getElementById("info_loc1").innerHTML = val;
}

function add_loc_firebase() {
    var user_id = window.localStorage.getItem("UID");
    var database = firebase.database();
    var ref = database.ref('Drivers/' + user_id);
    var userObj = null;
    ref.on("value", function (snapshot) {
        var childData = snapshot.val();
        user_object = snapshot.val();
        // user_object = childData;
        var key = Object.keys(childData)[0];    //this will return 1st key.         
        // console.log(childData);
        // console.log(user_object);
        add_loc(user_object);
    });
    

}

function add_loc(obj) {
    var user_id = window.localStorage.getItem("UID");
    // console.log(obj);
    var dm = {
        "name":{
            "firstName":obj.name.firstName,
            "lastName":obj.name.lastName
        },
        "phoneNumber":obj.phoneNumber,
        "lat": loc.lat(),
        "lng": loc.lng(),
        "timestamp": Date.now()
    }
    var database = firebase.database();
    //setting data to firebase
    database.ref().child("loc").child(user_id).set(dm).then(function(){
        window.location = "/driverPortal.html";
    });
    change_info_val("<br><h5><em>The location has been saved</em></h5><br>");
}

function change_info_val2(val) {
    document.getElementById("info_loc2").style.color = "red";
    document.getElementById("info_loc2").innerHTML = val;

}

$(document).ready( function () {
    initMap();
});
// google.maps.event.addDomListener(window, 'load', initMap);