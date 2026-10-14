import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

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

const ALL_COMMANDS = [FOCUS_USER_CHANNEL, SETUP];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
