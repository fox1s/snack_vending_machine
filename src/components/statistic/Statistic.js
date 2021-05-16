import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {todayDate} from "../../logic/TodayDate";

export default function Statistic() {
    const [monthFlag, setMonthFlag] = useState(false); // buttons logic
    const [dayFlag, setDayFlag] = useState(false);     // buttons logic
    const [filterDate, setFilterDate] = useState([])
    const [filterDayDate, setFilterDayDate] = useState([])

    const [inputValue, setInputValue] = useState({year: '2021', month: '5'}); //react from
    const [inputDayValue, setInputDayValue] = useState({year: '2021', month: '5', day: '16'}); //react from
    const monthReportForm = useRef(null);
    const dayReportForm = useRef(null);
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
            .sort((a, b) => a.name > b.name ? 1 : -1);
        setFilterDate(filter);
    }

    const onInp = () => {
        setInputValue({
            year: monthReportForm.current[0].value,
            month: monthReportForm.current[1].value,
        })
    }


    const onInputDayReport = () => {
        setInputDayValue({
            year: dayReportForm.current[0].value,
            month: dayReportForm.current[1].value,
            day: dayReportForm.current[2].value
        })
    }

    const onFormSubmitDayReport = (e) => {
        e.preventDefault();
        let dateArr = [];
        categoryList.forEach(category => {
            if (category.purchase.length > 0) {
                category.purchase.forEach(date => {
                    dateArr.push({...date, name: category.name, price: +category.price})
                })
            }
        })
        // введена дата
        const chosenData = `${e.target[0].value}-${e.target[1].value.length === 1 ? '0' + e.target[1].value : e.target[1].value}-${e.target[2].value}`;

        let filter = dateArr.filter(item => {
            let date = new Date(item.date);
            return date >= (new Date(chosenData)) && date <= (new Date(todayDate));
        })
            .sort((a, b) => a.name > b.name ? 1 : -1);

        setFilterDayDate(filter);
    }

    return (
        <div>
            <button onClick={onClickMonthReport}>Report for month</button>
            <button onClick={onClickDayReport}>Report for day</button>

            {monthFlag &&
            <div>
                Report for month

                <form action="" onSubmit={onFormSubmit} ref={monthReportForm}>
                    <input type={"number"} onInput={onInp} value={inputValue.year} max={todayDate.slice(0, 4)}/>
                    <input type={"number"} onInput={onInp} value={inputValue.month} max={todayDate.slice(6, 7)}/>
                    <button>Find</button>
                </form>
                {filterDate.length > 0 &&
                <div>
                    <div>Total: {filterDate.reduce((acc, value) => {
                        return acc + (value.price * value.count)
                    }, 0)}$
                    </div>


                    <div>
                        {filterDate.map((value, id) => <div
                            key={id}>{value.name} - {value.count} - {value.price}$</div>)}

                    </div>
                </div>

                }

            </div>}

            {dayFlag && <div>
                Report for day
                <form action="" onSubmit={onFormSubmitDayReport} ref={dayReportForm}>
                    <input type={"number"} onInput={onInputDayReport} value={inputDayValue.year}
                           max={todayDate.slice(0, 4)}/>
                    <input type={"number"} onInput={onInputDayReport} value={inputDayValue.month}
                           max={todayDate.slice(6, 7)}/>
                    <input type={"number"} onInput={onInputDayReport} value={inputDayValue.day}
                           max={todayDate.slice(8, 10)}/>
                    <button>Find</button>
                </form>
                {filterDayDate.length > 0 &&
                <div>
                    <div>Total: {filterDayDate.reduce((acc, value) => {
                        return acc + (value.price * value.count)
                    }, 0)}$
                    </div>
                    <div>
                        {filterDayDate.map((value, id) => <div
                            key={id}>{value.name} - {value.count} - {value.price}$</div>)}
                    </div>
                </div>

                }

            </div>}
        </div>
    );
}
