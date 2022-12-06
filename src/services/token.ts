import axios from 'axios';

interface IToken {
  set(token: string): void;
  unset(): void;
}

export const token: IToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};
