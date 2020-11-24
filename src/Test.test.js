import { inputValidation, spawnReset } from './Helpers/GeneralHelper';

it('Checks if given string is to short', () => {
  expect(inputValidation('Li', [{ user: 'Lilith' }])).toBe('The name is too short');
});

it('Checks if given string is to long', () => {
  expect(inputValidation('Lilith Niniane', [{ user: 'Lilith' }])).toBe('The name is too long');
});

it('Checks if given string already exists', () => {
  expect(inputValidation('Lilith', [{ user: 'Lilith' }])).toBe('This name is taken');
});

it('Checks if given string is correct', () => {
  expect(inputValidation('Lilith', [{ user: 'Lucifer' }])).toBe('Your score will be submited shortly, you can return now');
});


it('Returns a random number', () => {
  expect(spawnReset()).not.toBeNaN();
});