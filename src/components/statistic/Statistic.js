import React, {useState} from "react";

export default function Statistic() {
    const [monthFlag, setMonthFlag] = useState(false);
    const [dayFlag, setDayFlag] = useState(false);
    const [inputValue, setInputValue] = useState({year: '', month: ''});

    const onClickMonthReport = () => {
        setMonthFlag(true);
        setDayFlag(false);
    }
    const onClickDayReport = () => {
        setDayFlag(true);
        setMonthFlag(false);
    }

    // const onInputValue = (e) => {
    //     setInputValue(e.target.value);
    // }
    const onFormSubmit = (e) => {
        e.preventDefault();
    }
    const onFormInput = (e) => {
        setInputValue({
            year: e.target.form[0].value,
            month: e.target.form[1].value,
        })
        console.log(e.target.form[0].value)
        console.log(e.target.form[1].value)
        // console.log(e.target[1].value)
    }
    return (
        <div>
            <button onClick={onClickMonthReport}>Report for month</button>
            <button onClick={onClickDayReport}>Report for day</button>
            {monthFlag && <div>
                Report for month
                <form action="" onSubmit={onFormSubmit} onInput={onFormInput}>
                    <input type="number" value={inputValue.year}/>
                    <input type="number" value={inputValue.month}/>
                    <button>Find</button>
                </form>

            </div>}
            {dayFlag && <div>dayFlag</div>}
        </div>
    );
}
