import React from 'react'
import {Paper} from '@material-ui/core/';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
  
import CitiesPage from '../pages/CitiesPage';
import CityPage from '../pages/CityPage';
import NoMatch from '../pages/NoMatch';

export default class App extends React.Component {
    render () {
        return (
            <Paper variant="outlined" square className="app">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <CitiesPage />
                        </Route>
                        <Route path="/city/:city">
                            <CityPage />
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </Router>
            </Paper>
        )
    }
}