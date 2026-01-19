import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Book.css";

function Book({ book }) {
  const navigate = useNavigate();
  const fullStars = [];
  const blankStars = [];
  for (let i = 0; i < Math.round(book.avgRating); i++) {
    fullStars.push(<i className="bi bi-star-fill"></i>);
  }
  for (let i = 0; i < 5 - Math.round(book.avgRating); i++) {
    blankStars.push(<i className="bi bi-star"></i>);
  }
  return (
    <div className="col-md-3 col-sm-6">
      <div className="card book-card p-2 bg-dark text-light">
        <img
          src={`https://bookreviewaistorage.blob.core.windows.net/book-image-container/${book.name.replaceAll(" ", "")}`}
          className="book-img w-100"
          alt="Book Image"
        />
        <div
          className="card-body"
          onClick={() => navigate(`/allReviews/${book.id}`)}
          style={{ cursor: "pointer" }}
        >
          <h5 className="card-title">{book.name}</h5>
          <p className="mb-1 text-light small">Author: {book.authorName}</p>
          <p className="mb-1 text-light small">Published: {new Date(book.publishedDate).toLocaleDateString('en-GB')}</p>
          <p className="mb-2 text-light small">Genre: {book.genre}</p>

          <p className="mb-2 text-warning small">Rating: {fullStars} {blankStars}  ({Math.round(book.avgRating)})</p>
          <p className="mb-2 text-light small">Number of Ratings:{book.noOfRating}</p>

        </div>
        <div className="book-card-actions">
          <Link to={`/review/${book.id}`} className="btn btn-custom btn-custom-review">
            <i className="bi bi-pencil-fill"></i> Add a Review
          </Link>
          <Link to={`/allReviews/${book.id}`} className="btn btn-custom btn-custom-view-all">
            <i className="bi bi-list-ul"></i> View All Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Book;
