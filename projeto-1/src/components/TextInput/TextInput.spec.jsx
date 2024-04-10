import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from '.';

describe('<TextInput />', () => {
   it('should have a value of searchValue', () => {
    const fn = jest.fn();
    const phText = 'Search for post';
    render(<TextInput searchValue={'testando'} handleChange={fn} />);

    expect(screen.getByPlaceholderText(phText))
        .toBeInTheDocument();
    expect(screen.getByPlaceholderText(phText).value)
        .toBe('testando');
   });

   it('should call handleChange for each key pressed', () => {
    const fn = jest.fn();
    const value = 'testando';
    render(<TextInput handleChange={fn} />);
    
    const input = screen.getByPlaceholderText('Search for post');
    
    expect(input.value).toBe('');
    
    userEvent.type(input, value);

    expect(fn).toHaveBeenCalledTimes(value.length);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(value);

    userEvent.clear(input);

    expect(input.value).toBe('');
   });
});