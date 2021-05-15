import {ADD_CATEGORY, CLEAR_CATEGORY, ADD_ITEM, PURCHASE} from '../action-types';
import {purchaseDate} from '../../logic/PurchaseDate'

const initialState = {
    categoryList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORY: {
            console.log('додати категорію');
            // if (state.categoryList.indexOf(action.payload) !== -1) {
            // const newCategoryList = state.categoryList.filter(value => value.id !== action.payload.id)
            // return {...state, categoryList: newCategoryList}
            // } else {
            state.categoryList.push(action.payload);
            return {...state, categoryList: [...state.categoryList]};
            // }

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

                    let findCategory = category.purchase.find(elem => elem.date === purchaseDate);
                    if (!findCategory) {
                        category.purchase.push({date: purchaseDate, count: 1})
                    } else {
                        findCategory.count += 1;
                    }
                }
                return category;
            })
            return {...state, categoryList: newCategories}
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
