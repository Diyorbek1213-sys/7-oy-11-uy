import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'main',
    initialState: {
        data: null,
        ownBlogs: []
    },
    reducers: {
        getData: (state, action) => {
            state.data = action.payload
        },
        remove: (state, action) => {
            state.data.posts = state.data?.posts?.filter(item => item.id !== action.payload)
        },
        ownBlog: (state, action) => {
            state.ownBlogs.push(action.payload)
        },
        ownRemove: (state, action) => {
            state.ownBlogs = state.ownBlogs.filter((_, i) => i !== action.payload)
        }
    }
})

export default dataSlice.reducer
export const { getData, remove, ownBlog, ownRemove } = dataSlice.actions