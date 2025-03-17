import React from 'react'
import { useDispatch } from 'react-redux'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from '../components/ui/button'
import { remove } from '../lib/slices/dataSlice';
import { toast } from "sonner";
import { BlogApi } from '../axios';

const BlogCard = ({ blog }) => {
    const dispatch = useDispatch()

    const handleDelete = async (id) => {
        try {
            const res = await BlogApi.delete(`/posts/${id}`)
            if (res.status === 200) {
                dispatch(remove(id))
                toast.success("The blog was successfully deleted!")
            }
        } catch (error) {
            console.log(error)
            toast.error("There was an error deleting the blog.")
        }
    }

    return (
        <Card key={blog?.id} className="hover:shadow-lg transition-shadow bg-gray-300">
            <CardHeader>
                <CardTitle>{blog?.title}</CardTitle>
                <CardDescription>{blog?.tags}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">{blog?.body}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>👍 {blog?.reactions?.likes}</span>
                    <span>👀 {blog?.views} views</span>
                </div>
                <div className='mt-3'>
                    <Button onClick={() => handleDelete(blog.id)} className='bg-gray-600 cursor-pointer hover:bg-gray-400'>Delete</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BlogCard