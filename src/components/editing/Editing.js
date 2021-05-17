import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, addItem, clearCategory} from "../../redux/action-creators";
import styles from './Editing.module.css'
import Alert from "../alerts/Alert";

export default function Editing() {
    const formAddCategory = React.createRef();
    const formAddItem = React.createRef();
    const dispatch = useDispatch();
    const categoryList = useSelector(({categoryList}) => categoryList.categoryList);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
    }
    const handlerAddCategory = () => {
        const payload = {
            name: formAddCategory.current.children[0].value,
            price: formAddCategory.current.children[1].value,
            count: (formAddCategory.current.children[2].value === "" ? 0 : formAddCategory.current.children[2].value),
            purchase: []
        }

        if (categoryList.find(category => category.name === payload.name) === undefined && !!payload.name) {
            dispatch(addCategory(payload))

            setWarning(false);
            setSuccess(true);
        } else {
            setWarning(true);
            setSuccess(false)
        }
    }

    const handlerAddItem = () => {
        const payload = {
            name: formAddItem.current.children[0].value,
            count: formAddItem.current.children[1].value
        }
        dispatch(addItem(payload))
    }

    const onInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const handlerAddCategory2 = () => {
        console.log(categoryList)
    }
    const onSelectChange = (e) => {
        // console.log(e.target.value)
        const category = categoryList.find(category => e.target.value === category.name);
        // console.log(category);
        if (!!category) {
            setInputValue(category.count);
        } else {
            setInputValue('');
        }

    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSuccess(false);
    //     }, 5000)
    // }, [success])

    return (
        <div>
            Add category
            <form action="" onSubmit={onFormSubmit} ref={formAddCategory}>
                Name
                <input type={'text'}/>
                Price
                <input type={'number'} step={'any'}/>
                Count
                <input type={'number'} placeholder={0}/>
                <button onClick={handlerAddCategory}>Save</button>
            </form>

            {/*{warning && <div className={styles.warning}>Category already exist!</div>}*/}
            {warning && <Alert class_name={'warning'} text={'Category already exist or the name written wrong!'}/>}
            {/*{success && <div className={styles.success}>Success</div>}*/}
            {success && <Alert class_name={'success'} text={'Success!'}/>}

            <button onClick={handlerAddCategory2}>show</button>
            {/*/////////////////////////////////////////////////////////////////////////////////////*/}
            <br/><br/><br/>
            Add item
            <form action="" onSubmit={onFormSubmit} ref={formAddItem}>
                Name
                <select onChange={onSelectChange}>
                    <option>Choose category</option>
                    {!!categoryList.length && categoryList.map((category, id) => <option
                        key={id}>{category.name}</option>)}
                </select>

                Count
                <input type={"number"} onInput={onInputValue} value={inputValue} placeholder={'Empty'}/>
                <button onClick={handlerAddItem}>Save</button>
            </form>
            <button onClick={() =>dispatch(clearCategory())}>Clear</button>
        </div>
    );
}
