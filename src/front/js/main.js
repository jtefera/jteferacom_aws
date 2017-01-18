$('[data-toggle="tooltip"]').tooltip();

$(document).ready(function() {
  function loadIframeAndSilenceConsole(iframeSelector, url) {
    $(iframeSelector).attr('src', url);
    document.querySelector(iframeSelector).contentWindow.console.log = function() { /*nada}*/};
  }

  function loadHigherResImgAndSub(imgSelector, imgUrl) {
    $('<img />').attr('src', imgUrl).load(function() {
      $(this).remove();
      $(imgSelector).attr('src', '../img/portfolio/cubli.gif');
    });
  }

  function loadHigherResBackgroundAndSub(elementSelector, imgUrl) {
    $('<img />').attr('src', imgUrl).load(function() {
      $(this).remove();
      $(elementSelector).css('background-image', 'url(' + imgUrl + ')');
    });
  }
  
  
  loadIframeAndSilenceConsole('#recipes-iframe', '/recipes');
  loadIframeAndSilenceConsole('#tictactoe-iframe', '//codepen.io/jonahum/embed/RagbgZ/?height=705&theme-id=0&default-tab=result&embed-version=2');
  loadIframeAndSilenceConsole('#pomodoro-iframe', '//codepen.io/jonahum/embed/WwjyjY/?height=700&theme-id=0&default-tab=result&embed-version=2');
  loadIframeAndSilenceConsole('#oneout-iframe', '/one_out');

  loadHigherResBackgroundAndSub('.portafolio-sprite', '../img/portfolio/spritesheet.png');
  loadHigherResBackgroundAndSub('.frameworks-sprite', '../img/programming_icons/spritesheet.png');

  loadHigherResImgAndSub('#cubli-gif', '../img/portfolio/cubli.gif');
  loadHigherResImgAndSub('#podcast-img', '../img/portfolio/icmadrid/podcast.png');
  loadHigherResImgAndSub('#icmadrid-img', '../img/portfolio/icmadrid/icmadrid.png');
  
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
