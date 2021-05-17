import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, addItem} from "../../redux/action-creators";
import styles from './Editing.module.css'
import Alert from "../alerts/Alert";

export default function Editing() {
    const formAddCategory = React.createRef();
    const formAddItem = React.createRef();
    const dispatch = useDispatch();
    const categoryList = useSelector(({categoryList}) => categoryList.categoryList);

    const [warning, setWarning] = useState({addCategory: false, addItem: false, clear: false});
    const [success, setSuccess] = useState({addCategory: false, addItem: false, clear: false});

    const [inputValue, setInputValue] = useState('');

    const onFormSubmit = (e) => {
        e.preventDefault();
    }
    const handlerAddCategory = () => {
        const payload = {
            name: formAddCategory.current[0].value,
            price: formAddCategory.current[1].value,
            count: (formAddCategory.current[2].value === "" ? 0 : formAddCategory.current[2].value)
            // purchase: []
        }

        if (categoryList.find(category => category.name === payload.name) === undefined && !!payload.name) {
            dispatch(addCategory(payload))

            setWarning({...warning, addCategory: false});
            setSuccess({...success, addCategory: true});
        } else {
            setWarning({...warning, addCategory: true});
            setSuccess({...success, addCategory: false})
        }
    }

    const handlerAddItem = () => {
        const payload = {
            name: formAddItem.current[0].value,
            count: formAddItem.current[1].value
        }
        if (payload.name !== "Choose category") {
            dispatch(addItem(payload));

            setWarning({...warning, addItem: false});
            setSuccess({...success, addItem: true});
        } else {
            setWarning({...warning, addItem: true});
            setSuccess({...success, addItem: false});
        }
    }

    const onInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const onSelectChange = (e) => {
        const category = categoryList.find(category => e.target.value === category.name);
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
            {/*///////////////////////////////////Add category//////////////////////////////////*/}
            <div className={styles.nameOfCategory}>Add category</div>
            <form action="" onSubmit={onFormSubmit} ref={formAddCategory}>
                <span className={styles.categoryParameters}>Name</span>
                <input className={styles.input} type={'text'}/>

                <span className={styles.categoryParameters}>Price</span>
                <input className={styles.input} type={'number'} step={'any'}/>

                <span className={styles.categoryParameters}>Count</span>
                <input className={styles.input} type={'number'} placeholder={0}/>
                <button onClick={handlerAddCategory}>Save</button>
            </form>

            <div>
                {warning.addCategory &&
                <Alert class_name={'warning'} text={'Category already exist or the name written wrong!'}/>}
                {success.addCategory && <Alert class_name={'success'} text={'Success!'}/>}
            </div>


            {/*///////////////////////////////////Add item////////////////////////////////*/}
            <div className={[styles.addItemCategory, styles.nameOfCategory].join(' ')}>Add item</div>
            <form action="" onSubmit={onFormSubmit} ref={formAddItem}>
                Name
                <select onChange={onSelectChange} className={styles.input}>
                    <option>Choose category</option>
                    {!!categoryList.length && categoryList.map((category, id) => <option
                        key={id}>{category.name}</option>)}
                </select>

                Count
                <input className={styles.input} type={"number"} onInput={onInputValue} value={inputValue}
                       placeholder={'Empty'}/>
                <button onClick={handlerAddItem}>Save</button>
            </form>

            <div>
                {warning.addItem &&
                <Alert class_name={'warning'} text={'Please choose the name!'}/>}
                {success.addItem &&
                <Alert class_name={'success'} text={'Success!'}/>}
            </div>


            {/*/////////////////////////////////////clear///////////////////////////////////*/}
            <div>
                <div className={[styles.addItemCategory, styles.nameOfCategory].join(' ')}>Clear</div>
                <span className={styles.categoryParameters}>Stop serving all snack categories that don’t have items for sale</span>
                {/*<button onClick={() => dispatch(clearCategory())}>Clear</button>*/}
            </div>

            <div>
                {warning.clear &&
                <Alert class_name={'warning'} text={'something go wrong!'}/>}
                {success.clear &&
                <Alert class_name={'success'} text={'Success!'}/>}
            </div>


        </div>
    );
}
