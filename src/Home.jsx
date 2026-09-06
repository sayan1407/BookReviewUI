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
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "./Redux/pageSlice";

function Home() {
  const [getBooks, { isLoading }] = useGetBooksMutation();
  const [bookData, setBookData] = useState(null);
  const currentPage = useSelector((state) => state.page.currentPage);
  const [totalPages, setTotalPages] = useState(12);
  const [totalPagesUI, setTotalPagesUI] = useState(12);
  const [pagesLink, setPagesLink] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();
  const fetchBooks = async () => {
    const result = await getBooks({
      pageindex: currentPage,
      pagesize: 12,
      type: "",
      keyword: "",
    });
    if (result.data?.isSuccess) {
      setBookData(result.data.responseData.books);
      let totalPagesCount =
        result.data.responseData.totalCount > 120
          ? 12
          : Math.ceil(result.data.responseData.totalCount / 12);
      setTotalPagesUI(totalPagesCount);
      totalPagesCount = Math.ceil(result.data.responseData.totalCount / 12)
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
      pagesize: 12,
      type: searchType,
      keyword: searchKeyword,
    });
    if (result.data?.isSuccess) {
      dispatch(setCurrentPage(currentPage + 1));
      setBookData(result.data.responseData.books);

    }



  }

  const handlePrevious = async () => {
    const result = await getBooks({
      pageindex: currentPage - 1,
      pagesize: 12,
      type: searchType,
      keyword: searchKeyword,
    });
    if (result.data?.isSuccess) {
      dispatch(setCurrentPage(currentPage - 1));
      setBookData(result.data.responseData.books);

    }

  }
  const handlePagination = async (pageNumber) => {
    const result = await getBooks({
      pageindex: pageNumber,
      pagesize: 12,
      type: searchType,
      keyword: searchKeyword,
    });
    if (result.data?.isSuccess) {
      dispatch(setCurrentPage(pageNumber));
      setBookData(result.data.responseData.books);

    }

  }

  const fetchData = async (keyword, type) => {
    const res = await fetch(
      `https://bookreviewservice-hzhvcyghehf2hhcu.canadacentral-01.azurewebsites.net/api/Book/books/searchoptions?keyword=${keyword}&type=${type}`
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
      pagesize: 40,
      type: type,
      keyword: keyword,
    });
    if (result.data?.isSuccess) {
      setBookData(result.data.responseData.books);
      let totalPagesCount =
        result.data.responseData.totalCount > 400
          ? 10
          : Math.ceil(result.data.responseData.totalCount / 40);
      setTotalPagesUI(totalPagesCount);
      totalPagesCount = Math.ceil(result.data.responseData.totalCount / 40)
      setTotalPages(totalPagesCount);
      setCurrentPage(1);

    }
    else {
      toast.error(result.data?.errorMessages.join(',') || "Failed to fetch books");
      setSearchType("");
      setSearchKeyword("");
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
      {totalPagesUI > 1 && (
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
      )}
    </div>
  );
}

export default Home;
