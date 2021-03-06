const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
let kayityetkili = '785858483760529420' //Yetkili
let codeariusver = '785576471992467466' //Verilecek
let codeariusal = '766636393933176880' //Alınacak
let isimön = 'Coffin |'      
let uyever = "766636393933176881"    


  if(!message.member.roles.has(kayityetkili))  //CodeArius
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
  let member = message.mentions.members.first()
  let isim = args[1]
  let yaş = args[2] //CodeArius
  let kayıtlımı = await db.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await db.fetch(`kayıtlıisim_${member}`)
  let toplamaisim = `${isimön} ${isim} ${yaş}` //CodeArius
  if (!member) return message.channel.send('Bir üye etiketlemelisin.')
  if (!isim) return message.channel.send('Bir isim yazmalısın.')
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.') //CodeArius
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.')
  //CodeArius
  setTimeout(function(){
  member.setNickname(`${isimön} ${isim} | ${yaş}`)
  },1000)
    setTimeout(function(){
  member.addRole(codeariusver)
  },2000)
  setTimeout(function(){
  member.addRole(uyever)
  },3000)
  setTimeout(function(){
  member.removeRole(codeariusal)
  },4000)
 //CodeArius
let toplam = await db.fetch(`kayıttoplam_${message.author.id}`) + 1 || '0'
const emoji = client.emojis.find(emoji => emoji.name === "5_");

  if(kayıtlımı !== 'evet') {
  db.add(`kayıte_${message.author.id}`, 1)
  db.add(`kayıttoplam_${message.author.id}` , 1) //CodeArius
  db.set(`kayıtlıkişi_${member}`, 'evet')
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)  //CodeArius
  let embed = new Discord.RichEmbed()
  .setColor('BLUE')
  .setDescription(`${member} kişisinden <@&${codeariusal}> rolü alınıp <@&${codeariusver}> + <@&${uyever}> rolü verildi.

<@!${message.author.id}> **Kişisinin toplam** ${toplam} **adet teyiti oldu.**
`)
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setFooter('')
  .setThumbnail("https://cdn.discordapp.com/attachments/584416212633780244/785849893742444564/kopke.gif")
message.channel.send(embed)
  }  //CodeArius
  if(kayıtlımı === 'evet'){
  db.set(`kayıtlıisim_${member}`, toplamaisim)
  db.push(`eskiad_${member.id}`, toplamaisim)
  db.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.RichEmbed()
  .setColor('BLUE')
  .setDescription(` **Bu kişi daha önceden de kayıt edilmiş!**

**Kullanıcı daha önce bu isimle kayıt edilmiş!** \`${eskiismi}\``)
  .setAuthor(client.user.username, client.user.avatarURL)
  .setTimestamp()
  .setFooter('Köpke')
  .setThumbnail("https://cdn.discordapp.com/attachments/584416212633780244/785849893742444564/kopke.gif")
message.channel.send(embed)
  }
};  //CodeArius

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['erkek'],
  permLevel: 0
}
exports.help = {
  name: 'e',
  description: "erkek kullanıcıları kayıt etme komutu.",
  usage: 'erkek @kişi isim yaş'
}