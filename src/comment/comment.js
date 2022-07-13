import {Server} from 'socket.io';
import {MessageModel} from '../model/message.js';

export const initComments = function(server) {

    const io = new Server(server, (err) => {
        if (err) {
            console.log(err);
        }
    });


    io.on('connection', (socket) => {

        const {id} = socket;
        console.log(`Socket connected: ${id}`);

        const {bookId} = socket.handshake.query;
        console.log(`Socket book: ${bookId}`);
        socket.join(bookId);
        socket.on('comments', async (msg) => {
            
            const newMessage = new MessageModel({
                author: msg.username,
                message: msg.text,
                bookId: bookId,
                date: new Date()
            });

            try {
                await newMessage.save();
                console.log(newMessage);
            } catch (e) {
                console.log({error: e});
            }

            console.log(msg);
            socket.to(bookId).emit('comments', msg);
            socket.emit('comments', msg);
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${id}`);
        });
    });
};