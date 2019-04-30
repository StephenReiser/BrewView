
// console.log('test')



////////////////////Map Marker Maker function






let word = 'TESTING'
let testWord = `"${word}"`




////jQuery doc on ready
$(document).ready(function(){
    ////this is a snippet from materialize
    $('select').formSelect();

    ///hamburger snippet from materialize
    $('.sidenav').sidenav();
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
    });

    setInterval(() => {
      $('.carousel').carousel('next');
    }, 4000);

    

   
         
  });



  ///////////Notes to self:
  
  /////figure out pictures - do i need to add them all in heroku or can I add in both places and upload a DB
  ////css
  ////Add autofill to show page
  ///add in dup user logic
  
