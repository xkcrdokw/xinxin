const fetch = require('node-fetch');
const cheerio = require('cheerio');
const path = require('path');

async function tebakHewan() {
const randomPageNumber = Math.floor(Math.random() * 20) + 1;
const url = `https://rimbakita.com/daftar-nama-hewan-lengkap/${randomPageNumber}/`;
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    return $('div.entry-content.entry-content-single img[class*=wp-image-][data-src]').map((_, element) => {
      const src = $(element).attr('data-src');
      const alt = path.basename(src, path.extname(src)).replace(/-/g, ' ');
      const capitalizedAlt = alt.charAt(0).toUpperCase() + alt.slice(1);
      return { title: capitalizedAlt, url: src };
    }).get();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

async function tebakhero(tema = "id") {
try {
     let karakter = ["Aamon", "Assassin", "Jungler", "Akai", "Tank", "Aldous", "Fighter", "Alice", "Alpha", "Alucard", "Angela", "Support", "Roamer", "Argus", "EXP Laner", "Arlott", "Atlas", "Aulus", "Aurora", "Mage", "Badang", "Balmond", "Bane", "Barats", "Baxia", "Beatrix", "Marksman", "Gold Laner", "Belerick", "Benedetta", "Brody", "Bruno", "Carmilla", "Caecilion", "Mid Laner", "Chou", "Figter", "Cici", "Claude", "Clint", "Cyclops", "Diggie", "Dyrroth", "Edith", "Esmeralda", "Estes", "Eudora", "Fanny", "Faramis", "Floryn", "Franco", "Fredrinn", "Freya", "Gatotkaca", "Gloo", "Gord", "Granger", "Grock", "Guinevere", "Gusion", "Hanabi", "Hanzo", "Harith", "Harley", "Hayabusa", "Helcurt", "Hilda", "Hylos", "Irithel", "Ixia", "Jawhead", "Johnson", "Joy", "Asassin", "Julian", "Kadita", "Kagura", "Kaja", "Karina", "Karrie", "Khaleed", "Khufra", "Kimmy", "Lancelot", "Layla", "Leomord", "Lesley", "Ling", "Lolita", "Lunox", "Luo Yi", "Lylia", "Martis", "Masha", "Mathilda", "Melissa", "Minotaur", "Minsitthar", "Miya", "Moskov", "Nana", "Natalia", "Natan", "Novaria", "Odette", "Paquito", "Pharsa", "Phoveus", "Popol and Kupa", "Rafaela", "Roger", "Ruby", "Saber", "Selena", "Silvanna", "Sun", "Terizla", "Thamuz", "Tigreal", "Uranus", "Vale", "Valentina", "Valir", "Vexana", "Wanwan", "Xavier", "Yin", "Yu Zhong", "Yve", "Zhask", "Zilong"];
   let chara = karakter[Math.floor(Math.random() * karakter.length)]
    const url = tema === "id" ? `https://mobile-legends.fandom.com/wiki/${chara.toLowerCase()}/Audio/id` : tema === "en" ? `https://mobilelegendsbuild.com/sitemap.xml` : null;
    if (!url) throw new Error("Tema tidak valid");
    let res = await fetch(url);
    let data = await res.text();
    if (tema === "en") {
      const result = await parseStringPromise(data);
      const targetUrl = result.urlset.url.filter(url => url.loc[0].includes("sound/" + chara.toLowerCase())).map(url => url.loc[0])[0];
      if (!targetUrl) return [];
      res = await fetch(targetUrl);
      data = await res.text();
    }
    const $ = cheerio.load(data);
    let audio = $("audio").map((i, el) => $(el).attr("src")).get();
   let audio_random = audio[Math.floor(Math.random() * audio.length)]
   if (!audio_random) await tebakhero()
 return {
  hero: chara,
  voice: audio_random || audio
   }
  } catch (error) {
    return error
  }
}

module.exports = {
 tebakHewan,
 tebakhero
};