import * as yargs from 'https://deno.land/x/yargs/deno.ts'

const args = yargs.argv;

export type NodeConfig = {
  ip: string;
  port: number;
}

// Default configuration
const config : NodeConfig = {
  ip: '127.0.0.1',
  port: 8080,
};

/*
    Configuration can be overriden when calling distribution.js
    with the --config flag
*/
if (args.config) {
  let newConfig = JSON.parse(args.config);
  config.ip = newConfig.ip;
  config.port = parseInt(newConfig.port);
}

export default config;
