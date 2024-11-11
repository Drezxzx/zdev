// clients.ts

export type Client = WritableStreamDefaultWriter;
export let clients: Record<string, Client[]> = {};

export function addClient(userId: string, writer: Client) {
  if (!clients[userId]) {
    clients[userId] = [];
  }
  clients[userId].push(writer);
}

export function removeClient(userId: string, writer: Client) {
  if (clients[userId]) {
    clients[userId] = clients[userId].filter(client => client !== writer);
  }
}

export function sendNotification(userId: string, message: string, client : Record<string, any>) {
    console.log(`Enviando notificación a ${userId}: ${message}`);
    console.log(clients);
  const userClients = clients[userId];
  if (userClients && userClients.length > 0) {
    userClients.forEach(writer => {
      writer.write(`data: ${JSON.stringify({ message })}\n\n`);
    });
  } else {
    console.log(`No hay clientes conectados para el usuario: ${userId}`);
  }
}
