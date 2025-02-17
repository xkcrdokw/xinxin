const ai = require('./scraper/ai');
const download = require('./scraper/downloader');
const game = require('./scraper/game');
const search = require('./scraper/search');
const stalk = require('./scraper/stalk')

module.exports = {
    gpt: ai.openai,
    stalktt: stalk.tiktokStalk,
	stickerpack: search.searchSticker,
	tiktok: download.tiktok,
	thewan: game.tebakHewan,
	thero: game.tebakhero,
	wallpaper: search.wallpaper
}
