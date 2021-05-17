import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {todayDate} from "../../logic/TodayDate";
import styles from './Statistic.module.css'

export default function Statistic() {
    const [monthFlag, setMonthFlag] = useState(false); // buttons logic
    const [dayFlag, setDayFlag] = useState(false);     // buttons logic
    const [filterDate, setFilterDate] = useState([])
    const [filterDayDate, setFilterDayDate] = useState([])

    const [inputValue, setInputValue] = useState({year: todayDate.slice(0, 4), month: todayDate.slice(6, 7)}); //react from
    const [inputDayValue, setInputDayValue] = useState({
        year: todayDate.slice(0, 4),
        month: todayDate.slice(6, 7),
        day: todayDate.slice(8, 10)
    }); //react from

    const monthReportForm = useRef(null);
    const dayReportForm = useRef(null);
    const statisticList = useSelector(({categoryList}) => categoryList.statisticList);
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

        const chosenData = `${e.target[0].value}-${e.target[1].value.length === 1 ? '0' + e.target[1].value : e.target[1].value}`;
        const filter = statisticList.filter(date => date.date.slice(0, 7) === chosenData)
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
        const chosenData = `${e.target[0].value}-${e.target[1].value.length === 1 ? '0' + e.target[1].value : e.target[1].value}-${e.target[2].value}`;

        let filter = statisticList.filter(item => {
            let date = new Date(item.date);
            return date >= (new Date(chosenData)) && date <= (new Date(todayDate));
        })
            .sort((a, b) => a.name > b.name ? 1 : -1);

        setFilterDayDate(filter);
    }

    return (
        <div className={styles.statistic}>
            <div className={styles.mainBtn}>
                <button onClick={onClickMonthReport}>Report for month</button>
                <button onClick={onClickDayReport}>Report for day</button>
            </div>


            {monthFlag &&
            <div className={styles.report}>
               <span>Report for month</span>

                <form action="" onSubmit={onFormSubmit} ref={monthReportForm}>
                    <span className={styles.categoryParameters}>Year</span>
                    <input className={styles.input} type={"number"} onInput={onInp} value={inputValue.year}
                           max={todayDate.slice(0, 4)}/>
                    <span className={styles.categoryParameters}>Month</span>
                    <input className={styles.input} type={"number"} onInput={onInp} value={inputValue.month}
                           max={todayDate.slice(6, 7)}/>
                    <button className={styles.buttons}>Find</button>
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

            {dayFlag && <div className={styles.report}>
                <span>Report for day</span>
                <form action="" onSubmit={onFormSubmitDayReport} ref={dayReportForm}>
                    <span className={styles.categoryParameters}>Year</span>
                    <input className={styles.input} type={"number"} onInput={onInputDayReport}
                           value={inputDayValue.year}
                           max={todayDate.slice(0, 4)}/>
                    <span className={styles.categoryParameters}>Month</span>
                    <input className={styles.input} type={"number"} onInput={onInputDayReport}
                           value={inputDayValue.month}
                           max={todayDate.slice(6, 7)}/>
                    <span className={styles.categoryParameters}>Day</span>
                    <input className={styles.input} type={"number"} onInput={onInputDayReport} value={inputDayValue.day}
                           max={todayDate.slice(8, 10)}/>
                    <button className={styles.buttons}>Find</button>
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
