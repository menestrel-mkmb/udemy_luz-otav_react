import { render, screen } from '@testing-library/react';
import Posts from '.';
import { postsMockProps } from './mock';

const props = postsMockProps;

describe('<Posts />', () => {
    it('should render Posts', () => {
        render(<Posts posts={props} />);

        expect(screen.getAllByRole('heading', { name: /título/i }))
            .toHaveLength(postsMockProps.length);
        expect(screen.getAllByRole('img', { name: /título/i }))
            .toHaveLength(postsMockProps.length);
        expect(screen.getAllByText( /Lorem/i ))
            .toHaveLength(postsMockProps.length);
        expect(screen.getByRole('img', { name: /título 3/i }))
            .toHaveAttribute('src', 'img/img3.jpg');
    });

    it('should render no posts', () => {
        render(<Posts posts={[]} />);
        expect(screen.queryByRole('heading', { name: /título/i }))
            .not.toBeInTheDocument();
    })

    it('should match snapshot', () => {
        const { container } = render(<Posts posts={props} />);
        expect(container.firstChild).toMatchSnapshot();
    })
});