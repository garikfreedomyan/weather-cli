import chalk from 'chalk';
import { ApiService } from './api.service.js';

export const LogService = new (class {
  printError(error) {
    console.log(chalk.bgRed(' ERROR '), error);
  }

  printSuccess(message) {
    console.log(chalk.bgGreen(' SUCCESS '), message);
  }

  printHelp() {
    console.log(
      `
${chalk.bgCyan(' HELP ')}
Без параметров - Вывод погоды
-h             - Вывод помощи
-c [CITY]      - Установка города
-t [API_KEY]   - Созранение токена  
    `
    );
  }

  printWeather(response, icon) {
    console.log(
      `
${chalk.bgYellow(' WEATHER ')} in ${response.name}
${ApiService.getIcon(response.weather[0].icon)}  ${response.weather[0].description}
Tempreture: ${response.main.temp_min} - ${response.main.temp_max}
Feels like: ${response.main.feels_like}
Humidity: ${response.main.humidity}%
Wind speed: ${response.wind.speed}m\\s
`
    );
  }
})();
