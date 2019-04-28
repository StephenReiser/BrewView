
console.log('test')



////jQuery doc on ready
$(document).ready(function(){

    ////this is a snippet from materialize
    $('select').formSelect();

    ///hamburger snippet from materialize
    $('.sidenav').sidenav();
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true
    });
         
  });



  ///////////Notes to self:
  //////Should do a partial for the nav bar
  ////Restrict user access.  For now, once logged in, show edit, delete, and ability to add comments.
  //once logged in remove sign up and log in - give option to sign out
  /////figure out pictures - do i need to add them all in heroku or can I add in both places and upload a DB
  ////css
  ///Google map infowindow
