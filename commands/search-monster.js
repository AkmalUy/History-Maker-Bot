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
            			.setDescription('Masukan nama monster (B.Indo)')
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
            console.log(res.data["data"][0]["name"])
            // let arry = 0
            const drop = res.data["data"][0]["drops"]
            let dropS = new Array
            for(let i=1;i<=drop.length;i++){
                dropS.push('\n'+i+'. ' + drop[i-1]["name"])
            }
            
            console.log(dropS)

            const jawab = new EmbedBuilder()
                .setAuthor({name : 'Data from : toram-id.info'} )
                .setColor(0xff5733)
                .setThumbnail(res.data["data"][0]["picture"])
                .setTitle(res.data["data"][0]["name"] + '/' + res.data["data"][0]["name_en"])
                .setDescription(`MAP\n(Id)${res.data["data"][0]["map"]["name"]}\n(En)${res.data["data"][0]["map"]["name_en"]}\n\nELEMENT\n${res.data["data"][0]["element"]["name"]}\n\nDROP LIST ${dropS}
                `
               
                

                // drop.forEach((drop) => drop.name),console.log(drop.name)
                // );
                // console.log(drop.name)
                );
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