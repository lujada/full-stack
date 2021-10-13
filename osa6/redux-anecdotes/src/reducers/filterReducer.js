

const filterReducer = (state = [], action) => {
    switch (action.type) {
        case 'FILTER':
           const matches = action.data.matches
           console.log(matches, 'matches in redux')
            return matches
    }
    return state
}

export const filter = (matches) => {
    return {
        type: 'FILTER',
        data: { matches }
    }
}

export default filterReducer