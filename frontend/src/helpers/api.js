import axios from 'axios';

import rawText from '../helpers/info.txt';

export const html = {
  getContent: () => {
    return fetch(rawText)
      .then(res => res.text())
      .then(text => {
        return text
      })
  }
}
