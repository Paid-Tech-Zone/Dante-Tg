const TelegramBot = require('node-telegram-bot-api');
const ytSearch = require('yt-search');

// Replace with your real Telegram bot token
const token = '7503476485:AAEeqU3QJFefjIjE1eBDCZ9WXjbeBEzt_Ao';

const bot = new TelegramBot(token, { polling: true });

// Start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the Telegram bot! Type /help to see available commands.");
});

// Help command
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, `
Available commands:
/start - Welcome message
/help - Show help info
/play <song name> - Search YouTube and return top result
`);
});

// Play command
bot.onText(/\/play (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  try {
    const result = await ytSearch(query);
    const video = result.videos[0];
    if (video) {
      bot.sendMessage(chatId, `Top result for "${query}":\n${video.title}\n${video.url}`);
    } else {
      bot.sendMessage(chatId, "No results found.");
    }
  } catch (err) {
    bot.sendMessage(chatId, "An error occurred while searching.");
  }
});
