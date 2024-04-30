import { render, fireEvent } from '@solidjs/testing-library'

import App from './App'

describe('<App />', () => {
  test('it will render an text input and a button', () => {
    const { getByTestId } = render(() => <App />)

    expect(getByTestId('toggle-button')).toBeInTheDocument()

    fireEvent.click(getByTestId('toggle-button'))

    expect(getByTestId('foo'))
  })
})
