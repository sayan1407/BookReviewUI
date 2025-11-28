import React from "react";

function Book({book}) {
  const fullStars = [];
  const blankStars = [];
  for(let i=0;i<Math.round(book.avgRating);i++){
    fullStars.push(<i class="bi bi-star-fill"></i>);
  }
  for(let i=0;i<5-Math.round(book.avgRating);i++){
    blankStars.push(<i class="bi bi-star"></i>);
  }
  return (
    <div class="col-md-3 col-sm-6">
      <div class="card book-card p-2 bg-dark text-light">
        <img
          src="https://via.placeholder.com/200x250"
          class="book-img w-100"
          alt="Book Image"
        />
        <div class="card-body">
          <h5 class="card-title">{book.name}</h5>
          <p class="mb-1 text-light small">Author: {book.authorName}</p>
          <p class="mb-1 text-light small">Published: {new Date(book.publishedDate).toLocaleDateString('en-GB')}</p>
          <p class="mb-2 text-light small">Genre: {book.genre}</p>
          
          <p class="mb-2 text-warning small">Rating: {fullStars} {blankStars}  ({Math.round(book.avgRating)})</p>
          <p class="mb-2 text-light small">Number of Ratings:{book.noOfRating}</p>
          <a href="#" class="btn btn-primary w-100">
            Review
          </a>
        </div>
      </div>
    </div>
  );
}

export default Book;
