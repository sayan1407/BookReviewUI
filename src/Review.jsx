import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Review.css';
import { useGetBookByIdQuery } from './Api/bookApi';
const Review = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const { data } = useGetBookByIdQuery(id);
    console.log(data);
    // Mock Book Data
    // const book = {
    //     title: "The Great Adventure",
    //     author: "John Doe",
    //     publishedDate: "January 15, 2024",
    //     coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Nice placeholder
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Review Submitted! (Visual Demo)');
        // Functionality not required per instructions
    };

    return (
        <div className="review-container">
            {data?.isSuccess &&
                <div className="review-card">
                    <div className="book-cover-container">
                        <img src={`../images/${data?.responseData?.imageUrl}`} alt={data?.responseData?.name} className="book-cover" />
                    </div>

                    <div className="review-content">
                        <div className="book-details">
                            <h2 className="book-title">{data?.responseData?.name}</h2>
                            <h3 className="book-author">By {data?.responseData?.authorName}</h3>
                            <p className="book-date">Published: {new Date(data?.responseData?.publishedDate).toLocaleDateString('en-GB')}</p>
                        </div>

                        <div className="star-rating">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <span
                                        key={index}
                                        className={`star ${ratingValue <= (hover || rating) ? 'filled' : ''}`}
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        &#9733;
                                    </span>
                                );
                            })}
                            {/* {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <span
                                    key={index}
                                    className={`star ${ratingValue <= (hover || rating) ? 'filled' : ''}`}
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    &#9733;
                                </span>
                            );
                        })} */}
                        </div>

                        <form className="review-form" onSubmit={handleSubmit}>
                            <textarea
                                className="review-textarea"
                                placeholder="Write your review here..."
                                rows="5"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            <button type="submit" className="submit-btn">
                                Submit Review
                            </button>
                        </form>
                    </div>

                </div>
            }
        </div>
    );
};

export default Review;
