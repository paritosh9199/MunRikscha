function addDriversToLiist(name, chklnk, mobile, seats, imgSrc, locMarker, fbLnk, linkIn, lname, desc, price, pin, city) {

    if(mobile == null){
        mobile = "N/A";
    }
    if(seats == null){
        seats = "N/A";
    }
    if(desc == null){
        desc = "Sample description";
    }
    if(price == null){
        price = "N/A";
    }
    if(pin == null){
        pin = "N/A";
    }
    if(city == null){
        city = "N/A";
    }

    var sts = "<br><span class='text-muted'>" + seats + "</span>";
    var driver = "<div class='col-sm-4'><div class='team-member'>  <img class='mx-auto rounded-circle' src='" + imgSrc + "' alt=''><h4>" + name + "</h4><p><span class='text-muted'><a href='tel:" + mobile + "'>" + mobile + "</a></span>" + " " + "<br><a href='#modal' data-toggle='modal' data-target='#" + chklnk + "'>check me out</a></p><span></span><ul class='list-inline social-buttons'><li class='list-inline-item'><a href='" + locMarker + "'><i class='fas fa-map-marker'></i></a></li><li class='list-inline-item'><a href='" + fbLnk + "'><i class='fab fa-facebook'></i></a></li><li class='list-inline-item'><a href='" + linkIn + "'><i class='fab fa-twitter'></i></a></li></ul></div></div>";

    var model = "<div class='modal fade' id='" + chklnk + "' tabindex='-1' role='dialog' aria-labelledby='' + chklnk + '' aria-hidden='true'>      <div class='modal-dialog modal-xs' role='document'>        <div class='modal-content'>           <div class='modal-body'>            <div class='container'>              <button type='button' class='close' data-dismiss='modal' ria-label='Close'>                <span aria-hidden='true'>&times;</span>              </button>                <div class='row'>                <div class='col-md-12 col-sm-12'>                  <br>                  <img class='mx-auto rounded-circle centerImg' src = '" + imgSrc + "'>                </div>                <div class='col-md-12 ol-sm-12'>                  <br>                  <center>                    <h4>" + name + " " + lname + "</h4>                 <hr>                  </center>                </div>                <div class='col-md-12 col-sm-12'>                  <strong>Description</strong>                  <br>                  <p class='text-muted'>" + desc + "</p>                  <br>                </div>                <div class='col-md-5 col-sm-5'>                  <strong>Price:</strong> €" + price + "                </div>                <div class='col-md-7 col-sm-7'>                  <strong>Seats: </strong>" + seats + "                </div>                <div class='col-md-12 col-sm-12'>                  <br>                  <strong>Telephone: </strong><br>                  <a href='tel:" + mobile + "'>" + mobile + "</a>                </div>                <div class='col-md-12 col-sm-12'>                  <br>                  <strong>Address: </strong>                  <p>" + pin + ", " + city + "</p>                </div>              </div>            </div>          </div>          <div class='modal-footer'>            <button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>          </div>        </div>      </div>    </div>";
    document.getElementById('drivers-list').innerHTML += driver;
    document.getElementById('drivers-modal').innerHTML += model;
}


var database = firebase.database();
var ref = database.ref("Drivers");
ref.on("value", function (snapshot) {
    document.getElementById('drivers-list').innerHTML = "";
    document.getElementById('drivers-modal').innerHTML ="";
    var i = 0;
    if (snapshot != null) {
        snapshot.forEach(function (childSnapshot) {
            if (i < 6) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                console.log(childData);
                if (childData.verif == '1') {

                    addDriversToLiist(childData.name.firstName, "driver" + i, childData.phoneNumber, childData.seats, childData.links.photoLink, "/#map", childData.links.facebook, childData.links.twitter,childData.name.lastName,childData.description,childData.price,childData.address.zipCode,childData.address.city);
                    i++;
                }
            }
        });
    }
});

document.getElementById('drivers-list').innerHTML = "";
// var i = 0;


// for (i = 0; i < 1; i++) {
//     addDriversToLiist(name, lnk, mobile, seats, src, lnk, lnk, lnk);
// }