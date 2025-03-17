import axios from "axios";

export const BlogApi = axios.create({
    baseURL: 'https://dummyjson.com'
})