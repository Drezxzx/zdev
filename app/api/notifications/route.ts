// notifications/route.ts
import client from '@/app/conn/conn';

export async function GET(req: Request) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return new Response('User ID is required', { status: 400 });
  }

  const headers = new Headers();
  headers.set('Content-Type', 'text/event-stream');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Connection', 'keep-alive');

  const stream = new Response(readable, { headers });

  console.log(`Nueva conexión para el usuario: ${userId}`);
  addClient(userId, writer);

  req.signal.addEventListener('abort', () => {
    removeClient(userId, writer);
  });

  return stream;
}

export async function POST(req: Request) {
  const body = await req.json(); // Usamos JSON para obtener los datos del POST
  const { userId, message } = body;

  // Validación de los datos
  if (!userId || !message) {
    return new Response('User ID and message are required', { status: 400 });
  }

  // Llamar a la función para enviar la notificación
  sendNotification(userId, message);

  return new Response('Notification sent', { status: 200 });
}

// app/clients.ts

// Suponiendo que tienes un objeto clients donde guardas los escritores para cada usuario
let clients: Record<string, WritableStreamDefaultWriter[]> = {};

export function addClient(userId: string, writer: WritableStreamDefaultWriter) {
  if (!clients[userId]) {
    clients[userId] = [];
  }
  clients[userId].push(writer);
}

export function removeClient(userId: string, writer: WritableStreamDefaultWriter) {
  if (clients[userId]) {
    clients[userId] = clients[userId].filter(client => client !== writer);
  }
}

export function sendNotification(userId: string, message: string) {
  const userClients = clients[userId];
  
  if (userClients && userClients.length > 0) {
    // Enviar el mensaje a todos los clientes conectados
    userClients.forEach(writer => {
      writer.write(`data: ${JSON.stringify({ message })}\n\n`);
    });
  } else {
    console.log(`No hay clientes conectados para el usuario: ${userId}`);
  }
}

