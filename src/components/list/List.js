import React from "react";
import ListItem from "../list-item/ListItem";
import {useDispatch, useSelector} from "react-redux";
import {purchaseItem} from "../../redux/action-creators";

export default function List() {
    const categoryList = useSelector(({categoryList}) => categoryList.categoryList);
    const dispatch = useDispatch();

    const onClickBuy = (category) => {
        // let date = new Date();
        // let dateMonth;
        // if (date.getMonth().toString().length < 10) {
        //     dateMonth = `0${date.getMonth() + 1}`;
        // } else {
        //     dateMonth = `${date.getMonth() + 1}`;
        // }
        // const purchaseDate = `${date.getFullYear()}-${dateMonth}-${date.getDate()}`;
        // console.log(purchaseDate);

        dispatch(purchaseItem(category))
    }
    return (
        <div>
            {categoryList && categoryList.map((category, id) => <ListItem category={category} key={id}
                                                                          onClickBuy={onClickBuy}/>)}
        </div>
    );
}
