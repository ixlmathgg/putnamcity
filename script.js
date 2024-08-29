const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usernameInput = document.getElementById('usernameInput');
const setUsernameButton = document.getElementById('setUsernameButton');

let username = localStorage.getItem('username') || 'Anonymous';

function displayMessages() {
    const chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    messages.innerHTML = '';
    chatMessages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.username}: ${msg.text}`;
        messages.appendChild(messageElement);
    });
    messages.scrollTop = messages.scrollHeight;
}

function addMessage(message) {
    const chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    chatMessages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    displayMessages();
}

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        addMessage({ username, text: messageText });
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendButton.click();
    }
});

setUsernameButton.addEventListener('click', () => {
    const newUsername = usernameInput.value.trim();
    if (newUsername) {
        username = newUsername;
        localStorage.setItem('username', username);
        usernameInput.value = '';
        displayMessages();
    }
});

displayMessages();
