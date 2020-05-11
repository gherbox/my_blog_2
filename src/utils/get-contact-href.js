// @flow strict
const getContactHref = (name: string, contact: string) => {
  let href;

  switch (name) {
    case 'github':
      href = `https://github.com/gherbox`;
      break;
    case 'email':
      href = `mailto:${contact}`;
      break;
    case 'linkedin':
      href = `https://www.linkedin.com/in/amine-gherbi/`;
      break;
    default:
      href = contact;
      break;
  }

  return href;
};

export default getContactHref;
