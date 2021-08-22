import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import apiClient from '../api/index'

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Link,
    Button
  } from '@material-ui/core';
  import Alert from '@material-ui/lab/Alert'
  

class CityPage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            city: null,
            fetchError: false
        }
    }

    async componentDidMount () {
        const city = await apiClient.getFullCityData(this.props.match.params.city)
        if (city) {
            this.setState({city: city})
        } else {
            this.setState({fetchError: true})
        }
    }

    updateCityData = async () => {
        const updatedCity = await apiClient.updateFullCity(this.state.city.name)
        const city = updatedCity.find(el => el.name = this.state.city.name)

        if (city) {
            this.setState({city: city})
        } else {
            this.setState({fetchError: true})
        }
    }

    render () {
        const city = this.props.match.params.city

        return (
            <div className="inner-container">
                <p><Link to="/" component={RouterLink}>На главную</Link></p>
                { !this.state.fetchError && this.state.city && 
                    <div>
                        <h1>{city.toUpperCase()}</h1>
                        <p>Данные за: {this.state.city?.date}</p>
                        <p>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={this.updateCityData}
                            >Обновить</Button>
                        </p>
                    </div>
                }

                <List className="city-list">
                    {
                        this.state.city && this.state.city.daily.map((day, i) => (
                            <ListItem key={i}>
                                <ListItemIcon>
                                    <img src={day.icon} alt={city} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                      <React.Fragment>
                                        { day.date }
                                      </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            { day.description } | {day.temp.day > 0 ? '+' : '-' }{day.temp.day}&nbsp;&deg;C<br/>
                                            В течении дня:
                                                {day.temp.min > 0 ? '+' : '-' }{day.temp.min}&nbsp;&deg;C
                                                    &nbsp;&mdash;&nbsp;
                                                {day.temp.max > 0 ? '+' : '-' }{day.temp.max}&nbsp;&deg;C<br/>
                                            Влажность: {day.humidity}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))
                    }
                </List>

                { this.state.fetchError &&
                    <div className="error-box">
                        <Alert severity="error">Нет такого города или произошла ошибка при выполнении запроса</Alert>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(CityPage)