import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import { BlogApi } from '../axios';
import useDebounce from '../hooks/useDebounce';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import OwnBlogCard from './OwnBlogCard';
import { ownBlog } from '../lib/slices/dataSlice';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  tags: z.string().min(2, "Tags must be at least 2 characters long."),
  body: z.string().min(10, "Body must be at least 10 characters long."),
});

const Home = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tags: "",
      body: "",
    },
  });

  const { data } = useSelector(state => state.datareducer);
  const [searchValue, setSearchValue] = useState('');
  const [searched, setSearched] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch()
  const [card, setCard] = useState([])

  const debouncedQuery = useDebounce(searchValue, 700);

  useEffect(() => {
    const getCard = JSON.parse(localStorage.getItem('card')) || []
    if (getCard) {
      setCard(getCard)
    }
  }, [])

  useEffect(() => {
    const handleSearch = async () => {
      setIsSearching(true);
      if (debouncedQuery.length === 0) {
        setSearched(null);
        setIsSearching(false);
        return;
      }
      try {
        const res = await BlogApi.get(`/posts/search?q=${debouncedQuery}`);
        if (res.status === 200) {
          setSearched(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  const posts = isSearching ? searched?.posts || [] : data?.posts || [];

  function onSubmit(value) {
    setCard([...card, value])
    dispatch(ownBlog(value))
    localStorage.setItem('card', JSON.stringify(card))

    toast.success('Blog added successfully.')

    form.reset()
  }

  return (
    <div>
      <h1 className='text-gray-200 font-[Inter] text-center text-5xl'>Welcome to my Blogs</h1>

      <div className='flex justify-center mt-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded-lg max-w-sm">

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Title</FormLabel>
                  <FormControl>
                    <Input className='placeholder:text-gray-200 text-gray-200' placeholder="Enter title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Tags</FormLabel>
                  <FormControl>
                    <Input className='placeholder:text-gray-200 text-gray-200' placeholder="Enter tags..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white'>Body</FormLabel>
                  <FormControl>
                    <Input className='placeholder:text-gray-200 text-gray-200' placeholder="Enter body..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='bg-gray-500 cursor-pointer' type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <div className='flex gap-2 items-center mt-5'>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search..."
          className="pl-10 w-100 bg-gray-200 mb-7"
        />
        <Search className="top-1/2 -translate-y-1/2 text-gray-200" size={30} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {posts.length > 0 ? (
          posts.map(blog => <BlogCard blog={blog} key={blog.id} />)
        ) : isSearching ? (
          <p className="text-center text-gray-400">No results found.</p>
        ) : null}

        {
          card.length > 0 && card.map((item, index) => {
            return <OwnBlogCard item={item} index={index} setCard={setCard} card={card} key={index} />
          })
        }
      </div>
    </div>
  );
};

export default Home;
