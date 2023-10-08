import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Auth from './Auth'
import { useAuthContext } from 'Contexts/AuthContext'
import Update from './UpdateStudent'
import UpdateCourse from './UpdateCourses'

export default function Index() {
    const { isAuth } = useAuthContext()

    return (
        <>
            <Routes>
                <Route path='/*' element={<Dashboard />} />
                <Route path='/updatecourse/:id' element={<UpdateCourse />} />
                <Route path='/auth/*' element={<Auth />} />

            </Routes>
        </>
    )
}
