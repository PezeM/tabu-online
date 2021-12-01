const { io } = require('socket.io-client');

const URL = 'http://localhost:3010';
const MAX_CLIENTS = 100000;
const CLIENT_CREATION_INTERVAL_IN_MS = 10;
const EMIT_INTERVAL_IN_MS = 1000;

let clientCount = 0;
let lastReport = new Date().getTime();
let packetsSinceLastReport = 0;

const createClient = () => {
  const socket = io(URL, {
    transports: ['websocket'],
  });

  const username = 'Username';

  socket.auth = { username };
  socket.connect();

  setInterval(() => {
    socket.emit('createLobby');
  }, EMIT_INTERVAL_IN_MS);

  socket.on('lobbyCouldntCreateOrJoin', () => {
    packetsSinceLastReport++;
  });

  socket.on('disconnect', reason => {
    console.log(`disconnect due to ${reason}`);
  });

  if (++clientCount < MAX_CLIENTS) {
    setTimeout(createClient, CLIENT_CREATION_INTERVAL_IN_MS);
  }
};

createClient();

const printReport = () => {
  const now = new Date().getTime();
  const durationSinceLastReport = (now - lastReport) / 1000;
  const packetsPerSeconds = (packetsSinceLastReport / durationSinceLastReport).toFixed(2);

  console.log(
    `client count: ${clientCount} ; average packets received per second: ${packetsPerSeconds}`,
  );

  packetsSinceLastReport = 0;
  lastReport = now;
};

setInterval(printReport, 5000);
