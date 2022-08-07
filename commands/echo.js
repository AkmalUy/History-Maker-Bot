const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Mengecek input.')
		.addStringOption(option => option.setName('puput').setDescription('masukan input')),
	async execute(interaction) {
		const puput = interaction.options.getString('puput');

		return interaction.reply({ content: 'Input anda : ' + puput });
	},
};