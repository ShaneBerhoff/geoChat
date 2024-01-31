document.addEventListener('DOMContentLoaded', function() {
    var socket = io();

    var form = document.getElementById('form');
    var input = document.getElementById('input');
    var messages = document.getElementById('messages');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', { content: input.value, sender: 'SomeSender' });
            input.value = '';
        }
    });

    socket.on('chat message', function(msg) {
        console.log("Message recieved");
        var item = document.createElement('li');
        item.textContent = msg.content;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
});
