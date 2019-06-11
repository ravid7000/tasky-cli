import chalk from 'chalk';

const logger = (msg: string, type: 'error' | 'success' | 'warning') => {
// tslint:disable-next-line: no-console
  console.log();
  if (type === 'error') {
    // tslint:disable-next-line: no-console
    console.log(chalk.red('    Error:'), chalk.red(msg));
  }
  if (type === 'success') {
    // tslint:disable-next-line: no-console
    console.log(chalk.green('    '), chalk.green(msg));
  }
  if (type === 'warning') {
    // tslint:disable-next-line: no-console
    console.log(chalk.yellow('    Warning:'), chalk.yellow(msg));
  }
// tslint:disable-next-line: no-console
  console.log();
};

export default logger;
