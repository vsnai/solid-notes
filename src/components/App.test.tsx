import { render, fireEvent } from '@solidjs/testing-library'

import App from './App'

describe('<App />', () => {
  test('it will render an text input and a button', () => {
    const component = render(() => <App />)
    const button = component.getByTestId('toggle')

    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    expect(component.getByTestId('foo'))
  })
})
