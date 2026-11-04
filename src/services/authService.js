import { http } from './api';

export const authService = {
  async login({ email, password }) {
    return await http('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async signup({ name, email, password }) {
    return await http('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
};