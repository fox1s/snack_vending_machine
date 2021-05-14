import {ADD_CATEGORY, CLEAR_CATEGORY} from '../action-types'

const initialState = {
    categoryList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY: {
            console.log('додати категорію')
            // if (state.categoryList.indexOf(action.payload) !== -1) {
            //     const newCategoryList = state.categoryList.filter(value => value.id !== action.payload.id)
            //     return {...state, categoryList: newCategoryList}
            // } else {
                state.categoryList.push(action.payload)
                return {...state, categoryList: [...state.categoryList]}
            // }

        }
        case CLEAR_CATEGORY: {
            console.log('прибрати категорію')
            return {...state, categoryList: []}
        }
        default: {
            return state;
        }
    }
}

export default reducer;
