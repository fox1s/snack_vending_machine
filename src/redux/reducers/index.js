import {combineReducers} from "redux";
import categoryListReducer from './list-reducer';

export const reducer = combineReducers({
    categoryList: categoryListReducer
})
