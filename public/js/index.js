const socket = io();

const clientsTotal = $('#client-total');
const messageContainer = $('#message-container');
const nameInput = $('#name-input');
const messageForm = $('#message-form');
const messageInput = $('#message-inputt');

messageForm.on('submit', function (e) {
    e.preventDefault();
    sendMessage();
})

function sendMessage() {
    if (messageInput.val() === '') return;
    console.log(messageInput.val());
    const data = {
        name: nameInput.val(),
        message: messageInput.val(),
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessageUI(true, data);
    messageInput.val("");
}


socket.on('chat-msg', (data) => {
    console.log(data);
    addMessageUI(false, data);
})


function addMessageUI(myMessage, data) {
    clearFeed();
    const element = `
    <li class="${myMessage ? "message-right" : "message-left"}">
            <p class="message">
                ${data.message}
                <span>${data.name} | ${moment(data.dateTime).fromNow()}</span>
            </p>
    </li>
    `
    messageContainer.append(element);
    scrollToBottom();
}

socket.on('clients-total', (data) => {
    clientsTotal.html(`People Connected: ${data}`);
})


function scroll() {
    messageContainer.animate({
        scrollTo: 0
    }, 1000);
}

function scrollToBottom() {
    const scrollHeight = messageContainer.prop('scrollHeight');
    messageContainer.animate({ scrollTop: scrollHeight }, 50);
}

messageInput.on('focus', ()=>{
    socket.emit('feedback',{
        feedback: `${nameInput.val()} is typing...`,
    });
});

messageInput.on('keypress', ()=>{
    socket.emit('feedback',{
        feedback: `${nameInput.val()} is typing...`,
    });
});

messageInput.on('blur', ()=>{
    socket.emit('feedback',{
        feedback: ``,
    });
});

socket.on('feedback', (data)=>{
    clearFeed();
    const element = `
        <li class="message-feedback">
            <p class="feedback" id="feedback">
               ${data.feedback}
            </p>
        </li>
    `

    messageContainer.append(element);
});

function clearFeed(){
    document.querySelectorAll('li.message-feedback').forEach(element=>{
        element.parentNode.removeChild(element);
    })
}