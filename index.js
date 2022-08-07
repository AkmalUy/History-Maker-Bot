// Package yg diperlukan
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection ,EmbedBuilder} = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios').default;
const axtoken = '20|UjKmDcWKGTx877tMjtHmEFZXGPk3grB0r14H399Y';




// Create a new client instance

const client = new Client({ intents: [GatewayIntentBits.Guilds] }); 



client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}




// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

let instance = axios.create({
	headers: {
		Authorization : `Bearer ${axtoken}`,
		'Content-Type': 'application/json',
		Accept: 'application/json',
}});


// instance.get(`https://toram-id.info/api/v1/items/search/bunga`)
// .then((res)=> console.log(res.data))
// .catch((err)=> console.log(err))
// axios.get(lling)

// Login to Discord with your client's token
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

		
client.login(token)