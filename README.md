# What is NutriTrack?

NutriTrack is the culmination of everything I’ve learned so far in web development. It makes use of a MongoDB database with the assistance of the Mongoose library. It has a Node js backend using the Express js framework. The front end is built with React js, along with the use of Bootstrap, plain CSS, HTML, & JavaScript (ES6 +).

NutriTrack is a hospital & patient focused, food ordering system. There are collections of patient data, patient diet types, food production areas, & menu items. There are default menu choices for different diet types, days of the week, & meal periods (Breakfast, Lunch, & Dinner). There is also data related to the hospital itself, including units (I.E. the ER or ICU), and the rooms on these units.

There are multiple user account type which all have different levels of access to these different collections of data, they are...

NCA (Nutrition Care Assistant): The base user. In general they can CRUD patient orders, and view patients, menus & menu items.

Lead NCA: Can do all of the above, along with generate food prep lists for the different food production areas for each day & meal period. They can also view a summary of the total number of patients currently in the hospital (the Census).

Nurse: Can do all of the above, minus the prep lists. They can also create , edit, and delete patients from the system.

Dietitian: Can do everything a standard NCA can do, along with the ability to edit menu items & CRUD default menus.

Admin: Can do everything listed previously. Along with the ability to CRUD user accounts, production areas, units, & rooms.

## Live now on Heroku!

https://nutritrack-react-frontend.herokuapp.com/

Use the credentials below to test out the app, and the different user account types.

NCA
Email: nca@test.com
Pass: testPass

Lead NCA
Email: leadnca@test.com
Pass: testPass

Nurse
Email: nurse@test.com
Pass: testPass

Dietitian
Email: dietitian@test.com
Pass: testPass

## Node js backend repository

View the backend repository for NutriTrack here...
https://github.com/racefan56/NutriTrack
