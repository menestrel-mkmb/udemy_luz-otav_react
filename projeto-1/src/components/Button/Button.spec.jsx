import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '.';

describe('<Button /> See more posts', () => {
    it('should render the button with the text "Load more posts"', () => {
        expect.assertions(1);
        render(<Button text='Load more posts' />);

        const button = screen.getByRole('button', { name: /load more posts/i });

        expect(button).toBeInTheDocument();
    });

    it('should call fn on button click', () => {
        const fn = jest.fn();
        expect.assertions(1);
        render(<Button text='Load more posts' onClick={fn} />);

        const button = screen.getByRole('button', { name: /load more posts/i });
        userEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', () => {
        expect.assertions(1);
        render(<Button text='Load more posts' disabled={true} />);

        const button = screen.getByRole('button', { name: /load more posts/i });

        expect(button).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        expect.assertions(1);
        render(<Button text='Load more posts' disabled={false} />);

        const button = screen.getByRole('button', { name: /load more posts/i });

        expect(button).not.toBeDisabled();
    });

    it('should match snapshot', () => {
        const fn = jest.fn();
        const { container } = render(<Button
                                        text='Load more posts'
                                        onClick={fn}
                                        disabled={false}
                                    />);
        expect(container.firstChild).toMatchSnapshot();
    });
});