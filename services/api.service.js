import axios from 'axios';
import { LogService } from './log.service.js';
import { StorageService } from './storage.service.js';

export const ApiService = new (class {
  async getWeather() {
    const token = process.env.TOKEN ?? (await StorageService.getKeyValue('token'));
    if (!token) {
      throw new Error('Token not defined, use command "-t [token]" to set token');
    }

    const city = process.env.city ?? (await StorageService.getKeyValue('city'));
    if (!city) {
      throw new Error('City not defined, use command "-c [city]" to set token');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: token,
        // lang: 'ru',
        units: 'metric',
      },
    });

    return data;
  }

  getIcon(icon) {
    switch (icon.slice(0, -1)) {
      case '01':
        return '☀️';
      case '02':
        return '🌤️';
      case '03':
        return '☁️';
      case '04':
        return '☁️';
      case '09':
        return '🌧️';
      case '10':
        return '🌦️';
      case '11':
        return '🌩️';
      case '13':
        return '❄️';
      case '50':
        return '🌫️';
    }
  }
})();
