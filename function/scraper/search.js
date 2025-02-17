const axios = require('axios');
const cheerio = require('cheerio');

async function searchSticker(query) {
  try {
    const response = await axios.get(`https://getstickerpack.com/stickers?query=${query}`);
    const $ = cheerio.load(response.data);

    const stickerPacks = $("#stickerPacks > div > div:nth-child(3) > div > a")
      .map((_, element) => $(element).attr('href'))
      .get();

    if (!stickerPacks.length) {
      return 'No sticker packs found for your search.';
    }

    const randomPackUrl = stickerPacks[Math.floor(Math.random() * stickerPacks.length)];
    const packResponse = await axios.get(randomPackUrl);
    const $2 = cheerio.load(packResponse.data);

    const stickerUrls = $2("#stickerPack > div > div.row > div > img")
      .map((_, element) => $(element).attr('src').replace(/&d=200x200/g, ''))
      .get();

    return {
      title: $2("#intro > div > div > h1").text(),
      stickerUrls,
    };
  } catch (error) {
    console.error(error);
    return 'An error occurred while searching for stickers. Please try again later.';
  }
}

async function wallpaper(query) {
    try {
        const response = await axios.get(`https://www.uhdpaper.com/search?q=${encodeURIComponent(query)}&by-date=true`);
        const html = response.data;
        const $ = cheerio.load(html);
        const results = [];

        $('article.post-outer-container').each((index, element) => {
            const title = $(element).find('.snippet-title h2').text().trim();
            const imageUrl = $(element).find('.snippet-title img').attr('src');
            const resolution = $(element).find('.wp_box b').text().trim();
            const link = $(element).find('a').attr('href');

            results.push({
                title,
                imageUrl: imageUrl.startsWith('http') ? imageUrl : `https://www.uhdpaper.com${imageUrl}`,
                resolution,
                link: `https://www.uhdpaper.com${link}`
            });
        });

        return results;
    } catch (error) {
        return { status: false, msg: `Error: ${error.message}` };
    }
}

module.exports = {
 searchSticker,
 wallpaper
};