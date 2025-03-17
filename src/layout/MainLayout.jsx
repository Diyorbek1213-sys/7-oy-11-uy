import React from 'react'
import Header from '../components/Header'

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container max-w-[1200px] mx-auto mt-16 bg-gray-700 rounded-2xl p-6 mb-6">
                {children}
            </div>
        </div>
    )
}

export default MainLayout