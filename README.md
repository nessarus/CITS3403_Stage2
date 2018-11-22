# GameDev Website

GameDev Website is a student project to demonstrate agile web development. 

### Access the site
The GameDev website can be accessed by going to:
>    https://secure-fjord-72738.herokuapp.com/

### Our Group
Mia wolski: 22260881  
Joshua Ng: 20163079  
Conor Smith: 21959981  

### Architecture
We used MEAN stack: Mongoose, Express, Javascript and NodeJS.  
We set up the app server by routes, controller, model, test and views  
- Routes controlled the web pages pathing.
- Models controlled the Database Schema for our users' accounts, projects and databases.
- Controllers were used to setup the logic of saving and loading user data and webpages.
- View were used to display the html pages. We used pug for flow control and sorting the priorities of user tasks.

### The Website
- We divided the website into pages: Home, My Projects, Create Projects, Chat, About, Register and - About.  
- Register user page is generate user data to be used in parts of the website such as login.  
- My projects shows the projects for the users, that they are a part of.  
- Each project in 'My Projects' links to its own page contianing its tasks.  
- The page to create projects and view created projects are split up for easy of use and - accessability.  
- We combined all our webpages together to form the basis of the project2 website. Chat is on its - own page as it seems easier and more convinent. login/logout and Register/My profile change - visibliltiy depending on if the user is logged in or not.  
- Most pages can only be accessable using a valid user login, if a user isnt logged in they are - directed to the login page.  
- The MEAN architeture was used, monogoose data is stored online hosted by mlabs.  
- Sorting is done by priority of the tasks stated then by their date automatically.  

### How to setup new server on Heroku
1. Remove old remote heroku
    - \> git remote rm heroku
2. Start heroku
    - \> heroku login
    - \> heroku create
3. Note the url of the website
4. Send your files to the new instance
    - \> git push heroku master
5. Start Heroku running 
    - \> heroku ps:scale web=1 

### How to setup new database on Mlab
- Mlab used for online mongoose storage
- To keep the mongo data saved to a cloud platform use mongoose connection with the mlabs connection line
- This code can be found from the mlabs website after the database is created

### CITS3403 Agile Web Development 
GameDev Website is a student project from the course CITS3403 Agile Web Development in the University of Western Australia, semester one of 2018. 
