/*eslint-disable*/
import blogService from '../services/blogs'
import commentService from '../services/comments'


const blogReducer = (state = [], action) => {

    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE':
            return [...state, action.data]
        case 'DELETE':
            const id = action.data
           return state.filter(blog => blog.id !== id)
        case 'LIKE':
            const blogId = action.data.id
            const likedBlog = action.data.blog
            likedBlog.likes = likedBlog.likes +1
            
            return state.map(blog => blog.id !== blogId ? blog : likedBlog)
        case 'ADD_COMMENT':

           const blogToComment = action.data.response.blog
           const comment = action.data.response.content

            let commentedBlog = state.filter(blog => blog.id === blogToComment)
            
                        const updatedBlog = {...commentedBlog[0], comments: [...commentedBlog[0].comments, comment]}
               return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)

            

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

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch({
            type: 'DELETE',
            data: id
        })

    }
}

export const likeBlog = (blogObject, id, oldBlogObject) => {

    return async (dispatch) => {
        await blogService.update(blogObject, id)
        dispatch({
            type: 'LIKE',
            data: {
                blog: oldBlogObject,
                id: id
            }
        })
    }
}

export const dispatchComment = (comment) => {
    return async (dispatch) => {
        await commentService.create(comment)
        .then(response => 
        dispatch({  
                type: 'ADD_COMMENT',
                data: { response }
        }))
    }
}


export default blogReducer