import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from '../components/ui/button'
import { toast } from "sonner";
import { ownRemove } from '../lib/slices/dataSlice';

const OwnBlogs = () => {
  const { ownBlogs } = useSelector(state => state.mainData)
  const dispatch = useDispatch()

  const handleDelete = (index) => {
    dispatch(ownRemove(index))
    toast.success('The blog was successfully deleted!')
  }

  return (
    <div className='flex flex-col gap-5 shadow-2xl'>
      {
        ownBlogs.length > 0 ? (ownBlogs && ownBlogs.map((item, index) => {
          return <Card key={index} className="hover:shadow-lg transition-shadow bg-gray-300">
            <CardHeader>
              <CardTitle>{item?.title}</CardTitle>
              <CardDescription>{item?.tags}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{item?.body}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>👍 0</span>
                <span>👀 0 views</span>
              </div>
              <div className='mt-3'>
                <Button onClick={() => handleDelete(index)} className='bg-gray-600 cursor-pointer hover:bg-gray-400'>Delete</Button>
              </div>
            </CardContent>
          </Card>
        })) : <p className='text-3xl text-gray-300'>The blogs you added do not exist.</p>
      }
    </div>
  )
}

export default OwnBlogs