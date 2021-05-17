import React from "react";
import styles from './Home.module.css'

export default function Home() {
    return (
        <div className={styles.instruction}>
            <div>Snack vending machine</div>
           <span>You are welcomed by snack vending machine.</span>
           <span>In order to add a category press <b>"Editing"</b></span>
           <span>After that, in the <b>"List"</b> section, a list of categories will appear.</span>
           <span>To view shopping statistics go to <b>"Statistic"</b></span>
        </div>
    );
}
