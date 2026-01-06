import React, { useEffect, useState } from "react";
import Book from "./Book";
import {
  useGetBooksMutation,
  useGetSearchOptionsQuery,
  useSearchBooksMutation,
} from "./Api/bookApi";
import SearchBook from "./searchBook";
import Spinner from "./components/Spinner";
import { type } from "@testing-library/user-event/dist/type";
import { toast } from "react-toastify";

function Home() {
  const [getBooks, { isLoading }] = useGetBooksMutation();
  const [bookData, setBookData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [totalPagesUI, setTotalPagesUI] = useState(10);
  const [pagesLink, setPagesLink] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const fetchBooks = async () => {
    const result = await getBooks({
      pageindex: 1,
      pagesize: 10,
      type: "",
      keyword: "",
    });
    if (result.data?.isSuccess) {
      setBookData(result.data.responseData.books);
      let totalPagesCount =
        result.data.responseData.totalCount > 100
          ? 10
          : Math.ceil(result.data.responseData.totalCount / 10);
      setTotalPagesUI(totalPagesCount);
      totalPagesCount = Math.ceil(result.data.responseData.totalCount / 10)
      setTotalPages(totalPagesCount);
      setCurrentPage(1);
      let temp = [];
      for (let i = 1; i <= totalPagesCount; i++) {
        temp.push(
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              onClick={() => handlePagination(i)}
            >
              {i}
            </a>
          </li>
        );
        setPagesLink(temp);
      }
    }
    else {
      toast.error(result.data?.errorMessages.join(',') || "Failed to fetch books");
    }

  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleNext = async () => {
    const result = await getBooks({
      pageindex: currentPage + 1,
      pagesize: 10,
      type: searchType,
      keyword: searchKeyword,
    });
    if (result.data?.isSuccess) {
      setCurrentPage((prevPage) => prevPage + 1);
      setBookData(result.data.responseData.books);

    }



  }

  const handlePrevious = async () => {
    const result = await getBooks({
      pageindex: currentPage - 1,
      pagesize: 10,
      type: searchType,
      keyword: searchKeyword,
    });
    if (result.data?.isSuccess) {
      setCurrentPage((prevPage) => prevPage - 1);
      setBookData(result.data.responseData.books);

    }

  }
  const handlePagination = async (pageNumber) => {
    const result = await getBooks({
      pageindex: pageNumber,
      pagesize: 10,
      type: searchType,
      keyword: searchKeyword,
    });
    if (result.data?.isSuccess) {
      setCurrentPage(pageNumber);
      setBookData(result.data.responseData.books);

    }

  }

  const fetchData = async (keyword, type) => {
    const res = await fetch(
      `http://sayanksaha7-001-site1.anytempurl.com/api/Book/books/searchoptions?keyword=${keyword}&type=${type}`
    );
    const data = await res.json();
    const options = data.responseData;
    return options;
  };

  const handleSearch = async ({ type, keyword }) => {
    setSearchType(type);
    setSearchKeyword(keyword);
    const result = await getBooks({
      pageindex: 1,
      pagesize: 10,
      type: type,
      keyword: keyword,
    });
    if (result.data?.isSuccess) {
      setBookData(result.data.responseData.books);
      let totalPagesCount =
        result.data.responseData.totalCount > 100
          ? 10
          : Math.ceil(result.data.responseData.totalCount / 10);
      setTotalPagesUI(totalPagesCount);
      totalPagesCount = Math.ceil(result.data.responseData.totalCount / 10)
      setTotalPages(totalPagesCount);

    }
    else {
      toast.error(result.data?.errorMessages.join(',') || "Failed to fetch books");
    }

  };

  return (
    <div>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex gap-2">
            <SearchBook fetchData={fetchData} handleSearch={handleSearch} />
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row g-4">
          {isLoading ? (
            <Spinner />
          ) : (
            bookData && bookData.map((book) => <Book key={book.id || book.bookId} book={book} />)
          )}
        </div>
      </div>
      <div className="container mb-5">
        <nav>
          <ul className={`pagination justify-content-center`}>
            <li className={`page-item  ${currentPage == 1 ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => handlePrevious()}>
                Previous
              </a>
            </li>
            {[...Array(totalPagesUI)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <li key={pageNum} className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => handlePagination(pageNum)}
                  >
                    {pageNum}
                  </a>
                </li>
              );
            })}
            <li className={`page-item  ${(currentPage == totalPages) ? 'disabled' : ''}`}>
              <a className="page-link" onClick={() => handleNext()}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
