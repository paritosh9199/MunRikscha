function setF(flg) {
    if (flg == '0') {
        document.getElementById("formPhoto").style.display = "block";
        document.getElementById("loaderPhoto").style.display = "none";
    } else if (flg == '1') {
        document.getElementById("formPhoto").style.display = "none";
        document.getElementById("loaderPhoto").style.display = "block";
    } else if (flg == '2') {
        document.getElementById("formLsc").style.display = "block";
        document.getElementById("loaderLsc").style.display = "none";
    } else if (flg == '3') {
        document.getElementById("formLsc").style.display = "none";
        document.getElementById("loaderLsc").style.display = "block";
    } else if (flg == '4'){
        document.getElementById("spinnerPara1").innerText = "Success";
    } else if (flg == '5'){
        document.getElementById("spinnerPara2").innerText = "Success";
    }

}

function imgInit(){
    setF(0);
}
function lscInit(){
    setF(2);
}