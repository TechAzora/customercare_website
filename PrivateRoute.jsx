import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PrivateRoute(props) {
    const { Component } = props
    const Navigate = useNavigate()
    useEffect(() => {
        const tokenData = localStorage.getItem('token');
        if (!tokenData) {
            Navigate('/login')
        }
    }, [Navigate])
    return (
        <>
            <Component />
        </>
    )
}

export default PrivateRoute