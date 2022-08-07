const axios = require('axios').default;
const axtoken = '20|UjKmDcWKGTx877tMjtHmEFZXGPk3grB0r14H399Y';
const item = 'odel'

let instance = axios.create({
	headers: {
		Authorization : `Bearer ${axtoken}`,
		'Content-Type': 'application/json',
		Accept: 'application/json',
}})

instance.get(`https://toram-id.info/api/v1/monsters/search/${item}`)
.then((res)=> 
{if (res.data.total == 0){
console.log('data tidak ditemukan')

} else {
console.log('data ditemukan')
// console.log(res.data)
console.log(res.data)

}
    })
.catch((err)=> console.log(err))

