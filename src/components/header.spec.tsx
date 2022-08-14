import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './header';

describe('Given the Header component', () => {
  describe('When calling it', () => {
    test('Then it should render', () => {
      render(
        <BrowserRouter>
          <Header></Header>
        </BrowserRouter>
      );

      expect(screen.getByText(/to-do/i)).toBeInTheDocument();
    });
  });
});
