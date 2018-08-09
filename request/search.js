const axios = require('axios');

module.exports = async function (search) {
  console.log('>> pencarian', search);
  if (!search) return 'eh cari apa kak?'
  try {
    let response = await axios.get(process.env.API_URL + '/Registrars', {
      params: {
        filter: {
          limit: 10,
          where: {
            or: [
              { fullname: { like: (search || '') + '.*', options: 'i' } },
              { email: { like: (search || '') + '.*', options: 'i' } }
            ]
          }
        }
      }
    })

    if (response.data.length < 1) return `Pencarian "${ search }" tidak ditemukan`

    let total = await axios.get(process.env.API_URL + '/Registrars/count', {
      params: {
        where: {
          or: [
            { fullname: { like: (search || '') + '.*', options: 'i' } },
            { email: { like: (search || '') + '.*', options: 'i' } }
          ]
        }
      }
    })
    total = total.data.count

    let text = 'Pencarian ditemukan\n'
    text += `menampilkan ${ total > 10 ? 10 : total } dari total ${ total }
---------`
    text += '\n\n'
    response.data.forEach(element => {
      text += element.fullname + '\n'
      text += element.email + '\n'
      text += element.institution + '\n'
      text += 'Room ' + element.roomFirst + '\n'
      switch (element.acceptanceStatus) {
        case 1:
          text += 'WAITING LIST'
          break
        case 2:
          text += 'DITERIMA JADI DELEGATES 2018'
          break
        default:
          text += 'TIDAK DITERIMA'
          break
      }
      text += '\n\n'
    });
    return text
  } catch (error) {
    console.log('error pencarian', error.response.data);
    return 'Oops error'
  }
}