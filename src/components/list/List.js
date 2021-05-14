import React from "react";
import ListItem from "../list-item/ListItem";
import {useSelector} from "react-redux";

export default function List() {
    const categoryList = useSelector(({categoryList}) => categoryList.categoryList)

    return (
        <div>
            {categoryList && categoryList.map((category,id) => <ListItem category={category} key={id}/>)}
        </div>
    );
}
