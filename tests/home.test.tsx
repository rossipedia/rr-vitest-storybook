import { createRoutesStub, useLoaderData, useMatches } from 'react-router';
import { render, screen } from '@testing-library/react';
import Home, { loader } from '~/routes/home';

describe('Index Route', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('loader', async () => {
    // mock fetch
    // @ts-expect-error
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: vi.fn(() =>
          Promise.resolve({
            id: 1,
            quote: 'Hello, World!',
            author: 'Ken Thompson',
          })
        ),
      })
    );

    const data = await loader();

    expect(data).toEqual({
      quote: {
        id: 1,
        quote: 'Hello, World!',
        author: 'Ken Thompson',
      },
    });
  });

  test('it should render', async () => {
    const RoutesStub = createRoutesStub([
      {
        id: 'home',
        path: '/',
        Component: Home,
      },
    ]);

    render(
      <RoutesStub
        initialEntries={['/']}
        hydrationData={{
          loaderData: {
            home: {
              quote: {
                id: 1,
                quote: 'Hello, World!',
                author: 'Ken Thompson',
              },
            },
          },
        }}
      />
    );

    expect(await screen.findByText('React Router Docs')).toBeVisible();
  });
});
