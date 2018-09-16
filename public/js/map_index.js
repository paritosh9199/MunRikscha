function addMarker(lat, lng, map, icon, content) {

    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map
    });

    if (icon) {
        // Set icon image
        marker.setIcon(icon);
    }
    if (content) {
        if (content.click) {
            var infoWindow = new google.maps.InfoWindow({
                content: content.click
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }


        // if (content.hover) {
        //     var hoverWindow = new google.maps.InfoWindow({
        //         content: content.hover
        //     });
        //     marker.addListener('mouseover', function () {
        //         hoverWindow.open(map, marker);
        //     });
        // }
    }
}


function initMap() {
    var options = {
        zoom: 15,
        center: { lat: 48.142859, lng: 11.5769127 }
    }

    var icn = {
        url: "/img/rikscha.png", // url
        scaledSize: new google.maps.Size(62.23, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    // var googleMap  = new google.maps;
    var map = new google.maps.Map(document.getElementById("map1"), options);


    var cnt = {
        "click": "you clicked on this driver",
        "hover": "you hovered on this driver"
    };
    var currTime = Date.now();
    var database = firebase.database();
    var ref = database.ref("loc");
    ref.on("value", function (snapshot) {
        if (snapshot != null) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                // console.log(childData);
                var disp = childData.name.firstName+" "+childData.name.lastName+"<br><a href='tel:"+childData.phoneNumber+"'>"+childData.phoneNumber+"</a>";
                var content = {
                    "click": disp,
                    "hover": "you hovered on this driver"
                };
                var timeLeft = 86400 * 1000 + childData.timestamp;
                if (currTime > childData.timestamp && currTime < timeLeft) {
                    addMarker(childData.lat,childData.lng,map,icn,content);
                }
                
            });
        } 
    });
    // addMarker(48.137228, 11.576337, map, icn, content);
    // addMarker(48.142859, 11.576912, map, icn, content);
    // addMarker(48.142383, 11.579138, map, icn, content);
    // addMarker(48.143600, 11.587914, map, icn, content);
    // addMarker(48.151925, 11.591937, map, icn, content);
    // addMarker(48.135803, 11.576203, map, icn, content);

}

$(document).ready( function () {
    initMap();
});
// google.maps.event.addDomListener(window, 'load', initMap);