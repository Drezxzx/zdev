"use client"
import io from 'socket.io-client'
import { useState, useEffect } from 'react';

const socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

export default function Chat({email, recipientEmail} : {email: string, recipientEmail: string}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any>();
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        socket.emit('message', {
            email,
            message,
        });
        setMessages([...messages, message]);
        setMessage("")
        
    }

    useEffect(() => {
        socket.emit('join', email);
        socket.on('message', reciveMessage);
        
        return () => {
            socket.off('message', reciveMessage);
        };
    }, [])

    const reciveMessage = (message: string) => {
        console.log(message)
        // setMessages((prevMessages) => [...prevMessages, message]);
    }
    return (
        <div>
            <form>
                <input className='text-black' value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" placeholder="Escribe tu mensaje..." />
                <button onClick={handleSubmit}>Enviar</button>
            </form>
            {/* <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul> */}
        </div>
    );  
}