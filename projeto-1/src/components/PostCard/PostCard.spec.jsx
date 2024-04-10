import { render, screen } from "@testing-library/react";
import PostCard from ".";
import { postCardMockProps } from "./mock";

const props = postCardMockProps;

describe("<PostCard />", () => {
    it('should render PostCard', () => {

        render(<PostCard post={props} />);

        expect(screen.getByRole('img', { name: 'Título 1' }))
            .toHaveAttribute('src', 'img/img.jpg');
        expect(screen.getByRole('img', { name: 'Título 1' }))
            .toHaveAttribute('alt', 'Título 1');
        expect(screen.getByRole('heading', { name: 'Título 1' }))
            .toBeInTheDocument();
        expect(screen.getByText('Lorem1'))
            .toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const { container } = render(<PostCard post={props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});