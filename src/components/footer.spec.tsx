import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Given the Footer component', () => {
  describe('When calling it', () => {
    test('Then it should render', () => {
      render(<Footer></Footer>);

      expect(screen.getByText(/rodrigo/i)).toBeInTheDocument();
    });
  });
});
