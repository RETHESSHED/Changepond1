import { render, screen } from '@testing-library/react';
import App from './App';
import sum from './sum'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


test("testing for sum function", ()=>{
  //expect(sum(10,20),toBe(0))
  render(<sum />);
  expect (sum(10,20)).toBe(30);
})