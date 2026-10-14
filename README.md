# Premier bot Discord

Bot Discord en JavaScript basé sur [discord.js](https://discord.js.org/), connecté via la Gateway Discord (connexion WebSocket sortante : pas besoin d'URL publique, de port ouvert ni de ngrok).

## Fonctionnalités

| Commande | Description | Disponible |
|---|---|---|
| `/test` | Commande de test basique pour vérifier que le bot répond | Serveurs, DM, MP de groupe |
| `/challenge <objet>` | Lance un défi pierre-feuille-ciseaux | Serveurs, MP de groupe |
| `/focus <utilisateur> <salon>` | Cible un utilisateur dans un salon donné (réservé au rôle défini avec `/setup`) | Serveurs uniquement |
| `/ibai <utilisateur> <salon> [longueur]` | Répond avec le gif défini dans `IBAI_GIF` (`app.js`) dès que l'utilisateur envoie un message d'au moins `longueur` caractères (50 par défaut) dans le salon (réservé au rôle défini avec `/setup`) | Serveurs uniquement |
| `/setup <rôle>` | Choisit le rôle autorisé à utiliser `/focus` | Serveurs uniquement |

## Prérequis

- [Node.js](https://nodejs.org/) 24 ou plus récent
- Une application Discord créée sur le [portail développeur](https://discord.com/developers/applications), avec un bot
- (Optionnel) [Docker](https://www.docker.com/)

## Configuration

1. Copie le fichier d'exemple des variables d'environnement :

   ```bash
   cp .env.sample .env
   ```

2. Remplis `.env` avec les informations de ton application (onglets *General Information* et *Bot* du portail développeur) :

   ```env
   DISCORD_TOKEN=ton_token_de_bot
   APP_ID=id_de_ton_application
   ```

3. Dans le portail développeur, onglet *Bot*, active **Message Content Intent** (nécessaire pour `/ibai`, qui lit la longueur des messages).

4. Dans le portail développeur, laisse le champ **Interactions Endpoint URL** vide : le bot reçoit les interactions par la Gateway.

5. Invite le bot sur ton serveur via *OAuth2 → URL Generator*, avec les scopes `bot` et `applications.commands` et les permissions dont il a besoin.

> Ne publie jamais ton fichier `.env` : il est ignoré par Git.

## Lancer le bot

### En local

```bash
npm install
npm run register   # enregistre les slash commands auprès de Discord
npm run start
```

### Avec Docker

```bash
docker build -t premier-bot-discord .
docker run -d --name bot --env-file .env --restart unless-stopped premier-bot-discord
```

Le conteneur n'expose aucun port : le bot se connecte lui-même à Discord.

## Structure du projet

| Fichier | Rôle |
|---|---|
| `app.js` | Point d'entrée : connexion à la Gateway et gestion des interactions |
| `commands.js` | Définition et enregistrement des slash commands |
| `utils.js` | Fonctions utilitaires |
| `Dockerfile` | Image Docker du bot |

## Licence

Ce projet est dérivé de [discord/discord-example-app](https://github.com/discord/discord-example-app), distribué sous licence MIT. Voir [LICENSE](LICENSE).
