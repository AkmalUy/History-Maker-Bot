require("dotenv").config();
const config = require("./config.js");
const { request } = require('undici');
const Discord = require("discord.js");
const axios = require('axios').default;
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
//slash command
const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
//end slash command


const { MessageEmbed } = require('discord.js'); //embed
const welcomeEmbed = new MessageEmbed()
	.setColor('#ff5733')
	.setTitle('Selamat Datang di Guild History Maker')
    .setDescription('Guild kita ini guild casual yg santuy \nDisini ada beberapa guide yang mungkin akan berguna silakan lihat lihat. \nJangan mute notification #khusus-guild-mem dan #info-raid yaa. Karena disana ada info penting dan biar ada notif klo kita ngingetin raid. \nDan Jangan malu-malu yaa, kalau ada yang pengen ditanyain tanya aja  \n \n \nkalau pengen di invite guild in-game sekarang/nanti summon aja @inviter \n   THANK YOU')
    
// AXIOS CONNECT
const axtoken = 'wBDbsSWl17btbW6IT0inoI8HakTzPvsjvK0nvPg5';
// contoh menggunakan axios https://axios-http.com/
// atau kamu dapat menggunakan fetch https://developer.mozilla.org/en-US/docs/Web/API/fetch

axios.defaults.headers =  {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + axtoken
    }
};

axios.get('https://toram-id.info/api/v1/items')
.then((response) => console.log("Database item ok"))
.catch((err) => console.error("Database item error"));
// END AXIOS CONNECT

const Client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    prefix: config.prefix,
    initCommands: true
});
//Welcome

//end welcome


Client.on("ready", () => {
        console.log("Ready");
    });
Client.on("message", message => {
    if(message.content === "Hi")
    message.channel.send("HI")
});

Client.on("message", message => {
    if(message.content === "Welcome Newmem")
    message.channel.send(
        { embeds: [welcomeEmbed]} 
)});

    


//Client.on('interactionCreate', async interaction => {
	
//	if (commandName === 'cat') {
//		const catResult = request('https://aws.random.cat/meow');
//		const { file } = getJSONResponse(catResult.body);
//		interaction.editReply({ files: [file] });
//	}
//});

Client.login(process.env.TOKEN);
