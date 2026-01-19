import React from 'react'
import { useSelector } from 'react-redux'
import { useGetRecommendedBooksQuery } from './Api/bookApi'
import Book from './Book'
import Spinner from './components/Spinner'

import './Recommendation.css'
import WithAuth from './HOC/WithAuth'

const Recommendation = () => {
    const userId = useSelector((state) => state.auth.userId);
    const { data: recommendedBooks, isLoading } = useGetRecommendedBooksQuery({ userId });
    return (
        <div className="recommendation-container">
            <div className="text-center mb-5">
                <h2 className="recommendation-title">Recommended For You</h2>
                <p className="recommendation-subtitle">
                    Based on your ratings & reviews. Add more reviews to get more accurate recommendations.
                </p>
            </div>
            <div className="container mb-5">
                <div className="row g-4">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        recommendedBooks && recommendedBooks.responseData && recommendedBooks.responseData.map((book) => <Book key={book.id || book.bookId} book={book} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default WithAuth(Recommendation)