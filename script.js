"use strict";
//301251124 Harvend Tauries
/* Event Listeners */

let fileButton = document.getElementById("moviefile");
let yearsFilter = document.getElementById("movie-year");
let directorFilter = document.getElementById("movie-director");
let orderFilter = document.getElementById("movie-order");
let img_section = document.getElementById("movie-posters")
let readed;
//variable for JSONfile
let JSONfile = "";
//making variable for JSON file reader
let fileread= new FileReader();

//create object based on the parameter
function Movie(mov){
  this.title = mov.title;
  this.director = mov.director;
  this.releaseDate = mov.releaseDate;
  this.imdbRating = mov.imdbRating;
  this.posterUrl = mov.posterUrl;
}
fileButton.addEventListener("change", function () {
  /* Your Code Here */
  //select file that being uploaded
  JSONfile = this.files[0];

  fileread.readAsText(JSONfile);

  //once the file is loaded, the file will be parsed here
  fileread.onload = function(){

    let Movies = JSON.parse(fileread.result);
    for (let  i = 0; i < Movies.movies.length ; i++){
      //pass the current object from files to the Movie class object
      let movie = new Movie(Movies.movies[i]);
      //create a div that going to hold the image
      let img_sec = document.createElement("div");
      //add the class for the css
      img_sec.classList.add("movie");
      let imgUrl = movie.posterUrl;
      let imgTitle = movie.title;
      //creating statement for img 
      let img_statement= '<img src="images/' + imgUrl + '"alt=' + imgTitle + '">'; 
      //appending the image sections with div
      img_section.appendChild(img_sec);
      //set the div innerhtml with img
      img_sec.innerHTML= img_statement;
    }
  }
  }
);

yearsFilter.addEventListener("change", function () {
  directorFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;
  /* Your Code Here */
  fileread.readAsText(JSONfile);
  //for retrieve all div within current section
  let dels = img_section.querySelectorAll("div");
  fileread.onload = function(){
  let Movies = JSON.parse(fileread.result);
  //if it select all years display whole thing
    if (yearsFilter.selectedIndex == 0){
      for (let  i = 0; i < Movies.movies.length ; i++){
      let movie = new Movie(Movies.movies[i]);
      //clear the image section 
      for (let i = 0; i < dels.length; i++) {
        dels[i].remove();
      }
  
      let img_sec = document.createElement("div");
      img_sec.classList.add("movie");
      let imgUrl = movie.posterUrl;
      let imgTitle = movie.title;
  
      let img_statement= '<img src="images/' + imgUrl + '"alt=' + imgTitle + '">'; 
  
      img_section.appendChild(img_sec);
      img_sec.innerHTML= img_statement;
      }
    }
    //if it select specific year display based on selected year or newer
    else{
      for (let  i = 0; i < Movies.movies.length ; i++){
        let movie = new Movie(Movies.movies[i]);
        for (let i = 0; i < dels.length; i++) {
          dels[i].remove();
        }
        //storing date value in array
        let date = movie.releaseDate.split(" ");
        //retrieve only the year from the arrray
        let year = date[2];
  
        if (year >= yearsFilter.value){
          let img_sec = document.createElement("div");
          img_sec.classList.add("movie");
          let imgUrl = movie.posterUrl;
          let imgTitle = movie.title;
    
          let img_statement= '<img src="images/' + imgUrl + '"alt=' + imgTitle + '">'; 
    
          img_section.appendChild(img_sec);
          img_sec.innerHTML= img_statement;
        }
      }
    }
    
  }
});

directorFilter.addEventListener("change", function () {
  yearsFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;
  /* Your Code Here */
  fileread.readAsText(JSONfile);

  let dels = img_section.querySelectorAll("div");

  fileread.onload = function(){
    //if all directors selected display whole movies
  let Movies = JSON.parse(fileread.result);
    if (directorFilter.selectedIndex == 0){
      for (let  i = 0; i < Movies.movies.length ; i++){
      let movie = new Movie(Movies.movies[i]);

      for (let i = 0; i < dels.length; i++) {
        dels[i].remove();
      }

      let img_sec = document.createElement("div");
      img_sec.classList.add("movie");
      let imgUrl = movie.posterUrl;
      let imgTitle = movie.title;

      let img_statement= '<img src="images/' + imgUrl + '"alt=' + imgTitle + '">'; 

      img_section.appendChild(img_sec);
      img_sec.innerHTML= img_statement;
      }
    }
    //else filter through the movie director
    else{
      for (let  i = 0; i < Movies.movies.length ; i++){
        let movie = new Movie(Movies.movies[i]);
        for (let i = 0; i < dels.length; i++) {
          dels[i].remove();
        }
        //storing director values
        let direc = movie.director;
        if (direc == directorFilter.value){
          let img_sec = document.createElement("div");
          img_sec.classList.add("movie");
          let imgUrl = movie.posterUrl;
          let imgTitle = movie.title;
    
          let img_statement= '<img src="images/' + imgUrl + '"alt=' + imgTitle + '">'; 
    
          img_section.appendChild(img_sec);
          img_sec.innerHTML= img_statement;
        }
      }
    }
  }
});

orderFilter.addEventListener("change", function () {
  directorFilter.selectedIndex = 0;
  yearsFilter.selectedIndex = 0;
  //retrieve each div from img section
  let dels = img_section.querySelectorAll("div");
  fileread.readAsText(JSONfile);
  if (orderFilter.selectedIndex == 0){
    fileread.onload = function(){
      let Movies = JSON.parse(fileread.result);
      for (let  i = 0; i <Movies.movies.length  ; i++){
        //replacing it with descending order
        for (let i = 0; i < dels.length; i++) {
          dels[i].remove();
        }
        let movie = new Movie(Movies.movies[i]);
    
        let img_sec = document.createElement("div");
        img_sec.classList.add("movie");
        let imgUrl = movie.posterUrl;
        let imgTitle = movie.title;
    
        let img_statement= '<img src="images/' + imgUrl + '"alt=' + imgTitle + '">'; 
    
        img_section.appendChild(img_sec);
        img_sec.innerHTML= img_statement;
      }
  }
  }
  else if (orderFilter.selectedIndex == 1){
    fileread.onload = function(){
      let Movies = JSON.parse(fileread.result);
      for (let  i = Movies.movies.length-1; i >=0  ; i--){
        for (let i = 0; i < dels.length; i++) {
          dels[i].remove();
        }
        let movie = new Movie(Movies.movies[i]);
    
        let img_sec = document.createElement("div");
        img_sec.classList.add("movie");
        let imgUrl = movie.posterUrl;
        let imgTitle = movie.title;
    
        let img_statement= '<img src="images/' + imgUrl + '"alt=' + imgTitle + '">'; 
    
        img_section.appendChild(img_sec);
        img_sec.innerHTML= img_statement;
      }
    }
  }
  /* Your Code Here */
});

//301251124 Harvend Tauries