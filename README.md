# BrewView


##Project Overview
The problem this app is trying to solve is: CT currently has over 150 breweries with new ones popping up every day.  However, a lot of breweries are very small and don't have a website.  Alot of their information is shared via social media or by contacting the breweries directly.  As some one who frequently visits breweries, I thought it would be a nice idea to put detailed information in one place within my app.  A couple common questions I often have before going to a brewery are: 'Are Dogs Allowed?' 'Are there Gluten Free Options', 'What's the food situation?'.  Alot of the data is not yet updated, however it would be something I'd like to update going forward. 

##Goals of the app
I wanted the app to have the following at a minimum: A display of the breweries on google maps, a way to also search for breweries (by typing), the ability to update/delete information and a way to add reviews.  To have reviews make sense, it would be important to have users/sessions.

##Resources used
Some of the location information came from OpenBreweryDb.  This is a free public API.

Google Maps is also used to include markers and infowindows



##Technologies Used:
The majority of this app uses JS/jQuery/CSS/HTML as well as express, mongodb, mongoose, and node.

There are a ton of npm packages used: dotenv, bcrypt, sessions, ejs, request, method override, env

This app is built with the Materialize framework.  It includes a few features such as mobile nav (hamburger), carousels, autocomplete on search bar




###Future improvements
1. Make picture inputs go into an array
2. Ratings system
3. Change the display of reviews to only display x amount on load, and then additional reviews load on scroll/click
4. User profiles
5. Center map around current location

This app is hosted on Heroku

[Link to website](https://brewview-27.herokuapp.com/)