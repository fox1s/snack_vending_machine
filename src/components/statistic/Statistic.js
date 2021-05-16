import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";

export default function Statistic() {
    const [monthFlag, setMonthFlag] = useState(false); // buttons logic
    const [dayFlag, setDayFlag] = useState(false);     // buttons logic
    const [filterDate, setFilterDate] = useState([])

    const [inputValue, setInputValue] = useState({year: '2021', month: '5'}); //react from
    const monthReportForm = useRef(null);
    const categoryList = useSelector(({categoryList}) => categoryList.categoryList);

    ////////////////////////////////////////// buttons logic
    const onClickMonthReport = () => {
        setMonthFlag(true);
        setDayFlag(false);
    }
    const onClickDayReport = () => {
        setDayFlag(true);
        setMonthFlag(false);
    }
    ////////////////////////////////////////////////////////////

    const onFormSubmit = (e) => {
        e.preventDefault();
        // console.log('onFormSubmit')
        let dateArr = [];
        categoryList.forEach(category => {
            if (category.purchase.length > 0) {
                category.purchase.forEach(date => {
                    dateArr.push({...date, name: category.name, price: +category.price})
                })
            }
        })
        const chosenData = `${e.target[0].value}-${e.target[1].value.length === 1 ? '0' + e.target[1].value : e.target[1].value}`;
        const filter = dateArr.filter(date => date.date.slice(0, 7) === chosenData)
        setFilterDate(filter);
    }

    const onInp = () => {
        setInputValue({
            year: monthReportForm.current[0].value,
            month: monthReportForm.current[1].value,
        })
    }

    return (
        <div>
            <button onClick={onClickMonthReport}>Report for month</button>
            <button onClick={onClickDayReport}>Report for day</button>

            {monthFlag &&
            <div>
                Report for month

                <form action="" onSubmit={onFormSubmit} ref={monthReportForm}>
                    <input type={"number"} onInput={onInp} value={inputValue.year}/>
                    <input type={"number"} onInput={onInp} value={inputValue.month}/>
                    <button>Find</button>
                </form>
                {filterDate.length > 0 &&
                <div>
                    <div>Total: {filterDate.reduce((acc, {price}) => {
                        return acc + price
                    }, 0)}$</div>


                    <div>
                        {filterDate.map((value, id) => <div
                            key={id}>{value.name} - {value.count} - {value.price}$</div>)}

                    </div>
                </div>

                }

            </div>}

            {/*{dayFlag && <div>*/}
            {/*    Report for day*/}

            {/*    <form action="" onSubmit={onFormSubmit} ref={monthReportForm}>*/}
            {/*        <input type={"number"} onInput={onInp} value={inputValue.year}/>*/}
            {/*        <input type={"number"} onInput={onInp} value={inputValue.month}/>*/}
            {/*        <input type={"number"} onInput={onInp} value={inputValue.day}/>*/}
            {/*        <button>Find</button>*/}
            {/*    </form>*/}
            {/*    {filterDate.length > 0 &&*/}
            {/*    <div>*/}
            {/*        {filterDate.map((value, id) => <div key={id}>{value.name} - {value.count} - {value.date}</div>)}*/}
            {/*    </div>*/}
            {/*    }*/}

            {/*</div>}*/}
        </div>
    );
}
