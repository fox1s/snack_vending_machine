import {ADD_CATEGORY, CLEAR_CATEGORY, ADD_ITEM, PURCHASE} from '../action-types';
import {todayDate} from '../../logic/TodayDate'

const initialState = {
    categoryList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY: {
            state.categoryList.push(action.payload);
            return {...state, categoryList: [...state.categoryList]};

        }
        case ADD_ITEM: {
            const newCategories = state.categoryList.map(category => {
                if (category.name === action.payload.name) {
                    category.count = action.payload.count
                }
                return category
            })
            return {...state, categoryList: newCategories}
        }
        case PURCHASE: {//purchase
            const newCategories = state.categoryList.map(category => {
                if (category.name === action.payload.name) {
                    category.count = category.count - 1;

                    let findCategory = category.purchase.find(elem => elem.date === todayDate);
                    if (!findCategory) {
                        category.purchase.push({date: todayDate, count: 1})
                    } else {
                        findCategory.count += 1;
                    }
                }
                return category;
            })
            return {...state, categoryList: newCategories}
        }

        case CLEAR_CATEGORY: {
            const newCategoryList = state.categoryList.filter(category => category.count > 0);
            return {...state, categoryList: newCategoryList}
        }
        default: {
            return state;
        }
    }
}

export default reducer;
