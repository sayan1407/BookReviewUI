import React from "react";

function Book({book}) {
  const fullStars = [];
  const blankStars = [];
  for(let i=0;i<Math.round(book.avgRating);i++){
    fullStars.push(<i className="bi bi-star-fill"></i>);
  }
  for(let i=0;i<5-Math.round(book.avgRating);i++){
    blankStars.push(<i className="bi bi-star"></i>);
  }
  return (
    <div className="col-md-3 col-sm-6">
      <div className="card book-card p-2 bg-dark text-light">
        <img
          src={`images/${book.imageUrl}`}
          className="book-img w-100"
          alt="Book Image"
        />
        <div className="card-body">
          <h5 className="card-title">{book.name}</h5>
          <p className="mb-1 text-light small">Author: {book.authorName}</p>
          <p className="mb-1 text-light small">Published: {new Date(book.publishedDate).toLocaleDateString('en-GB')}</p>
          <p className="mb-2 text-light small">Genre: {book.genre}</p>
          
          <p className="mb-2 text-warning small">Rating: {fullStars} {blankStars}  ({Math.round(book.avgRating)})</p>
          <p className="mb-2 text-light small">Number of Ratings:{book.noOfRating}</p>
          <a href="#" className="btn btn-primary w-100">
            Review
          </a>
        </div>
      </div>
    </div>
  );
}

export default Book;
