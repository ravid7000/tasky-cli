import inquirer, { InputQuestion, PasswordQuestion } from 'inquirer';
import ora from 'ora';
import get from 'lodash/get';
import api from '../utils/api';
import { setData } from '../utils/storage';

const inputQuestion: InputQuestion<{}> = {
  type: 'input',
  name: 'email',
};

const inputPassword: PasswordQuestion<{}> = {
  type: 'password',
  name: 'password',
};

const QUESTIONS = [
  inputQuestion,
  inputPassword,
];

const LOGIN = async () => {
  const SPINNER = ora('Logging in...');
  try {
    const answers = await inquirer.prompt(QUESTIONS);
    SPINNER.start();
    const response = await api.login(answers);
    // tslint:disable-next-line: no-console
    console.log(response);
    await setData(response, true);
    SPINNER.succeed('Logged in successfully.');
  } catch (err) {
    if (err.response) {
      const { data } = err.response;
      SPINNER.fail(get(data, 'error'));
    }
  }
};

export default LOGIN;
