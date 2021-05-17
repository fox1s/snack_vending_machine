import {combineReducers} from "redux";
import categoryListReducer from './list-reducer';
import statisticListReducer from './statistic-list-reducer';

export const reducer = combineReducers({
    categoryList: categoryListReducer,
    statisticList: statisticListReducer
})
