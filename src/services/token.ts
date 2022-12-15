import axios from 'axios';

interface IToken {
  set(token: string): void;
  unset(): void;
}

export const token: IToken = {
  set(accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};
