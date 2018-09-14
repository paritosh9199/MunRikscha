function addDriversToLiist(name, lnk, mobile, seats, imgSrc, locMarker, fbLnk, linkIn) {
    var sts = "<br><span class='text-muted'>" + seats + "</span>";
    var driver = "<div class='col-sm-4'><div class='team-member'>  <img class='mx-auto rounded-circle' src='" + imgSrc + "' alt=''><h4>" + name + "</h4><p><span class='text-muted'>" + mobile + "</span>"+" "+"<br><a href='" + lnk + "'>check me out</a></p><span></span><ul class='list-inline social-buttons'><li class='list-inline-item'><a href='" + locMarker + "'><i class='fas fa-map-marker'></i></a></li><li class='list-inline-item'><a href='" + fbLnk + "'><i class='fab fa-facebook'></i></a></li><li class='list-inline-item'><a href='" + linkIn + "'><i class='fab fa-twitter'></i></a></li></ul></div></div>";


    document.getElementById('drivers-list').innerHTML += driver;
}

var name = "Stephan";
var lnk = "www.google.com";
var mobile = "+123 /46577/56756";
var seats = "95";
var src = "https://firebasestorage.googleapis.com/v0/b/munrikscha.appspot.com/o/sample%2Fprs.png?alt=media&token=e00b30cb-4398-4509-9afc-899eedbb2202";
var locMarker = lnk;
var fbLnk = lnk;
var linkIn = lnk;

document.getElementById('drivers-list').innerHTML = "";
// var i = 0;
for (i = 1; i < 13; i++) {
    addDriversToLiist(name+" "+i,lnk,mobile,seats,src,lnk,lnk,lnk);
}