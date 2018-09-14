var __assign = (this && this.__assign) || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var defaults = {
    lines: 12,
    length: 7,
    width: 5,
    radius: 10,
    scale: 1.0,
    corners: 1,
    color: '#000',
    fadeColor: 'transparent',
    animation: 'spinner-line-fade-default',
    rotate: 0,
    direction: 1,
    speed: 1,
    zIndex: 2e9,
    className: 'spinner',
    // top: '50%',
    // left: '50%',
    shadow: '0 0 1px transparent',
    position: 'absolute',
};
var Spinner = /** @class */ (function () {
    function Spinner(opts) {
        if (opts === void 0) { opts = {}; }
        this.opts = __assign({}, defaults, opts);
    }
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target by calling
     * stop() internally.
     */
    Spinner.prototype.spin = function (target) {
        this.stop();
        this.el = document.createElement('div');
        this.el.className = this.opts.className;
        this.el.setAttribute('role', 'progressbar');
        css(this.el, {
            position: this.opts.position,
            width: 0,
            zIndex: this.opts.zIndex,
            left: this.opts.left,
            top: this.opts.top,
            transform: "scale(" + this.opts.scale + ")",
        });
        if (target) {
            target.insertBefore(this.el, target.firstChild || null);
        }
        drawLines(this.el, this.opts);
        return this;
    };
    /**
     * Stops and removes the Spinner.
     * Stopped spinners may be reused by calling spin() again.
     */
    Spinner.prototype.stop = function () {
        if (this.el) {
            if (typeof requestAnimationFrame !== 'undefined') {
                cancelAnimationFrame(this.animateId);
            }
            else {
                clearTimeout(this.animateId);
            }
            if (this.el.parentNode) {
                this.el.parentNode.removeChild(this.el);
            }
            this.el = undefined;
        }
        return this;
    };
    return Spinner;
}());
export { Spinner };
/**
 * Sets multiple style properties at once.
 */
function css(el, props) {
    for (var prop in props) {
        el.style[prop] = props[prop];
    }
    return el;
}
/**
 * Returns the line color from the given string or array.
 */
function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length];
}
/**
 * Internal method that draws the individual lines.
 */
function drawLines(el, opts) {
    var borderRadius = (Math.round(opts.corners * opts.width * 500) / 1000) + 'px';
    var shadow = 'none';
    if (opts.shadow === true) {
        shadow = '0 2px 4px #000'; // default shadow
    }
    else if (typeof opts.shadow === 'string') {
        shadow = opts.shadow;
    }
    var shadows = parseBoxShadow(shadow);
    for (var i = 0; i < opts.lines; i++) {
        var degrees = ~~(360 / opts.lines * i + opts.rotate);
        var backgroundLine = css(document.createElement('div'), {
            position: 'absolute',
            top: -opts.width / 2 + "px",
            width: (opts.length + opts.width) + 'px',
            height: opts.width + 'px',
            background: getColor(opts.fadeColor, i),
            borderRadius: borderRadius,
            transformOrigin: 'left',
            transform: "rotate(" + degrees + "deg) translateX(" + opts.radius + "px)",
        });
        var delay = i * opts.direction / opts.lines / opts.speed;
        delay -= 1 / opts.speed; // so initial animation state will include trail
        var line = css(document.createElement('div'), {
            width: '100%',
            height: '100%',
            background: getColor(opts.color, i),
            borderRadius: borderRadius,
            boxShadow: normalizeShadow(shadows, degrees),
            animation: 1 / opts.speed + "s linear " + delay + "s infinite " + opts.animation,
        });
        backgroundLine.appendChild(line);
        el.appendChild(backgroundLine);
    }
}
function parseBoxShadow(boxShadow) {
    var regex = /^\s*([a-zA-Z]+\s+)?(-?\d+(\.\d+)?)([a-zA-Z]*)\s+(-?\d+(\.\d+)?)([a-zA-Z]*)(.*)$/;
    var shadows = [];
    for (var _i = 0, _a = boxShadow.split(','); _i < _a.length; _i++) {
        var shadow = _a[_i];
        var matches = shadow.match(regex);
        if (matches === null) {
            continue; // invalid syntax
        }
        var x = +matches[2];
        var y = +matches[5];
        var xUnits = matches[4];
        var yUnits = matches[7];
        if (x === 0 && !xUnits) {
            xUnits = yUnits;
        }
        if (y === 0 && !yUnits) {
            yUnits = xUnits;
        }
        if (xUnits !== yUnits) {
            continue; // units must match to use as coordinates
        }
        shadows.push({
            prefix: matches[1] || '',
            x: x,
            y: y,
            xUnits: xUnits,
            yUnits: yUnits,
            end: matches[8],
        });
    }
    return shadows;
}
/**
 * Modify box-shadow x/y offsets to counteract rotation
 */
