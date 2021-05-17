
// import {todayDate} from '../../logic/TodayDate'
import {CLEAR_CATEGORY} from "../action-types";

const initialState = {
    statisticList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CLEAR_CATEGORY: {
            // const newCategoryList = state.categoryList.filter(category => category.count > 0);
            // console.log(state.categoryList)
            // console.log(newCategoryList)
            return {...state}
        }
        default: {
            return state;
        }
    }
}

export default reducer;
