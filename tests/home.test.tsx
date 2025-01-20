import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';
import Home from '~/routes/home';

describe('Index Route', () => {
  test('it should render', async () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: Home,
      },
    ]);

    render(<RoutesStub initialEntries={['/']} />);

    expect(await screen.findByText('React Router Docs')).toBeVisible();
  });
});
