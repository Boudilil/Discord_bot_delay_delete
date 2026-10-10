import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

const FOCUS_USER_CHANNEL = {
  name: 'focus',
  description: 'Choose someone and somewhere',
  options: [
    {
      type: 6,
      required: true,
      name: 'user',
      description: 'Pick your user',
    },
    {
      type: 7,
      required: true,
      name: 'channel',
      description: 'Pick your channel',
    },
  ],
  type: 1,
  integration_types: [0],
  contexts: [0],
};

const SETUP = {
  name: 'setup',
  description: 'Choose the role which can use the focus command',
  options: [
    {
      type: 8,
      required: true,
      name: 'role',
      description: 'Pick a role',
    },
  ],
  type: 1,
  integration_types: [0],
  contexts: [0,]
};

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND , FOCUS_USER_CHANNEL, SETUP];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
