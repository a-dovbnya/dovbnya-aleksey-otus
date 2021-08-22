import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import AddCity from '../components/AddCity';


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

test('Show error when props hasError = true', () => {
    const {getByTestId} = render(<AddCity hasError={true} />, {container: container});
    expect(getByTestId('addCityError')).toBeDefined();
});

test('Do not show error when props hasError = false', () => {
    render(<AddCity hasError={false} />, {container: container});
    expect(container.querySelector("[data-testid='addCityError']")).toBeNull()
});

test('Call reset function when input area gets focus', () => {
    const reset = jest.fn()

    render(<AddCity hasError={true} resetError={reset}/>, {container: container})
    container.querySelector("input[type=text]").focus()
    expect(reset).toBeCalled()
});

test('addCity function is called with parameter = input value when submit form', () => {
    const addCityCB = jest.fn()

    render(<AddCity addCity={addCityCB} />, {container: container})

    container.querySelector("input[type='text']").value = 'test'
    fireEvent.submit(container.querySelector("form"))

    expect(addCityCB).toBeCalledWith('test')
})
