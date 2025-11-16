import React, { useEffect,useState } from "react";
import Book from "./Book";
import {
  useGetBooksMutation,
  useGetSearchOptionsQuery,
  useSearchBooksMutation,
} from "./Api/bookApi";
import SearchBook from "./searchBook";
import { type } from "@testing-library/user-event/dist/type";

function Home() {
  const [getBooks] = useGetBooksMutation(); 
  const[bookData, setBookData] = useState(null);
  const fetchBooks = async () => {
      const result = await getBooks({pageindex : 1, pagesize : 20, type : "", keyword : ""});
      setBookData(result.data.responseData);
    }
  useEffect( () => {
    
    fetchBooks();
  },[])
 
  const fetchData = async (keyword,type) => {
    const res = await fetch(`https://localhost:7150/api/Book/books/searchoptions?keyword=${keyword}&type=${type}`);
    const data = await res.json();
    const options = data.responseData;
    return options;

  };

 const handleSearch = async ({type, keyword}) => {
    console.log("handle search called");
    const result = await getBooks({pageindex : 1, pagesize : 5, type : type, keyword : keyword});
    console.log(result);
    setBookData(result.data.responseData);
    }

  return (
    <div>
      <div class="container my-4">
        <div class="row justify-content-center">
          <div class="col-md-8 d-flex gap-2">
            <SearchBook fetchData={fetchData} handleSearch = {handleSearch} />
          </div>
        </div>
      </div>

      <div class="container mb-5">
        <div class="row g-4">
          {bookData && bookData.map((book) => <Book book={book} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
