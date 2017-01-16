$('[data-toggle="tooltip"]').tooltip();

$(document).ready(function() {
  function loadIframeAndSilenceConsole(iframeId, url) {
    $(iframeId).attr('src', url);
    document.querySelector(iframeId).contentWindow.console.log = function() { /*nada}*/};
  }
  console.log('Downloading iframes');
  loadIframeAndSilenceConsole('#icmadrid-iframe', 'http://www.icmadrid.com');
  loadIframeAndSilenceConsole('#recipes-iframe', '/recipes');
  loadIframeAndSilenceConsole('#issues-iframe', 'http://icmadrid.com/issues');
  loadIframeAndSilenceConsole('#podcasts-iframe', 'http://www.icmadrid.com/media');
  loadIframeAndSilenceConsole('#tictactoe-iframe', '//codepen.io/jonahum/embed/RagbgZ/?height=705&theme-id=0&default-tab=result&embed-version=2');
  loadIframeAndSilenceConsole('#pomodoro-iframe', '//codepen.io/jonahum/embed/WwjyjY/?height=700&theme-id=0&default-tab=result&embed-version=2');
  loadIframeAndSilenceConsole('#oneout-iframe', '/one_out');
  $('<img />').attr('src', '../img/portfolio/spritesheet.png').load(function() {
    console.log('downloaded high res image');
    $(this).remove();
    $('.portafolio-sprite').css('background-image', 'url(../img/portfolio/spritesheet.png)');
  });
  $('<img />').attr('src', '../img/programming_icons/spritesheet.png').load(function() {
    console.log('downloaded high res image 2');
    $(this).remove();
    $('.frameworks-sprite').css('background-image', 'url(../img/programming_icons/spritesheet.png)');
  });
  $('<img />').attr('src', '../img/portfolio/cubli.gif').load(function() {
    console.log('downloaded high res image 3');
    $(this).remove();
    $('#cubli-gif').attr('src', '../img/portfolio/cubli.gif');
  });
});


contactForm.addEventListener("submit", function (e) {
  console.log("Form enviado")
  e.preventDefault();
  var contactForm = document.getElementById("contactForm"),
      nameContact = document.getElementById("name").value,
      emailContact = document.getElementById("email").value,
      phoneContact = document.getElementById("phone").value,
      messageContact = document.getElementById("message").value,
      /*payload = {
        name: nameContact,
        email: emailContact,
        phone: phoneContact,
        message: messageContact
      },*/
      payload = "name=" + encodeURIComponent(nameContact)
                +"&email=" + encodeURIComponent(emailContact)
                +"&phone=" + encodeURIComponent(phoneContact)
                +"&message="+ encodeURIComponent(messageContact)


  fetch("/send_contact", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded"
    },
    body: payload
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    $("#contactModalSuccess").modal('show')
  })
  .catch(function(e){
    $("#contactModalError").modal('show')
  });


})
