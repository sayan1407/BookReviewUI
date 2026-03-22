import React from "react";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import "./Book.css";
import { useRemoveUserLibraryMutation, useUpdateUserLibraryMutation } from "./Api/bookApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Book({ book, isLibrary }) {
  const navigate = useNavigate();
  const fullStars = [];
  const blankStars = [];
  const [addToLibrary] = useUpdateUserLibraryMutation();
  const [removeFromLibrary] = useRemoveUserLibraryMutation();
  for (let i = 0; i < Math.round(book.avgRating); i++) {
    fullStars.push(<i className="bi bi-star-fill"></i>);
  }
  for (let i = 0; i < 5 - Math.round(book.avgRating); i++) {
    blankStars.push(<i className="bi bi-star"></i>);
  }
  const userId = useSelector((state) => state.auth.userId);
  const handleAddToLibraryClick = async (bookId) => {
     const result = await addToLibrary({userId,bookId})
     if(result.data?.isSuccess)
     {
       toast.success("Added to your library")
     }
     else{
         toast.error(result.data?.errorMessages.join(','))
     }
  }

   const handleRemoveFromLibraryClick = async (bookId) => {
     const result = await removeFromLibrary({userId,bookId})
     if(result.data?.isSuccess)
     {
       toast.success("Removed from your library")
     }
     else{
         toast.error(result.data?.errorMessages.join(','))
     }
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
          {isLibrary ?  <button onClick={() => handleRemoveFromLibraryClick(book.id)} className="btn btn-custom btn-custom-view-all">
            <i className="bi bi-list-ul"></i> Remove From Library
          </button> : <button onClick={() => handleAddToLibraryClick(book.id)} className="btn btn-custom btn-custom-view-all">
            <i className="bi bi-list-ul"></i> Add To Library
          </button>}

          
        </div>
      </div>
    </div>
  );
}

export default Book;
