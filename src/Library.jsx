import React from 'react'
import { useSelector } from 'react-redux'
import {useGetUserLibraryQuery } from './Api/bookApi'
import Book from './Book'


import './Recommendation.css'
import WithAuth from './HOC/WithAuth'
import Spinner from './components/Spinner'

const Library = () => {
    const userId = useSelector((state) => state.auth.userId);
    const { data: userLibrary, isLoading } = useGetUserLibraryQuery({ userId });
    return (
        <div className="recommendation-container">
            <div className="text-center mb-5">
                <h2 className="recommendation-title">My Library</h2>
               
            </div>
            <div className="container mb-5">
                <div className="row g-4">
                    {isLoading ? (
                       <Spinner/>
                    ) : (
                        userLibrary && userLibrary.responseData && userLibrary.responseData.map((book) => <Book key={book.id || book.bookId} book={book.book} isLibrary = {true} />)
                    )}
                </div>
            </div>
        </div>
    )
}

export default WithAuth(Library)