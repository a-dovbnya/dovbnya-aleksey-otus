import axios from "axios"

/**
 * Делаем 2 вида запросов:
 * 1. Данные в краткой форме - для вывода в списке городов. Есть возможность получить данные по городу и есть координаты
 * `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'3bc97c102881352d3bc81a3dc8a05e41'}&lang=ru&units=metric`
 *
 * 2. Данные в подробной форме - для вывода на странице города. Тут нужны координаты и нет возможности получить данные по городу
 * `https://api.openweathermap.org/data/2.5/onecall?lat=${39.5708}&lon=${52.6031}&appid=${'3bc97c102881352d3bc81a3dc8a05e41'}&lang=ru&units=metric`
 * 
 * Соответственно в LocalStorage должно быть 2 поля
 * 1. lessCitiesData - Массив городов в краткой форме
 *
 * 2. fullCitiesData - Массив городов в подробной форме
 * 
 * Общая схема работы для страницы городов:
 * - Получаем название города
 * - Ищем в LS и если есть - возвращаем данные
 * - Если нет - делаем запрос за текущими данными
 * -- Формируем объект определённого вида
 * -- Сохраняем его в LS
 * -- Возвращаем
 * 
 * Общая схема работы для страницы города
 * - Получаем данные как параметр url
 * - Ищем в LS и если есть - возвращаем данные
 * - Если нет - делаем запрос за краткими данными города, чтобы получить координаты и сохранить в истории для страницы со списком
 * -- Формируем объект определённого вида
 * -- Сохраняем его в LS краткого списка
 * -- Делаем запрос за полными данными
 * -- Формируем объект определённого вида
 * -- Добавляем в LS
 * -- Возвращаем объект
 * 
 * Если ошибка запроса и нет такого города - надо показать эту ошибку
 * На время запроса надо показывать лоадер
 * 
 * Общие точки входа:
 * getLessCityData
 * getFullCityData
 */
const DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

class ApiClient {
    API_URL = 'https://api.openweathermap.org/data/2.5/'
    API_KEY = '3bc97c102881352d3bc81a3dc8a05e41'
    LS_LESS_KEY = 'lessCitiesData'
    LS_FULL_KEY = 'fullCitiesData'

    constructor () {
        if (typeof ApiClient.instance === 'object') {
            return ApiClient.instance
        }
        
        ApiClient.instance = this
        return this
    }

    /**
     * @param {boolean} isFullData 
     * @returns {array}
     * @description Возвращает массив с данными городов из LS
     */
     getCitiesFromLS (isFullData) {
        const key = isFullData ? this.LS_FULL_KEY : this.LS_LESS_KEY
        const data = localStorage.getItem(key)

        return !data ? [] : JSON.parse(data)
    }
    
    /**
     * @param {string} cityName 
     * @param {boolean} isFullData 
     * @returns {object}
     * @description Возвращает данные для города из LS
     */
    getCityFromLS (cityName, isFullData) {
        const cities = this.getCitiesFromLS(isFullData)
        const city = cities.find(el => el.name.toLowerCase() === cityName?.toLowerCase())

        return  city ? city : null
    }

    /**
     * @param {string} cityName 
     * @param {boolean} isFullData 
     * @description Обновляет город в Local Storage
     * @returns {array} Возвращает актуальный список городов 
     */
    async updateCity (cityName, isFullData) {
        const cities = this.getCitiesFromLS(isFullData)
        let cityData;
        
        try {
            cityData = await this.fetchLessCity(cityName)
        } catch {
            return null
        }

        cities.forEach((item, index) => {
            if (item.name === cityName) {
                cities[index] = this.makeLessCity(cityData.data)
            }
        })

        this.saveCitiesToLS(cities, isFullData)

        return cities
    }

    async updateFullCity (cityName) {
        const cities = this.getCitiesFromLS(true)
        const lessCityData = await this.getLessCityData(cityName)
        let cityData;

        try {
            cityData = await this.fetchFullCity(lessCityData.coord.lat, lessCityData.coord.lon)
        } catch {
            return null
        }

        cities.forEach((item, index) => {
            if (item.name === cityName) {
                cities[index] = this.makeFullCity(cityData.data, lessCityData)
            }
        })

        this.saveCitiesToLS(cities, true)

        return cities
    }