function normalizeShadow(shadows, degrees) {
    var normalized = [];
    for (var _i = 0, shadows_1 = shadows; _i < shadows_1.length; _i++) {
        var shadow = shadows_1[_i];
        var xy = convertOffset(shadow.x, shadow.y, degrees);
        normalized.push(shadow.prefix + xy[0] + shadow.xUnits + ' ' + xy[1] + shadow.yUnits + shadow.end);
    }
    return normalized.join(', ');
}
function convertOffset(x, y, degrees) {
    var radians = degrees * Math.PI / 180;
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    return [
        Math.round((x * cos + y * sin) * 1000) / 1000,
        Math.round((-x * sin + y * cos) * 1000) / 1000,
    ];
}

//spinner ^ 




var opts = {
    lines: 10, // The number of lines to draw
    length: 32, // The length of each line
    width: 9, // The line thickness
    radius: 30, // The radius of the inner circle
    scale: 0.2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#000000', // CSS color or array of colors
    fadeColor: '', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    // left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'relative' // Element positioning
};
var optsdashboard = {
    lines: 10, // The number of lines to draw
    length: 32, // The length of each line
    width: 9, // The line thickness
    radius: 30, // The radius of the inner circle
    scale: 0.2, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#000000', // CSS color or array of colors
    fadeColor: '', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'relative' // Element positioning
};

function setUid() {
    var currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user.uid;
            window.localStorage.setItem("UID", currentUser);
        } else {
            window.localStorage.removeItem("UID");
        }
    });
}


setUid();
if (screen.width <= '340') {
    opts.scale = 0.15;
    document.getElementById("spinnerPara1").style.marginLeft = "22px";
    document.getElementById("spinnerPara1").style.fontSize = "1em";
    document.getElementById("delete-info-para").style.fontSize = "0.8em";
    document.getElementById("delete-info-title").style.fontSize = "1em";
    document.getElementById("myTab").classList.add("flex-column");
    // document.getElementById("spinnerDiv1").style.marginTop = "7px";
    // document.getElementById("spinnerDiv1").style.marginBottom = "7px";

    document.getElementById("spinnerPara2").style.marginLeft = "22px";
    document.getElementById("spinnerPara2").style.fontSize = "1em";
    // document.getElementById("spinnerDiv2").style.marginTop = "7px";
    // document.getElementById("spinnerDiv2").style.marginBottom = "7px";
} else if (screen.width <= '600' && screen.width > '340') {
    opts.scale = 0.2;
    document.getElementById("spinnerPara1").style.marginLeft = "22px";
    document.getElementById("spinnerPara1").style.fontSize = "1.2em";
    document.getElementById("delete-info-para").style.fontSize = "0.9em";
    document.getElementById("delete-info-title").style.fontSize = "1.1em";
    document.getElementById("myTab").classList.add("flex-column");
    // document.getElementById("spinnerDiv1").style.marginTop = "7px";
    // document.getElementById("spinnerDiv1").style.marginBottom = "7px";

    document.getElementById("spinnerPara2").style.marginLeft = "22px";
    document.getElementById("spinnerPara2").style.fontSize = "1.2em";
    // document.getElementById("spinnerDiv2").style.marginTop = "7px";
    // document.getElementById("spinnerDiv2").style.marginBottom = "7px";

} else {
    opts.scale = 0.22;
    document.getElementById("spinnerPara1").style.marginLeft = "1.5em";
    document.getElementById("spinnerPara1").style.fontSize = "1em";
    document.getElementById("delete-info-para").style.fontSize = "1em";
    document.getElementById("delete-info-title").style.fontSize = "1.2em";
    // document.getElementById("spinnerDiv1").style.marginTop = "10px";
    // document.getElementById("spinnerDiv1").style.marginBottom = "10px";

    document.getElementById("spinnerPara2").style.marginLeft = "1.5em";
    document.getElementById("spinnerPara2").style.fontSize = "1em";
    // document.getElementById("spinnerDiv2").style.marginTop = "10px";
    // document.getElementById("spinnerDiv2").style.marginBottom = "10px";
}
var target = document.getElementById('spinner1');
var spinner = new Spinner(opts).spin(target);

var infoSpnr = document.getElementById('spinnerInfo');
var spinnerI = new Spinner(optsdashboard).spin(infoSpnr);



var target2 = document.getElementById('spinner2');
var spinner2 = new Spinner(opts).spin(target2);

