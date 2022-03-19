#!/usr/bin/env node

import { getArgs } from './helpers/index.js';
import { ApiService, LogService, StorageService } from './services/index.js';

async function getForcast() {
  try {
    const weather = await ApiService.getWeather('moscow');
    LogService.printWeather(weather);
  } catch (error) {
    if (error?.response?.status === 404) {
      LogService.printError('Incorrect city');
    } else if (error?.response?.status === 401) {
      LogService.printError('Incorrect token');
    } else {
      LogService.printError(error.message);
    }
  }
}

function initCLI() {
  const args = getArgs(process.argv);

  if (args.h) {
    return LogService.printHelp();
  }

  if (args.c) {
    return StorageService.saveCity(args.c);
  }

  if (args.t) {
    return StorageService.saveToken(args.t);
  }

  return getForcast();
}

initCLI();
