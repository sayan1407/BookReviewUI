import React from "react";

function Book() {
  return (
    <div class="col-md-3 col-sm-6">
      <div class="card book-card p-2 bg-dark text-light">
        <img
          src="https://via.placeholder.com/200x250"
          class="book-img w-100"
          alt="Book Image"
        />
        <div class="card-body">
          <h5 class="card-title">Book Name</h5>
          <p class="mb-1 text-light small">Author: John Doe</p>
          <p class="mb-1 text-light small">Published: 2020</p>
          <p class="mb-2 text-light small">Genre: Fiction</p>
          <a href="#" class="btn btn-primary w-100">
            Review
          </a>
        </div>
      </div>
    </div>
  );
}

export default Book;
