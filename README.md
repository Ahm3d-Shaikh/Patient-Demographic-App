# Patient-Demographic App

This project is a full stack patient-demographic application based on Laravel, Angular and Express.

## PreRequisites ##
1- node.js and npm installed  
2- angular CLI installed  
3- MYSQL server running  
4- Composer and PHP running.

## Setup Instructions ##
Follow the below steps to run the application on your end:  

1- Clone the repository using the command ```git clone https://github.com/Ahm3d-Shaikh/Patient-Demographic-App.git```  
2- Run ```npm install``` in the main directory of the project.  
3- Create a .env file in the backend directory which should have the following variables:  
   (a) HOST  
   (b) ROOT  
   (c) PASSWORD  
   (d) DATABASE  
4- Go to the patient-api directory of the project and run the following commands:  
   ```php artisan migrate```  
   ```php artisan db:seed```  
   ```php artisan serve```  
5- Go to the patient-app directory of the project and run ```npm install```. Then, run ```ng build --configuration production``` command to build the angular project.     
6- Go to the express-api directory of the project and run ```npm install```. Then use the command ```node server.js``` to start the server.  
7- You can now use the application by navigating to the URL ```http://localhost:3000/```.
