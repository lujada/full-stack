const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    if (blogs === false) {
        return 0
    }
    let likes = blogs.map(blog => blog.likes)
    let sum = likes.reduce(function(total, item) {
        return total + item
    }, 0)
    return sum

}

const favoriteBlog = (blogs) => {
    let filteredBlogs = blogs.map(({author, likes, title}) => ({author, likes, title}))
    let likes = filteredBlogs.map(blog => blog.likes)
    
    const indexOfMaxValue = likes.reduce((iMax, likes, index, arr) => 
        likes > arr[iMax] ? index : iMax, 0
    , 0)
    
    return filteredBlogs[indexOfMaxValue]

}

const mostBlogs = (blogs) => {
    const mostBlogged = _(blogs).countBy('author')
    .map((blogs, author) =>
    ({
        'author': author, 
        'blogs': blogs   }))
    .maxBy('blogs')
    return mostBlogged
    
        
}

const mostLikes = (blogs) => {
    const filteredList = blogs.map(({author, likes}) => 
        ({author, likes})
    )

    const allLikes = _(filteredList)
    .groupBy('author')
    .map((likes, author) => {
        return {
        author: author,
        likes: _.sumBy(likes, 'likes')
        }
    })
    .value()

    const mostLikes = _.maxBy(allLikes,'likes')
    return mostLikes
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