function setF(flg) {
    if (flg == '0') {
        //show img form
        document.getElementById("formPhoto").style.display = "block";
        document.getElementById("loaderPhoto").style.display = "none";
    } else if (flg == '1') {
        document.getElementById("formPhoto").style.display = "none";
        document.getElementById("loaderPhoto").style.display = "block";
    } else if (flg == '2') {
        //show lsc form
        document.getElementById("formLsc").style.display = "block";
        document.getElementById("loaderLsc").style.display = "none";
    } else if (flg == '3') {
        document.getElementById("formLsc").style.display = "none";
        document.getElementById("loaderLsc").style.display = "block";
    } else if (flg == '4') {
        document.getElementById("spinnerPara1").innerText = "Success";
    } else if (flg == '5') {
        document.getElementById("spinnerPara2").innerText = "Success";
    }

}

function imgInit() {
    setF(0);
}
function lscInit() {
    setF(2);
}
imgInit();
lscInit();


function submitDetails(flg) {
    var phoneNumber = document.getElementById("phnNumber").value;
    var street = document.getElementById("strUsr").value;
    var city = document.getElementById("ctyUsr").value;
    var pinCode = document.getElementById("pinUsr").value;
    var NumberOfSeats = document.getElementById("noSeats").value;
    var tourPrice = document.getElementById("tourPrice").value;
    var termsCheck = document.getElementById("agreeCondDetails");
    var errorPara = document.getElementById("errorMsg1");
    var userId = window.localStorage.getItem("UID");
    var database = firebase.database();

    if (flg == 0) {
        // change address
        var errorPara = document.getElementById("errAdd");
        if (street != "" && city != "" && pinCode != "" && street != null && city != null && pinCode != null) {
            var dataModel = {
                "street": street,
                "city": city,
                "zipCode": pinCode
            };

            database.ref().child("Drivers").child(userId).child("address").set(dataModel).then(function(){
                window.location = "/driverPortal.html";
            });

        }
        else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please check all the fields and try again";
        }
    } else if (flg == 1) {
        // change phone
        var errorPara = document.getElementById("errPhn");
        if (phoneNumber != "" && phoneNumber != null) {
            database.ref().child("Drivers").child(userId).child("phoneNumber").set(phoneNumber).then(function(){
                window.location = "/driverPortal.html";
            });
        }
        else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please check the phone number and try again";
        }
    } else if (flg == 2) {
        // change noOSeats
        var errorPara = document.getElementById("errPrice");
        
        if (tourPrice != "" && tourPrice != null) {
            if (!isNaN(tourPrice)) {
                database.ref().child("Drivers").child(userId).child("price").set(tourPrice).then(function(){
                    window.location = "/driverPortal.html";
                });
                
            } else {
                errorPara.style.color = "red";
                errorPara.innerText = "* Please check the price feild and try again";
            }
        }
        else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please check the price feild and try again";
        }

    } else if (flg == 3) {
        var errorPara = document.getElementById("errSeats");
        if (NumberOfSeats != "" && NumberOfSeats != null) {
            if (!isNaN(NumberOfSeats)) {
                database.ref().child("Drivers").child(userId).child("seats").set(NumberOfSeats).then(function(){
                    window.location = "/driverPortal.html";
                });
                
            } else {
                errorPara.style.color = "red";
                errorPara.innerText = "* Please check the Number that you are trying to set and try again";
            }
        }
        else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please check the field and try again";
        }
    }
}

function submitSocialLinks() {
    var fb = document.getElementById("fbLink").value;
    var twitter = document.getElementById("twitLink").value;
    var website = document.getElementById("webLnk").value;
    var termsCheck = document.getElementById("agreeCondSocial");
    var errorPara = document.getElementById("errorMsg2");


    if ((fb == null || fb == "") && (twitter == null || twitter == "") && (website == null || website == "")) {
        errorPara.style.color = "red";
        errorPara.innerText = "* Please check all the fields and try again";
    } else {
        if (termsCheck.checked) {
            var database = firebase.database();
            var userId = window.localStorage.getItem("UID");

            if (fb != null && fb != "") {
                database.ref().child("Drivers").child(userId).child("links").child("facebook").set(fb).then(function(){
                    window.location = "/driverPortal.html";
                });
            }

            if (twitter != null && twitter != "") {
                database.ref().child("Drivers").child(userId).child("links").child("twitter").set(twitter).then(function(){
                    window.location = "/driverPortal.html";
                });
            }

            if (website != null && website != "") {
                database.ref().child("Drivers").child(userId).child("links").child("web").set(website).then(function(){
                    window.location = "/driverPortal.html";
                });
            }

        } else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please agree to the condition";
        }
    }

}

