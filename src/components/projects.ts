// import inquirer from 'inquirer';
import get from 'lodash/get';
import ora from 'ora';
import chalk from 'chalk';
import { getData, setData } from '../utils/storage';
import logger from '../utils/logger';
import api, { setAuthHeaders } from '../utils/api';
import { isAuthenticated, toKey } from '../utils/common';
import { CURRENT_PROJECT, CURRENT_USER, PROJECTS, AUTH_TOKEN } from '../constants/common';

const logProjectList = (list: { id: number, name: string }[]) => {
  // tslint:disable-next-line: no-console
  console.log();
  // tslint:disable-next-line: no-console
  console.log(chalk.green('No. [id] Project Name'));
  // tslint:disable-next-line: no-console
  console.log('------------------------');
  list.forEach((part, idx) => {
    // tslint:disable-next-line: no-console
    console.log(`${idx + 1}. [${part.id}]   ${part.name}`);
  });
  // tslint:disable-next-line: no-console
  console.log();
};

const getProjectList = async () => {
  const data = await getData();
  const token = get(data, toKey('d', CURRENT_USER, AUTH_TOKEN));
  const projects = get(data, toKey('d', PROJECTS));

  if (!isAuthenticated(data)) {
    return logger('You must login first.', 'warning');
  }

  if (projects) {
    return logProjectList(projects);
  }

  setAuthHeaders(token);
  const spinner = ora('Loading projects...');
  try {
    spinner.start();
    const response = await api.getProjects();
    spinner.stop();
    logProjectList(response.data);
    await setData({ [PROJECTS]: response.data });
  } catch (err) {
    spinner.fail(get(err, 'message'));
  } finally {
    return true;
  }
};

const selectProject = async (id: number) => {
  const data = await getData();

  if (!isAuthenticated(data)) {
    return logger('You must login first.', 'warning');
  }

  const projects = get(data, toKey('d', PROJECTS));
  const project = projects.filter((part: { id: number }) => part.id === id);
  if (project.length) {
  }
};

const PROJECT_ = async (cmd: { list: boolean, select: number }) => {
  if (cmd.list) {
    return await getProjectList();
  }

  if (cmd.select) {
    return await selectProject(cmd.select);
  }
};

export default PROJECT_;
