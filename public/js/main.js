
console.log('test')





////////////////////Map Marker Maker function











////jQuery doc on ready
$(document).ready(function(){
    ////this is a snippet from materialize
    $('select').formSelect();

    ///hamburger snippet from materialize
    $('.sidenav').sidenav();
    $('.carousel').carousel(
    );
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
    });

    setInterval(() => {
      $('.carousel').carousel('next');
    }, 4000);
    // $('input.autocomplete').autocomplete({
    //   data: {
    //     "Apple": null,
    //     "Microsoft": null,
    //     "Google": 'https://placehold.it/250x250'
    //   },
    // });

   
         
  });



  ///////////Notes to self:
  
  /////figure out pictures - do i need to add them all in heroku or can I add in both places and upload a DB
  ////css
  ///Google map infowindow
