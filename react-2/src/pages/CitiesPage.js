import React from 'react'
import Alert from '@material-ui/lab/Alert'
import AddCity from '../components/AddCity'
import CitiesList from '../components/CitiesList'
import apiClient from '../api/index'

export default class CitiesPage extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            cities: apiClient.getCitiesFromLS(),
            fetchError: false
        }
    }

    addCity = async (cityName) => {
        const city = await apiClient.getLessCityData(cityName)

        if (city) {
            this.setState({cities: apiClient.getCitiesFromLS()})
        } else {
            this.setState({fetchError: true})
        }
    }

    updateCityData = async (cityName) => {
        const newCities = await apiClient.updateCity(cityName)
        this.setState({cities: newCities})
    }

    deleteCityData = (cityName) => {
        this.setState({
            cities: apiClient.deleteCityFromLS(cityName)
        })
    }

    resetError = () => {
        this.setState({
            fetchError: false
        })
    }

    render () {
        return (
            <div>
                {/* Форма добавления города */}
                <AddCity
                    addCity={this.addCity}
                    hasError={this.state.fetchError}
                    resetError={this.resetError}
                />

                {/* Список городов с фильтром */}
                {
                    this.state.cities.length ?
                    <CitiesList
                        cities={this.state.cities}
                        updateCityData={this.updateCityData}
                        deleteCityData={this.deleteCityData}
                        hasError={this.state.fetchError}
                    /> :
                    <div className="inner-container">
                        <Alert severity="warning">Нет сохранённых городов</Alert>
                    </div>
                }
            </div>
        )
    }
}