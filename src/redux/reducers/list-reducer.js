import {ADD_CATEGORY, ADD_ITEM, CLEAR_CATEGORY, PURCHASE} from '../action-types';
import {todayDate} from '../../logic/TodayDate'


const initialState = {
    categoryList: [],
    statisticList: []
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
            let newStatistic = state.statisticList;

            const newCategories = state.categoryList.map(category => {
                if (category.name === action.payload.name) {
                    category.count = category.count - 1;

                    let findCategory = state.statisticList.find(elem => elem.date === todayDate && elem.name === action.payload.name);
                    if (!!findCategory) {
                        findCategory.count += 1;
                    } else {
                        newStatistic = state.statisticList;
                        newStatistic.push({name: category.name, date: todayDate, count: 1, price: category.price})
                    }

                }
                return category;
            })

            return {...state, statisticList: newStatistic, categoryList: newCategories}
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
