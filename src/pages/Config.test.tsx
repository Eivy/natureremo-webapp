import * as React from 'react'
import { render } from '@testing-library/react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Config from './Config';

Enzyme.configure({ adapter: new Adapter() })

beforeEach(() => {
  localStorage.clear()
})

test('renders config', () => {
  const { getByText } = render(<Config />)
  expect(getByText(/access token/i)).toBeInTheDocument()
});

test('default input value', () => {
  localStorage.setItem('access_token', 'test')
  const config = Enzyme.shallow(<Config />)
  expect(config.find('input').get(0).props.value).toEqual('test')
});

test('save token to localStorage', () => {
  const inputValue = 'saved to localStorage'
  const config = Enzyme.shallow(<Config />)
  const input = config.find('input').at(0)
  const button = config.find('button').at(0)
  input.simulate('change', { target: { value: inputValue } })
  button.simulate('click')
  expect(localStorage.getItem('access_token')).toBe(inputValue)
})

test('remove token to localStorage', () => {
  const inputValue = 'saved to localStorage';
  localStorage.setItem('access_token', inputValue);
  const config = Enzyme.shallow(<Config />);
  const input = config.find('input').at(0);
  const button = config.find('button').at(0);
  input.simulate('change', { target: { value: '' } })
  button.simulate('click')
  expect(localStorage.getItem('access_token')).toBe(null)
})
