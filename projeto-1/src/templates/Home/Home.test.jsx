import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Home from '.';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts',
    async (req, res, ctx) =>
      res(ctx.json([
        {
          "userId": 1,
          "id": 1,
          "title": "title1",
          "body": "lorem1"
        },
        {
          "userId": 2,
          "id": 2,
          "title": "title2",
          "body": "lorem2"
        },
        {
          "userId": 3,
          "id": 3,
          "title": "title3",
          "body": "lorem3"
        }
      ])
  )),
  rest.get('https://jsonplaceholder.typicode.com/photos',
    async (req, res, ctx) =>
      res(ctx.json([
        {
          "albumId": 1,
          "id": 1,
          "title": "photo1",
          "url": "https://via.placeholder.com/600/92c952",
          "thumbnailUrl": "https://via.placeholder.com/150/92c952"
        },
        {
          "albumId": 1,
          "id": 2,
          "title": "photo2",
          "url": "https://via.placeholder.com/600/771796",
          "thumbnailUrl": "https://via.placeholder.com/150/771796"
        },
        {
          "albumId": 1,
          "id": 3,
          "title": "photo3",
          "url": "https://via.placeholder.com/600/24f355",
          "thumbnailUrl": "https://via.placeholder.com/150/24f355"
        },
      ])
  ))
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });


  it('should render Loading Posts', () => {
    render(<Home />);

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('should render TextInput, Posts and Button', async () => {

    const { debug } = render(<Home />);
    const loadingPosts = screen.getByText(/carregando/i);
    await waitForElementToBeRemoved(loadingPosts);

    // debug();
    // const noMorePosts = screen.getByText(/resultados para essa busca/i);
  });

});
