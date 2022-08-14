import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './menu';

describe('Given the Menu component', () => {
  describe('When calling it', () => {
    test('Then it should render and render its children', () => {
      render(
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      );

      expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
  });
});
