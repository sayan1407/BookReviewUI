import React from 'react'
import { Navigate } from 'react-router-dom'
function WithAuth(WrappedComponent) {
    return function (props) {
        const token = localStorage.getItem("token");
        if (token) {
            return <WrappedComponent {...props} />;
        } else {
            return <Navigate to="/login" />;
        }
    }
}

export default WithAuth