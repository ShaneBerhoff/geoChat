document.addEventListener('DOMContentLoaded', function() {
    var socket = io();

    //Get elements
    var form = document.getElementById('form');
    var input = document.getElementById('input');
    var messages = document.getElementById('messages');

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (input.value) {
            //Send message to server
            let time = Date.now();
            socket.emit('chat message', { content: input.value, sender: sessionStorage.getItem('username'), timestamp: time });
            input.value = '';
        }
    });

    socket.on('chat message', function(msg) {
        console.log("Message recieved");
        let date = new Date(msg.timestamp);
        let timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        const item = document.createElement('p');
        item.innerHTML = `<strong>${msg.sender}</strong> (<em>${timeStr}</em>) ${msg.content}`;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
});
