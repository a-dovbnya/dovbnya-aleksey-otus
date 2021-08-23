import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  TextField,
  Grid,
  Link,
  IconButton
} from '@material-ui/core';
import { Delete, Cached } from '@material-ui/icons'

export default class CitiesList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {filter: ''}
    }

    onChange = (e) => {
        this.setState({filter: e.target.value.toLowerCase()})
    }

    render () {
        return (
            <div className="inner-container">
                <h2>История поиска</h2>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <TextField
                            label="Фильтр"
                            fullWidth
                            onChange={this.onChange}
                        />
                    </Grid>
                </Grid>

                <List className="city-list">
                    {
                        this.props.cities.map(city => (
                            (!this.state.filter || city.name.toLowerCase().includes(this.state.filter)) &&
                            <ListItem key={city.id} data-testid={city.id}>
                                <ListItemIcon>
                                    <img src={city.icon} alt={city.name} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                      <React.Fragment>
                                        <Link component={RouterLink} to={`/city/${city.name.toLowerCase()}`}>{city.name}</Link>
                                      </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <span>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                >
                                                    {city.description}
                                                </Typography>
                                                <span className="temp">{city.temp > 0 ? '+' : '-' }{city.temp}&nbsp;&deg;C</span>
                                            </span><br/>
                                            <span className="city-panel-wrap">
                                                Данные для: {city.date}
                                                <span className="city-panel">
                                                    <IconButton
                                                        title="Обновить данные для текущей даты"
                                                        name="update-btn"
                                                        onClick={() => this.props.updateCityData(city.name)}
                                                    >
                                                        <Cached />
                                                    </IconButton>
                                                    <IconButton
                                                        title="Удалить"
                                                        name="delete"
                                                        onClick={() => this.props.deleteCityData(city.name)}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </span>
                                            </span>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        )
    }
}