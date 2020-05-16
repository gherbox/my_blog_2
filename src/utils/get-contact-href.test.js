// @flow strict
import getContactHref from './get-contact-href';

test('getContactHref', () => {
  expect(getContactHref('github', '#')).toBe('');
  expect(getContactHref('email', '#')).toBe('');
  expect(getContactHref('linkedin', '#')).toBe('');
  expect(getContactHref('instagram', '#')).toBe('');
});
