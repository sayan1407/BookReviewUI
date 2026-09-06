import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery, useGetReviewsByBookIdQuery } from './Api/bookApi';
import WithAuth from './HOC/WithAuth';

const AllReviews = () => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const { data: bookData } = useGetBookByIdQuery(id);
    const { data: reviewsData } = useGetReviewsByBookIdQuery({ bookId: id, pageIndex: currentPage, pageSize: 10 });
    console.log(reviewsData);
    useEffect(() => {
        if (reviewsData?.isSuccess) {
            let totalPagesCount =
                reviewsData?.responseData?.length > 100
                    ? 10
                    : Math.ceil(reviewsData?.responseData?.length / 10);
            setTotalPages(totalPagesCount);

        }


    }, [reviewsData]);

    const handleNext = async () => {

        setCurrentPage((prevPage) => prevPage + 1);

    }

    const handlePagination = async (pageNumber) => {
        setCurrentPage(pageNumber);

    }

    const handlePrevious = async () => {
        setCurrentPage((prevPage) => prevPage - 1);

    }

    return (
        <div className="container mt-4">
            {/* Book Header Section */}
            {bookData?.isSuccess && (
                <div className="card bg-dark text-light mb-4 p-3 border-secondary">
                    <div className="row g-0 align-items-center">
                        <div className="col-md-2 text-center">
                            <img
                                src={`https://bookreviewstoragenew.blob.core.windows.net/book-image-container/${bookData.responseData.name}`}
                                className="img-fluid rounded"
                                alt={bookData.responseData.name}
                                style={{ maxHeight: '150px' }}
                            />
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <h2 className="card-title text-warning">{bookData.responseData.name}</h2>
                                <h5 className="card-subtitle mb-2">By {bookData.responseData.authorName}</h5>
                                <p className="card-text"><small className="text-light">Genre: {bookData.responseData.genre}</small></p>
                                <p className="card-text"><small className="text-light">Description: {bookData.responseData.description}</small></p>
                                <p className="card-text"><small className="text-light">Published: {new Date(bookData.responseData.publishedDate).toLocaleDateString('en-GB')}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <h4 className="text-light mb-3">All Reviews</h4>
            <div className="reviews-list">
                {reviewsData?.responseData && reviewsData.responseData.length > 0 ? (
                    reviewsData.responseData.map((review, index) => (
                        <div key={index} className="card bg-dark text-light mb-3 border-secondary">
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-primary">{review.name || "Anonymous User"}</h6>
                                <div className="mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`bi bi-star${i < review.rating ? '-fill' : ''} text-warning small me-1`}></i>
                                    ))}
                                </div>
                                <p className="card-text">{review.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-light">No reviews yet for this book.</div>
                )}
            </div>
            {totalPages > 1 &&
                <div className="container mb-5">
                    <nav>
                        <ul className={`pagination justify-content-center`}>
                            <li className={`page-item  ${currentPage == 1 ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => handlePrevious()}>
                                    Previous
                                </a>
                            </li>
                            {[...Array(totalPages)].map((_, index) => {
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
                            <li className={`page-item  ${(currentPage == totalPages) && (totalPages < 10) ? 'disabled' : ''}`}>
                                <a className="page-link" onClick={() => handleNext()}>
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            }

        </div>
    );
};

export default WithAuth(AllReviews);
