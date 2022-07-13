import {Server} from 'socket.io';

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
        socket.on('comments', (msg) => {
            msg.type = `book: ${bookId}`;
            console.log(msg);
            socket.to(bookId).emit('comments', msg);
            socket.emit('comments', msg);
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnect: ${id}`);
        });
    });
};