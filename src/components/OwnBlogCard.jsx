import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from '../components/ui/button'
import { toast } from "sonner";

const OwnBlogCard = ({ item, index, setCard, card }) => {

  const handleDelete = (index) => {
    const updated = card.filter((_, i) => i !== index)
    setCard(updated)

    localStorage.setItem('card', JSON.stringify(updated))

    toast.success('The blog was successfully deleted!')
  }
  return (
    <Card key={index} className="hover:shadow-lg transition-shadow bg-gray-300">
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
  )
}

export default OwnBlogCard