import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCategory} from "../../redux/action-creators";


export default function Editing() {
    const formDiv = React.createRef();
    const dispatch = useDispatch()

    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(formDiv.current.children[2].value === "")
    }
    const handlerAddCategory = () => {
        dispatch(addCategory({
            name: formDiv.current.children[0].value,
            price: formDiv.current.children[1].value,
            count: (formDiv.current.children[2].value === "" ? 0 : formDiv.current.children[2].value),
        }))
    }


    const categoryList = useSelector(({categoryList}) => categoryList.categoryList)

    const handlerAddCategory2 = () => {
        console.log(categoryList)
    }
    return (
        <div>
            Add category
            <form action="" onSubmit={onFormSubmit} ref={formDiv}>
                name
                <input type="text"/>
                Price
                <input type="text"/>
                Count
                <input type="text" placeholder={0}/>
                <button onClick={handlerAddCategory}>Save</button>
            </form>
            <button onClick={handlerAddCategory2}>show</button>
        </div>
    );
}
