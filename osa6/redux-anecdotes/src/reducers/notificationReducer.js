const initialState = null

const notificationReducer = (state= initialState, action) => {

    switch (action.type) {
        case 'VOTE_MESSAGE':
            const voteNotification = action.data.notification
            return `You voted "${voteNotification}"`
        
        case 'EMPTY':
            return null

        case 'ADD_ANECDOTE_MESSAGE':
            const anecdoteNotification = action.data.notification
            return `Anecdote "${anecdoteNotification}" created`
            
        default:
            return state
    }

}

export const voteNotification = notification => {
    return { 
        type: 'VOTE_MESSAGE',
        data: { notification }
    }
}

export const emptyNotification = () => {
    return {
        type: 'EMPTY',
        data: null
    }
}

export const anecdoteNotification = notification => {
    return {
        type: 'ADD_ANECDOTE_MESSAGE',
        data: { notification },
    }
}


export default notificationReducer