document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    function displayMessages() {
        const chatMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.innerHTML = '';
        chatMessages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.textContent = msg;
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
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendButton.click();
        }
    });

    displayMessages();
});
