![TOD BOT](https://i.imgur.com/1UJ6wSW.png)

# TOD BOT
This is my simple Discord bot using Discord.JS, actually I made this for my server only and for educational purpose so if you can see the code is bit messy. I will update this bot and try to refactor the code when I got free time.

## How to Use
1. Get your bot token from https://discord.com/developers/applications
2. Install nodejs https://nodejs.org/en/download/
3. Install dependencies
   ```
   npm i discord.js
   npm i fs
   npm i axios
   npm i request
   npm i mongodb
   npm i steamid
   ```
4. You need check the .js file one by one and you should looking for variables like `channel` `role` `emoji in format: <emojiname:emojiid` and change it on your own
5. After you done with checking the files, run using pm2 `pm2 start bot.js`

## List API Used in This Project and Needed API KEY
* [Dota 2 Stats](https://steamcommunity.com/dev/apikey)
* [Apex Legends Stats](https://tracker.gg/developers)
* [Check Weather](https://openweathermap.org/api)
* [Link Shortener](https://dev.bitly.com/)
* [Currency Converter](https://free.currencyconverterapi.com/)

## Get Your `connectionString` to be Able to Use Casino Commands
1. I'm sorry because I'm too lazy to write this step by step, so all you need to do is watch this video https://www.youtube.com/watch?v=EcJERV3IiLM
2. You don't need watch the whole video, just on `4:17 - 7:55 (note: make sure you name your collection to users)` `16:26 - 19:13 (paste the connectionstring to config.json)`
3. And you are done

## Commands
### Featured Commands
* Casino
  * Register
  * Daily
  * Give coin
  * Check profile
  * Buy badge
  * Coinflip solo and duo
  * Dice solo and duo
  * Slot
  * Crash game
* Account Generator
  * Generate
  * Restock
### Normal Commands
* Moderation
  * Ban
  * Kick
  * Clear message
* Fun
  * ~~Jokes~~
  * Love calculator
* Game Stats
  * Dota 2 stats
  * Apex Legends stats
* Information
  * Covid-19 stats
  * Cryptocurrency price
  * Weather check
  * Ping
  * Generate invite server link
  * Server info
  * Bot info
  * Convert currency
  * See all the command list with how to use them
* NSFW
  * Hmmmm
* Anime
  * Anime Boruto scraper (if you are weebs and from Indonesia)
* Utilities
  * Short link
  * Get random image
  * Create polling
  * Generate fake complete data
  * Random number generator
  * Coinflip
  
 ## Issues & Suggestion
 ### Known Issues
 - [ ] If you play the crash game, you need to stop the game in `1.9x` in order to stop on `2.0x`
 
 If you have any issues or problem, you can create a new issues and I will help as much as I can (note: check the closed issues first before create a new issues)
 ### Suggestion
 If you have any suggestion or request features, you can create a new issues
