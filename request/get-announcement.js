const axios = require('axios');

module.exports = async function(email) {
  console.log('>> mengecek pengumuman', email);
  if (!email) return 'EMAILNYA MANA BOS'
  try {
    let response = await axios.get(process.env.API_URL + '/Registrars/findOne', {
      params: {
        filter: {
          where: {
            email: { regexp: `^${email}/i`}
          }
        }
      }
    })
    switch (response.data.acceptanceStatus) {
      case 1:
        return `Dear, ${ response.data.fullname } dari ${ response.data.city } !
          Terima kasih karena sudah mau memulai mengambil bagian untuk perubahan dunia dengan mendaftarkan dirimu di Future Leader Summit 2018.

          Saat ini, kamu berada di posisi WAITING LIST delegates Future Leader Summit 2018 untuk Room ${ response.data.roomFirst }.

          Apabila ada delegasi room bersangkutan yang mengundurkan diri, maka panitia FLS 2018 akan menghubungi kamu untuk keterangan lebih lanjut.

          Silahkan cek emailmu untuk informasi selanjutnya!

          Terima Kasih
        `
      case 2:
        return `Welcome to Future Leader Summit 2018!

        Dear, ${ response.data.fullname} dari ${ response.data.city } !

        Setelah melewati tahap seleksi, kami mengucapkan selamat karena kamu telah terpilih menjadi
Delegates Future Leader Summit 2018 di Room ${ response.data.roomFirst }

        Mari mulai ambil bagian untuk perubahan dunia bersama 239 pemuda-pemudi terbaik Indonesia di konferensi Future Leader Summit yang diselenggarakan di Semarang tanggal 8-9 September 2018 mendatang.

        Silahkan cek emailmu untuk informasi selanjutnya!
        Terima Kasih
        `
      default:
        return `Terima kasih ${response.data.fullname} karena sudah berpartisipasi dan mau mencoba untuk ambil bagian dalam merubah dunia dengan mendaftarkan dirimu di Future Leader Summit 2018.

          Namun kami meminta maaf, karena untuk saat ini, kamu belum bisa bergabung menjadi salah satu delegasi di Future Leader Summit 2018.

          Jangan putus asa dan tetap semangat ya! Masih banyak cara lainnya untuk ikut serta mengambil bagian dalam mengubah dunia.

          Sampai jumpa di lain kesempatan!
        `
    }
  } catch (error) {
    console.log('error get pengumuman', error.response.data);
    if (error.response.data.error.statusCode == 404) return `Email ${ email } tidak dikenali. Mohon periksa kembali`
    return 'Terjadi ERROR Pengumuman'
  }
}
