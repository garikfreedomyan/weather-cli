import fs from 'fs';
import path from 'path';
import { homedir } from 'os';
import { LogService } from './log.service.js';

export const StorageService = new (class {
  _settingsFile = path.join(homedir(), 'gweather-settings.json');

  get settingsFile() {
    return this._settingsFile;
  }

  async _saveKeyValue(key, value) {
    let data = {};
    if (await this.isSettingsFileExist()) {
      const file = await fs.promises.readFile(this.settingsFile);
      data = JSON.parse(file);
    }
    data[key] = value;

    await fs.promises.writeFile(this.settingsFile, JSON.stringify(data, undefined, 2));
    console.log(this.settingsFile);
  }

  async getKeyValue(key) {
    if (await this.isSettingsFileExist()) {
      const file = await fs.promises.readFile(this.settingsFile);
      const data = JSON.parse(file);
      return data[key];
    }
    return undefined;
  }

  async saveToken(token) {
    if (!token.length) {
      LogService.printError('Token must be specified');
      return;
    }

    try {
      await this._saveKeyValue('token', token);
      LogService.printSuccess('Token saved');
    } catch (error) {
      LogService.printError(error.message);
    }
  }

  async saveCity(city) {
    if (!city.length) {
      LogService.printError('City must be specified');
      return;
    }

    try {
      await this._saveKeyValue('city', city);
      LogService.printSuccess('City saved');
    } catch (error) {
      LogService.printError(error.message);
    }
  }

  async isSettingsFileExist() {
    try {
      await fs.promises.stat(this.settingsFile);
      return true;
    } catch (error) {
      return false;
    }
  }
})();
