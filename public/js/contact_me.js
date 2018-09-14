// $(function () {

//   $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
//     preventSubmit: true,
//     submitError: function ($form, event, errors) {
//       // additional error messages or events
//     },
//     submitSuccess: function ($form, event) {
//       event.preventDefault(); // prevent default submit behaviour
//       // get values from FORM
//       var name = $("input#name").val();
//       var email = $("input#email").val();
//       var phone = $("input#phone").val();
//       var message = $("textarea#message").val();
//       var firstName = name; // For Success/Failure Message
//       // Check for white space in name for Success/Fail message
//       if (firstName.indexOf(' ') >= 0) {
//         firstName = name.split(' ').slice(0, -1).join(' ');
//       }
//       $this = $("#sendMessageButton");
//       $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
//       $.ajax({
//         url: "././mail/contact_me.php",
//         type: "POST",
//         data: {
//           name: name,
//           phone: phone,
//           email: email,
//           message: message
//         },
//         cache: false,
//         success: function () {
//           // Success message
//           $('#success').html("<div class='alert alert-success'>");
//           $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//             .append("</button>");
//           $('#success > .alert-success')
//             .append("<strong>Your message has been sent. </strong>");
//           $('#success > .alert-success')
//             .append('</div>');
//           //clear all fields
//           $('#contactForm').trigger("reset");
//         },
//         error: function () {
//           // Fail message
//           $('#success').html("<div class='alert alert-danger'>");
//           $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//             .append("</button>");
//           $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
//           $('#success > .alert-danger').append('</div>');
//           //clear all fields
//           $('#contactForm').trigger("reset");
//         },
//         complete: function () {
//           setTimeout(function () {
//             $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
//           }, 1000);
//         }
//       });
//     },
//     filter: function () {
//       return $(this).is(":visible");
//     },
//   });

//   $("a[data-toggle=\"tab\"]").click(function (e) {
//     e.preventDefault();
//     $(this).tab("show");
//   });
// });

// /*When clicking on Full hide fail/success boxes */
// $('#name').focus(function () {
//   $('#success').html('');
// });

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
          // window.location.href = (String('mailto:info^munich-rikscha.de?subject=' + "Info about Munich Rikscha" + '&body=' + body).replace('^', '@'));
          if (email1 == null && email1 == "") {

            $.post(" http://localhost:5001/munrikscha/us-central1/cloudfn/send?n=" + rotc(name) + "&e=" + rotc(email) + "&p=" + rotc(phone) + "&m=" + rotc(message)).then(function () {
              alert("Successfully sent message!").then(function () {
                window.location = "/";
              });

            }).fail(function () {
              alert("Error encountered while sending message");
            });
          }else{
            alert("spam");
          }

          // $.post("https://us-central1-munrikscha.cloudfunctions.net/appfunction/sendMail?n="+rotc(name)+"&e="+rotc(email)+"&p="+rotc(phone)+"&m="+rotc(message));
          // var url = "http://localhost:5001/munrikscha/us-central1/appfunction/sendMail?n="+rotc(name)+"&e="+rotc(email)+"&p="+rotc(phone)+"&m="+rotc(message);
          // var xhttp = new XMLHttpRequest();
          // xhttp.onreadystatechange = function() {
          //   if (this.readyState == 4 && this.status == 200) {
          //     alert("message sent");
          //   }
          // };
          // xhttp.open("POST",url,true);
          // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          // xhttp.send();


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