    /**
     * @param {string} cityName 
     * @param {boolean} isFullData
     * @description Удаляет город из Local Storage
     * @returns {array} Возвращает актуальный список городов
     */
    deleteCityFromLS (cityName) {
        const lessCities = this.getCitiesFromLS().filter(city => city.name !== cityName)
        const fullCities = this.getCitiesFromLS(true).filter(city => city.name !== cityName)
        this.saveCitiesToLS(lessCities)
        this.saveCitiesToLS(fullCities, true)

        return lessCities
    }

    /**
     * @param {string} city
     * @returns {object}
     * @description Загружает краткие данные о городе
     */
    async fetchLessCity (cityName) {
        const data = await axios.get(`${this.API_URL}/weather?q=${cityName}&appid=${this.API_KEY}&lang=ru&units=metric`)
        return data
    }

    /**
     * @param {string} city
     * @returns {object}
     * @description Загружает полные данные о городе
     */
    async fetchFullCity (lat, lon) {
        const data = await axios.get(`${this.API_URL}/onecall?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&lang=ru&units=metric&&exclude=hourly,current,minutely,alerts`)
        return data
    }

    /**
     * @param {object} city 
     * @description Сохраняет данные о городе в Local Storage
     */
    saveCityToLS (city, isFullData) {
        let cities = this.getCitiesFromLS(isFullData)
        const key = isFullData ? this.LS_FULL_KEY : this.LS_LESS_KEY
    
        cities.push(city)
        localStorage.setItem(key, JSON.stringify(cities))
    }

    /**
     * @param {array} cities
     * @description Сохраняет города в Local Storage
     */
    saveCitiesToLS (cities, isFullData) {
        const key = isFullData ? this.LS_FULL_KEY : this.LS_LESS_KEY
        localStorage.setItem(key, JSON.stringify(cities))
    }

    /**
     * @param {object} data 
     * @returns {object}
     */
    makeLessCity (data) {
        const d = new Date()

        return {
            id: data.id,
            name: data.name,
            coord: data.coord,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            date: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
        }
    }

    /**
     * @param {object} data
     * @returns {object}
     */
    makeFullCity (data, lessData) {
        const d = new Date()
        const daily = data.daily.map(el => {
            const date = new Date(el.dt * 1000)
            return {
                temp: el.temp,
                description: el.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`,
                date: `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} (${DAYS[date.getDay()]})`,
                humidity: `${el.humidity}%`
            }
        })

        return {
            id: lessData.id,
            name: lessData.name,
            coord: lessData.coord,
            date: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`,
            daily: daily
        }
    }

    /**
     * @param {string} название города 
     * @returns {object}
     */
    async getLessCityData (city) {
        if (!city) {
            return
        }
        // Проверяем, сохранён ли город в Local Storage
        let cityData = this.getCityFromLS(city)

        if (cityData) {
            return cityData
        }

        // Загружаем данные для города
        try {
            cityData = await this.fetchLessCity(city)
        } catch {
            return null
        }

        const lessCity = this.makeLessCity(cityData.data)

        // Сохраняем данные в LS
        this.saveCityToLS(lessCity)

        return lessCity
    }

    /**
     * @param {string} название города 
     * @returns 
     */
    async getFullCityData (city) {
        if (!city) {
            return
        }
        // Проверяем, сохранён ли город в Local Storage
        let cityData = this.getCityFromLS(city, true)

        if (cityData) {
            return cityData
        }

        // Проверяем, есть ли город в списке кратких городов
        const lessCity = await this.getLessCityData(city)

        // Загружаем подробные данные для города
        try {
            cityData = await this.fetchFullCity(lessCity.coord.lat, lessCity.coord.lon)
        } catch {
            return null
        }

        const fullCity = this.makeFullCity(cityData.data, lessCity)
        this.saveCityToLS(fullCity, true)

        return fullCity
    }
}

const apiClient = new ApiClient()
export default apiClient