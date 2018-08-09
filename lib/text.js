module.exports = {
  greeting: function (context) {
    return `Halo kak ${context.session.user.displayName},
      kalau butuh bantuan, panggil aja namaku yah
    `
  },
  help: function (context) {
    return `Halo kak ${context.session.user.displayName},
Saat ini melody baru bisa bantu buat ngecek pengumuman pendaftaran FLS 2018.
Caranya dengan ketik
pengumuman <spasi> email yang mau dicek status di pendaftarannya
contoh: pengumuman wkwksama@gmail.com

Gitu kak, hehe
Semangat yaa
    `
  }
}
