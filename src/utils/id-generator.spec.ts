import { generateId } from './id-generator';

describe('Given generateId function', () => {
  describe('When calling it', () => {
    test('Then it should return a non-empty string', () => {
      expect(generateId().length).not.toBe(0);
    });
  });
});
