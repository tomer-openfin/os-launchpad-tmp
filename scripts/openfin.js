require('dotenv').config();

const chalk = require('chalk');
const openfinLauncher = require('hadouken-js-adapter');
const path = require('path');

const { LOCAL_MANIFEST = false, HOST = '0.0.0.0', PORT = 8080 } = process.env;

const manifestUrl = `http://${HOST}:${PORT}/api/launcher.json`;

console.log(chalk.bgGreen.whiteBright(`---> Server created, starting OpenFin from manifest at ${manifestUrl}`));

openfinLauncher.launch({ manifestUrl }).catch(err => console.warn(err));
