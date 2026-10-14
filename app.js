import 'dotenv/config';

import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

let roleId = null;
let user_focused = null;
let channel_focused = null;

let ibai_user = null;
let ibai_channel = null;
let ibai_min_length = null;

const IBAI_GIF = 'https://media1.tenor.com/m/2iOyUt_SHFgAAAAd/ibai-meme-ibai.gif';
const IBAI_DEFAULT_MIN_LENGTH = 50;

const DELETE_DELAY = 1 * 60 * 1000;

function replyEphemeral(interaction, content) {
  return interaction.reply({
    content: content,
    flags: MessageFlags.Ephemeral,
  });
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,        // savoir sur quels serveurs est le bot
    GatewayIntentBits.GuildMessages, // être prévenu des nouveaux messages
    GatewayIntentBits.MessageContent, // lire le contenu des messages (intent privilégié)
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Connecté à la Gateway en tant que ${readyClient.user.username}`);
});

//command coming from Gateway
client.on(Events.InteractionCreate, async (interaction) => {
  if(!interaction.isChatInputCommand()) return;
  
  const name = interaction.commandName;

    if (name === 'setup') {
      const authorId = interaction.user.id;
      console.log('Auteur :', authorId, '| MY_USER_ID :', process.env.MY_USER_ID);

      if(authorId === process.env.MY_USER_ID){
        roleId = interaction.options.getRole('role').id;
        console.log('Rôle enregistré :', roleId);
        return replyEphemeral(interaction, "C'est fait.");
      }else{
        return replyEphemeral(interaction, "Tu n'as pas le droit d'utiliser cette commande.");
      }
    }

    if(name === 'focus') {
      const authorRoles = interaction.member.roles.cache;
      if (roleId === null || !authorRoles.has(roleId)) {
        return replyEphemeral(interaction, "Tu n'as pas le droit de faire ça.");
      }

      user_focused = interaction.options.getUser('user').id;
      channel_focused = interaction.options.getChannel('channel').id;
      console.log('Focus :', user_focused, 'dans le salon', channel_focused);
 
      return replyEphemeral(interaction, "C'est fait.");
    }

    if(name === 'ibai') {
      const authorRoles = interaction.member.roles.cache;
      if (roleId === null || !authorRoles.has(roleId)) {
        return replyEphemeral(interaction, "Tu n'as pas le droit de faire ça.");
      }

      ibai_user = interaction.options.getUser('user').id;
      ibai_channel = interaction.options.getChannel('channel').id;
      ibai_min_length = interaction.options.getInteger('longueur') ?? IBAI_DEFAULT_MIN_LENGTH;
      console.log('Ibai :', ibai_user, 'dans le salon', ibai_channel, '| longueur min :', ibai_min_length);

      return replyEphemeral(interaction, "C'est fait.");
    }

    console.error(`unknown command: ${name}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.id === ibai_user
      && message.channelId === ibai_channel
      && message.content.length >= ibai_min_length) {
    message.reply(IBAI_GIF).catch((err) => {
      console.error("Impossible d'envoyer le gif :", err.message);
    });
  }

  if (message.author.id !== user_focused) return;
  if (message.channelId !== channel_focused) return;

  setTimeout(() => {
    message.delete().catch((err) => {
      console.error('Impossible de supprimer le message :', err.message);
    });
  }, DELETE_DELAY);
});

client.login(process.env.DISCORD_TOKEN);