function update_progress_img(prog) {

    if (prog == '100') {
        document.getElementById("spinnerPara1").innerHTML = "Success";
        // document.getElementById("spinner1").stop();
        document.getElementById("spinner1").style.display = "none";
        setTimeout(function () {
            window.location = "/driverPortal.html";
        }, 3000);

    }
}
function update_progress_lsc(prog) {
    if (prog == '100') {
        document.getElementById("spinnerPara2").innerHTML = "Success";
        // document.getElementById("spinner2").stop();
        document.getElementById("spinner2").style.display = "none";
        setTimeout(function () {
            window.location = "/driverPortal.html";
        }, 3000);

    }
}
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
            update_progress_img(progress);
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
                database.ref().child("Drivers").child(userId).child("links").child("photoLink").set(photoLink).then(function(){
                    window.location = "/driverPortal.html";
                });
            });
        });


    } else if (type == "lsc") {
        var fileName = userId + " LSC";
        var lscRef = storageRef.child(`licenses/${fileName}`);
        var uploadTask = lscRef.put(file);

        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            update_progress_lsc(progress);
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
                console.log(licenseLink);
                database.ref().child("Drivers").child(userId).child("links").child("licenseLink").set(licenseLink).then(function(){
                    window.location = "/driverPortal.html";
                });
            });
        });
    }

}

function submitImage() {
    var filePhoto = document.getElementById("photoFile").files[0];
    var errorPara = document.getElementById("errorMsg3");
    var termsCheck = document.getElementById("agreeCondImg");
    if (filePhoto != null) {
        if (filePhoto.size != NaN && filePhoto.size > '1') {
            // 000-
            if (filePhoto.size < '512000') {
                if (termsCheck.checked) {
                    setF(1);
                    upload_file(filePhoto, "dp");
                } else {
                    errorPara.style.color = "red";
                    errorPara.innerText = "* Please agree to the condition";
                }

            } else {
                errorPara.style.color = "red";
                errorPara.innerText = "* Image is too big.\n* Please try again with a file less than 512kb in size";
            }
        } else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please select a properly formated file and try again!";
        }
    } else {
        errorPara.style.color = "red";
        errorPara.innerText = "* Please select a file and try again!";
    }
}

function submitLsc() {
    var filePhoto = document.getElementById("photoFile").files[0];
    var fileLicense = document.getElementById("licenseFile").files[0];
    var errorPara = document.getElementById("errorMsg4");
    var termsCheck = document.getElementById("agreeCondLsc");

    if (fileLicense != null) {
        if (fileLicense.size != NaN && fileLicense.size > '1') {
            if (fileLicense.size < '1024000') {
                if (termsCheck.checked) {
                    setF(3);
                    upload_file(fileLicense, "lsc");
                } else {
                    errorPara.style.color = "red";
                    errorPara.innerText = "* Please agree to the condition";
                }

            } else {
                errorPara.style.color = "red";
                errorPara.innerText = "* License is too big.\n* Please try again with a file less than 1mb in size";
            }
        } else {
            errorPara.style.color = "red";
            errorPara.innerText = "* Please select a properly formated file and try again!";
        }
    } else {
        errorPara.style.color = "red";
        errorPara.innerText = "* Please select a file and try again!";
    }
}

function delAcc() {
    var user = firebase.auth().currentUser;
    var pass = document.getElementById("delete-account").value;
    var errorParagraph = document.getElementById("del-errorMsg");
    var email = user.email;
    var err = '0';
    errorParagraph.style.color = "red";
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            err = '1';
            if (errorCode === 'auth/wrong-password') {
                console.log('Wrong password.');
                errorParagraph.innerHTML = "<br>* " + "The password you entered is wrong";
            } else {
                console.log(errorMessage);
                errorParagraph.innerHTML = "<br>* " + errorMessage;
            }
            console.log(error);
            //errorParagraph.innerText = "*"+errorMessage;
        });
    if (err != '1') {
        user = firebase.auth().currentUser;
        user.delete().then(function () {
            // User deleted.
            window.localStorage.removeItem("UID");
            window.location = "/";
        }).catch(function (error) {
            // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            errorParagraph.innerHTML = "<br>* " + errorMessage;
            console.log(error);
        });
    }


}


// document.getElementById("Img-tab").onclick = function () { imgInit() };
// document.getElementById("Lsc-tab").onclick = function () { lscInit() };

//settings-one-change-detail3
document.getElementById("save-details-addr").onclick = function () { submitDetails(0) };
document.getElementById("save-details-phn").onclick = function () { submitDetails(1) };
document.getElementById("save-details-price").onclick = function () { submitDetails(2) };
document.getElementById("save-details-seats").onclick = function () { submitDetails(3) };

document.getElementById("save-social").onclick = function () { submitSocialLinks() };
document.getElementById("save-image").onclick = function () { submitImage() };
document.getElementById("save-lsc").onclick = function () { submitLsc() };
document.getElementById("delete-account").onclick = function () { delAcc() };