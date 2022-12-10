# POLLING API

## ⭐ Introduction

An API based polling system where users can post any question with different options and also add votes to it.
<br/>

## Features

- Create a question (you can add as many questions as you want)
- Add options to a question
- Add a vote to an option of question
- Delete a question → (A question can’t be deleted if one of it’s options has votes)
- Delete an option → (An option can’t be deleted if it has even one vote given to it)
- View a question with it’s options and all the votes given to it

## 🔥 Getting Started With The Project

- Fork the Project in your Repository.
- Clone the Forked Repository in your Local System.
- Install & Configure - NodeJS, MongoDB, Postman.
- Run 'npm install' in GitBash Terminal
- Go to 'package.json' & inside the 'SCRIPTS', find "start":"...." <br/>
  Change it to - "start": "nodemon index.js",
- Run 'npm start' in GitBash Terminal
- Enjoy :)

For any issues related to the project, raise an ISSUE in the respective Repository.
<br/>
<br/>

## Routes

- To create a Question
  - /questions/create (POST)
- To add options to a specific question
  - /questions/:id/options/create (POST)
- To delete a question
  - /questions/:id/delete (GET)
- To delete an option
  - /options/:id/delete (GET)
- To increment the count of votes
  - /options/:id/add_vote (GET)
- To view a question and it’s options
  - /questions/:id (GET)

<br/>

## 🔨 Tools Used

<div style ="display:flex; flex-wrap:wrap; flex-grow:1">

<img width="150" src="https://www.brainfuel.io/images/node-js-new.png" style="margin: 10px">
<img height="150" width="150" src="https://icon-library.com/images/d234566f9d.png" style="margin: 10px">
<img height="140" width="140" src="https://code.visualstudio.com/assets/apple-touch-icon.png" style="margin: 10px">

<img height="100" width="250" src="https://cdn.buttercms.com/2q5r816LTo2uE9j7Ntic"
style="margin: 10px; background: white">

</div>

   <br/>
   <br/>

- Framework: ExpressJS
- Database: MongoDB
- Version Control System: Git
- VCS Hosting: GitHub
- Programming / Scripting: JavaScript
- Runtime Environment: NodeJS
- Integrated Development Environment: VSCode

  <br/>
  <br/>

  ## 💻 API Snapshot
  ![polling-api](https://user-images.githubusercontent.com/84366054/206868539-dca77dc6-a546-4c2d-8009-6b923e3fb98a.PNG)

