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
      return 'Waiting List room ' + response.data.roomFirst
    case 2:
      return 'Diterima jadi Delegates room ' + response.data.roomFirst
    default:
      return 'TIDAK DITERIMA BOSKU'
  }
}
