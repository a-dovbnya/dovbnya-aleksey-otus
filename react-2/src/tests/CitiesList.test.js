import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import CitiesList from '../components/CitiesList';


let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const mockData = [
    {
        id: 1,
        name: "Самара",
        coord: {
            lon: 50.15,
            lat: 53.2
        },
        temp: 25.05,
        description: "пасмурно",
        icon: "url.png",
        date: "21.8.2021 23:59"
    },
    {
        id: 2,
        name: "Москва",
        coord: {
            lon: 50.15,
            lat: 53.2
        },
        temp: 27,
        description: "ясно",
        icon: "url.png",
        date: "21.8.2021 23:59"
    }
]

test('Test filter', () => {
    render(<BrowserRouter><CitiesList cities={mockData} /></BrowserRouter>, {container: container})

    expect(screen.queryByText('Самара')).not.toBeNull()
    expect(screen.queryByText('Москва')).not.toBeNull()
    
    const area = container.querySelector("input[type='text']")

    fireEvent.change(area, {target: {value: 'Москва'}})

    expect(screen.queryByText('Самара')).toBeNull()
    expect(screen.queryByText('Москва')).not.toBeNull()
})

test('Call prop updateCityData when click update button', () => {
    const updateCallback = jest.fn()

    render(<BrowserRouter><CitiesList cities={[mockData[0]]} updateCityData={updateCallback} /></BrowserRouter>, {container: container})

    const updateButton = container.querySelector("[name='update-btn']")

    fireEvent.click(updateButton)

    expect(updateCallback).toBeCalledWith(mockData[0].name)

})

test('Call prop deleteCityData when click delete button', () => {
    const deleteCallback = jest.fn()

    render(<BrowserRouter><CitiesList cities={[mockData[0]]} deleteCityData={deleteCallback} /></BrowserRouter>, {container: container})

    const deleteButton = container.querySelector("[name='delete']")

    fireEvent.click(deleteButton)

    expect(deleteCallback).toBeCalledWith(mockData[0].name)
})