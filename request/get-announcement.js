const axios = require('axios');

module.exports = async function(email) {
  console.log('>> mengecek pengumuman', email);
  if (!email) return 'EMAILNYA MANA BOS'
  let response = await axios.get('http://128.199.72.101:3000/api/Registrars/findOne', {
    params: {
      filter: {
        where: {
          email: email
        }
      }
    }
  })
  switch (response.data.acceptanceStatus) {
    case 1:
      return response.data.fullname + '\n\n Waiting List room ' + response.data.roomFirst
    case 2:
      return response.data.fullname + '\n\n Diterima jadi Delegates room ' + response.data.roomFirst
    default:
      return response.data.fullname + '\n\n TIDAK DITERIMA BOSKU'
  }
}
