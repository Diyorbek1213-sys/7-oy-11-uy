import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './components/Home'
import OwnBlogs from './components/OwnBlogs'
import { BlogApi } from './axios'
import { useDispatch } from 'react-redux'
import { getData } from './lib/slices/dataSlice'
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const data = async () => {
      try {
        const res = await BlogApi.get('/posts')
        dispatch(getData(res.data))
        if (res.status === 200) {
          toast.success("Data successfully loaded!")
        }
      } catch (error) {
        toast.error("An error occurred! The data could not be loaded.")
        console.log(error)
      }
    }
    data()
  }, [])

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<MainLayout><Home /></MainLayout>} />
        <Route path='/own' element={<MainLayout><OwnBlogs /></MainLayout>} />
      </Routes>
    </div>
  )
}

export default App