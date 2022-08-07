const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
	

// const { SlashCommandBuilder, Routes } = require('discord.js');
// const { REST } = require('@discordjs/rest');
// const { clientId , guildId , token } = require('./config.json');

// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// 	new SlashCommandBuilder().setName('search-item').setDescription('Command untuk mencari item')
// 	.addStringOption(option =>
// 		option.setName('item')
// 			.setDescription('nama item')
// 			.setRequired(true)),
// 	new SlashCommandBuilder().setName('search-monster').setDescription('Command untuk mencari monster')
// 	.addStringOption(option =>
// 		option.setName('monster')
// 			.setDescription('nama monster')
// 			.setRequired(true)),
// 	new SlashCommandBuilder().setName('echo').setDescription('Replies with your input!')
// 	.addStringOption(option =>
// 		option.setName('input')
// 			.setDescription('The input to echo back')
// 			.setRequired(true))
// ]
// 	.map(command => command.toJSON());

// const rest = new REST({ version: '10' }).setToken(token);

// rest.put(Routes.applicationGuildCommands(clientId , guildId), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);