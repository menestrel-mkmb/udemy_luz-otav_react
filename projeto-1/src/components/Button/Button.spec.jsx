import { render, screen } from '@testing-library/react';

import Button from '.';

describe('<Button /> See more posts', () => {
    it('should render the button with the text "Load more posts"', () => {
        expect.assertions(1);
        render(<Button text='Load more posts' />);
        const button = screen.getByRole('button', { name: /load more posts/i });
        expect(button).toBeInTheDocument();
    });
});