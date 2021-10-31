/*eslint-disable*/
import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE':
            return [...state, action.data]
        default:
            return state
    }

}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
        const blog = await blogService.create(content)
        dispatch({
            type: 'CREATE',
            data: blog
        })
    }
}

export default blogReducer