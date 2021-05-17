import React from "react";
import {Link, Route, Switch} from 'react-router-dom';
import List from "./components/list/List";
import Home from "./components/home/Home";
import Editing from "./components/editing/Editing";
import Statistic from "./components/statistic/Statistic";
import './App.css';

export default function App() {






    return (
        <div className={'page'}>
            <div className={'main'}>
                <div className={'header'}>
                    <Link to={'/'}>Home</Link>
                    <div>
                        <Link to={'/list'}>List </Link>
                        <Link to={'/editing'}> Editing </Link>
                        <Link to={'/statistic'}> Statistic</Link>
                    </div>

                </div>
                <div className={'body'}>
                    <Switch>
                        <Route path={'/list'} render={() => <List/>}/>
                        <Route path={'/editing'} render={() => <Editing/>}/>
                        <Route path={'/statistic'} render={() => <Statistic/>}/>
                        <Route path={'/'} render={() => <Home/>}/>
                    </Switch>
                </div>
                <div className={'footer'}>
                    <div className={'footer-title'}>Snack vending machine</div>
                    <div>2021</div>
                </div>

            </div>

        </div>


    );
}
