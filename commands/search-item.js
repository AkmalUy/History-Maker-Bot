// ! Needed Package
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
const axtoken = '20|UjKmDcWKGTx877tMjtHmEFZXGPk3grB0r14H399Y';

// ? Header untuk request API
let instance = axios.create({
    headers: {
        Authorization : `Bearer ${axtoken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
}});


;
module.exports = {
	data: 
    // ! SLASH COMMAND
    new SlashCommandBuilder()
		.setName('search-item')
		.setDescription('Mencari item')
        .addStringOption(option =>
            		option.setName('item')
            			.setDescription('Masukan nama item (B.indo)')
            			.setRequired(true)),

                        async execute(interaction) {
    // ! Listen user input
        const item = interaction.options.getString('item');
        console.log(item);     
        await
        instance.get(`https://toram-id.info/api/v1/items/search/${item}`)
        .then((res)=> {
            // ! RESPON MANAGE
            if (res.data.total == 0){
            console.log('data tidak ditemukan')
            interaction.reply('Item tidak ditemukan')
            } else {
            console.log('data ditemukan')
            console.log(res.data["data"][0]["name"])
            // ! NEW LIST ARRAY
            const note = res.data["data"][0]["note"]
            const drop = res.data["data"][0]["monsters"]
            let dropS = new Array
            if(res.data["data"][0]["monsters"]==0){
                dropS.push('\n-')
            }else {
                for(let i=1;i<=drop.length;i++){
                    dropS.push('\n'+i+'. ' + drop[i-1]["name"])
                }
                }
            console.log(dropS)
            // ! IF PICTURE
            var pic;
            if (res.data["data"][0]["picture"] == null){
                pic = res.data["data"][0]["drop_type"]["url"]
            }else{
                pic = res.data["data"][0]["picture"]
            }
            //! IF (EQUIPMENT / MATS)??
            var jData;
            if (note == null){
                // ? DATA BERUPA MATS
                jData = 'DROP DARI' + dropS
            }else{
                // ? DATA BERUPA EQ
                jData = 'STAT NPC :\n'+ note["npc"] +'\n' + 'STAT MONSTER :\n' + note["monster"]+'\n\n'+'DROP DARI :'+dropS
            }

            const jawab = new EmbedBuilder()
                .setAuthor({name : 'Data from : toram-id.info'} )
                .setColor(0x6495ed)
                .setThumbnail(pic)
                .setTitle(res.data["data"][0]["name"] + '/' + res.data["data"][0]["name_en"])
                .setDescription(`${jData}`
               
                

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