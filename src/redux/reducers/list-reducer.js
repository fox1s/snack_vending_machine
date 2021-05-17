import {ADD_CATEGORY, ADD_ITEM, PURCHASE} from '../action-types';
import {todayDate} from '../../logic/TodayDate'


const initialState = {
    categoryList: [],
    statisticList: []
}

// const statisticList = useSelector(({statisticList}) => statisticList.statisticList);

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
            // console.log(state)
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

                    // // console.log(category)
                    // let findCategory = state.statisticList.find(elem => elem.date === todayDate);
                    // // let findCategory = category.purchase.find(elem => elem.date === todayDate);
                    // if (!findCategory) {
                    //     let newStatistic = state.statisticList;
                    //     newStatistic.push({name: category.name, date: todayDate, count: 1});
                    // } else {
                    //     findCategory.count += 1;
                    // }
                }
                return category;
            })

            //
            // let newStatisticList = state.statisticList;
            //
            // let findDate = state.statisticList.find(item => item.name === action.payload.name)
            // if (!!findDate) {
            //     console.log(newStatisticList, findDate);
            // } else {
            //      newStatisticList.push({name: action.payload.name, date: todayDate, count: 1})
            // }

            //  const xxx = state.statisticList.map(value => console.log(value, 'map'))
            // console.log(xxx)
            // const newStatisticList = state.statisticList.map(item => {
            //     console.log('click')
            //     if (action.payload.name === item.name) {
            //         console.log(action.payload.name === item.name)
            //         item.count += 1;
            //     } else {
            //         console.log('else')
            //         newStatisticList.push({name: action.payload.name, date: todayDate, count: 1})
            //     }
            //     return item
            // })
            // console.log(newStatisticList)
            return {...state, statisticList: newStatistic, categoryList: newCategories}
        }

        // case PURCHASE: {//purchase
        //     const newCategories = state.categoryList.map(category => {
        //         if (category.name === action.payload.name) {
        //             category.count = category.count - 1;
        //
        //             let findCategory = category.purchase.find(elem => elem.date === todayDate);
        //             if (!findCategory) {
        //                 category.purchase.push({date: todayDate, count: 1})
        //             } else {
        //                 findCategory.count += 1;
        //             }
        //         }
        //         return category;
        //     })
        //     return {...state, categoryList: newCategories}
        // }


        // case CLEAR_CATEGORY: {
        //     const newCategoryList = state.categoryList.filter(category => category.count > 0);
        //     return {...state, categoryList: newCategoryList}
        // }
        default: {
            return state;
        }
    }
}

export default reducer;
