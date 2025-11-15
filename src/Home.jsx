import React from "react";
import Book from "./Book";
import { useGetBooksQuery, useSearchBooksMutation } from "./Api/bookApi";

function Home() {
    const {data, error, isLoading} = useGetBooksQuery({
        pageindex : 1,
        pagesize : 20
    });
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
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching books</p>}
            {data && data.responseData.map((book) => (
                <Book book = {book} />
            ))}
           
        </div>
      </div>
    </div>
  );
}

export default Home;
