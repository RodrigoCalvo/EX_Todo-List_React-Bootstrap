import { store } from '../redux/store';

describe('Given store', () => {
  describe('When importing it', () => {
    test('Then it should exist', () => {
      expect(store).toBeTruthy();
    });
  });
});
