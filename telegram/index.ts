import TelegramBot from "node-telegram-bot-api";
import chatIds from "./chatId";

let bot: TelegramBot;
function createBot() {
  const token = process.env.TG_TOKEN;
  if (bot) {
    return bot;
  }
  bot = new TelegramBot(token, {
    polling: true,
    request: {
      proxy: "http://127.0.0.1:7890",
    } as TelegramBot.ConstructorOptions["request"],
  });
  // 个人或群主绑定机器人方便后续推送
  bot.onText(/\/bind/, (msg) => {
    const chatId = msg.chat.id;
    if (chatIds.push(chatId)) {
      bot.sendMessage(chatId, "绑定成功");
    } else {
      bot.sendMessage(chatId, "请勿重复绑定");
    }
  });
  return bot;
}

export default {
  createBot,
  sendText(message: string) {
    chatIds.forEach((id) => {
      bot.sendMessage(id, message);
    });
  },
};
