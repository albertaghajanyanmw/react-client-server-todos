import { en } from 'messages/en.messages';

const messages = {};

messages.get = (path) => {
  const current = en;
  const pathParts = path.split('.');
  let message;

  try {
    message = pathParts.reduce((obj, pathPart) => obj[pathPart], current);
  } finally {
    if (message === undefined) {
      throw new ReferenceError(`Could not find message: ${path}`);
    }
  }

  return message;
};

export default messages;
