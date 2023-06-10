import wp from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { handleMessage } from './message';

const { Client, LocalAuth } = wp;

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: './user-data' }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  const response = handleMessage(message);
  if (response) {
    message.reply(response);
  }
});

client.initialize();
