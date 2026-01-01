import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Review.css';
import { useGetBookByIdQuery, useGetReviewForUserQuery, useUpdateReviewForUserMutation } from './Api/bookApi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const Review = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const { data } = useGetBookByIdQuery(id);
    const userId = useSelector((state) => state.auth.userId);
    console.log(userId);
    console.log(id);
    const { data: reviewData } = useGetReviewForUserQuery({
        userId,
        bookId: id
    });
    const [updateReview] = useUpdateReviewForUserMutation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateReview({
            userId: userId,
            bookId: id,
            comment: reviewText,
            rating: rating
        })
        console.log(result)
        if (result?.data?.isSuccess) {
            toast.success("Review added successfully")
        }
        else {
            toast.error("There are some unexpected errors. Review not added")
        }
    };
    useEffect(() => {
        if (reviewData?.responseData) {
            setReviewText(reviewData?.responseData?.comment);
            setRating(reviewData?.responseData?.rating);

        }

        console.log(reviewData);
    }, [reviewData])

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
