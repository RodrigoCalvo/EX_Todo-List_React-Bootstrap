import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layout';

describe('Given the Layout component', () => {
  describe('When calling it', () => {
    test('Then it should render and render its children', () => {
      const MockComponent = function () {
        return <p>test</p>;
      };
      render(
        <BrowserRouter>
          <Layout>
            <MockComponent />
          </Layout>
        </BrowserRouter>
      );

      expect(screen.getByText(/to-do/i)).toBeInTheDocument();
      expect(screen.getByText(/test/i)).toBeInTheDocument();
    });
  });
});
