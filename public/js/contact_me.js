function _(id) { return document.getElementById(id); }
function rotc(str) {
  var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm0987654321';
  var index = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}
_("emlForm1").style.display = "none"
function sendEmail() {
  var name = _("name").value;
  var email = _("email1").value;
  var email1 = _("email").value;
  var phone = _("phone").value;
  var message = _("message").value;


  if (name == null || name == "") {
    _("name-form-info").style.color = "red";
    _("name-form-info").innerHTML = "<strong>Please enter your name</strong>";
  }
  if (email == null || email == "") {
    _("email-form-info").style.color = "red";
    _("email-form-info").innerHTML = "<strong>Please enter your email</strong>";
  }
  if (phone == null || phone == "") {
    _("phone-form-info").style.color = "red";
    _("phone-form-info").innerHTML = "<strong>Please enter your phone number</strong>";
  }
  if (message == null || message == "") {
    _("body-form-info").style.color = "red";
    _("body-form-info").innerHTML = "<strong>Please enter your message</strong>";
  }

  if (name != null && name != "") {
    if (email != null && email != "") {
      if (phone != null && phone != "") {
        if (message != null && message != "") {
          var formattedBody = "Name: " + name + "\n" + "Phone: " + phone + "\n" + "Email: " + email + "\n\n" + "Message: " + message;
          var body = encodeURIComponent(formattedBody);
          
            $.post(" https://munich-mailer.herokuapp.com/send?n=" + rotc(name) + "&e=" + rotc(email) + "&p=" + rotc(phone) + "&m=" + rotc(message)).then(function () {
              alert("Successfully sent message!");
              window.location = "/";

            }).fail(function () {
              alert("Error encountered while sending message");
            });
          

        } else {
          _("body-form-info").style.color = "red";
          _("body-form-info").innerHTML = "<strong>Please enter your message</strong>";
        }
      } else {
        _("phone-form-info").style.color = "red";
        _("phone-form-info").innerHTML = "<strong>Please enter your phone number</strong>";
      }
    } else {
      _("email-form-info").style.color = "red";
      _("email-form-info").innerHTML = "<strong>Please enter your email</strong>";
    }
  } else {
    _("name-form-info").style.color = "red";
    _("name-form-info").innerHTML = "<strong>Please enter your name</strong>";
  }

}
_("sendMessageButton1").addEventListener('click', function () {
  sendEmail();
});
