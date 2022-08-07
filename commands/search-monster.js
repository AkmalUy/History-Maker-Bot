const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axtoken = '20|UjKmDcWKGTx877tMjtHmEFZXGPk3grB0r14H399Y';
let instance = axios.create({
    headers: {
        Authorization : `Bearer ${axtoken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
}});


;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('search-monster')
		.setDescription('Mencari monster')
        .addStringOption(option =>
            		option.setName('momon')
            			.setDescription('Masukan nama monster')
            			.setRequired(true)),

	async execute(interaction) {
        const momon = interaction.options.getString('momon');
        console.log(momon);     
        await
        instance.get(`https://toram-id.info/api/v1/monsters/search/${momon}`)
        .then((res)=> {
            if (res.data.total == 0){
            console.log('data tidak ditemukan')
            interaction.reply('Monster tidak ditemukan')
            } else {
            console.log('data ditemukan')
            // let arry = 0
            const drop = res.data["data"][0]["drops"]
            const jawab = new EmbedBuilder()
                .setAuthor({name : 'toram-id.info'} )
                .setThumbnail(res.data["data"][0]["picture"])
                .setTitle(res.data["data"][0]["name"] + '/' + res.data["data"][0]["name_en"])
                .setDescription(`MAP\n (id)${res.data["data"][0]["map"]["name"]}\n (en)${res.data["data"][0]["map"]["name_en"]}\nELEMENT\n${res.data["data"][0]["element"]["name"]}\nDROP LIST \n
                BIKIN PERULANGAN NYA GIMANA ? :v
                ${drop.forEach((e) => e["name"])}
                
                `,
                );
                console.log(e.name)
               
            // console.log(res.data)
            interaction.reply({embeds :[jawab]})
            console.log(res.data["data"][0]["name"])
            }
                })
        .catch((err)=> console.log(err))  
        return
    }
    
        
        
        // axios.get(lling)
        

     

};