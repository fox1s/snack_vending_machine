import React from "react";
import './Alert.css';

export default function Alert({text, class_name}) {
    console.log(text, class_name)
    return (
        <div className={class_name}>
            {text}
        </div>
    );
}
//