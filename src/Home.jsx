import React from "react";
import Book from "./Book";

function Home() {
  return (
    <div>
      <div class="container my-4">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <input
              type="text"
              class="form-control form-control-lg shadow-sm"
              placeholder="Search by book name, author, or genre..."
            />
          </div>
        </div>
      </div>

      <div class="container mb-5">
        <div class="row g-4">
           <Book />
        </div>
      </div>
    </div>
  );
}

export default Home;
