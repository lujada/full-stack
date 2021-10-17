const filterReducer = (state = [], action) => {
  switch (action.type) {
  case 'FILTER':
    const search = action.data.search
    return search
  }
  return state
}

export const filter = (search) => {
  return {
    type: 'FILTER',
    data: { search }
  }
}

export default filterReducer