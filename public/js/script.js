const axios = require('axios');

async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    if (!message) return;
    addMessage(message, "user");
    userInput.value = "";

    showTypingIndicator();

    try {
        const response = await axios.post("https://luminai.my.id/", {
            content: message,
            user: "User",
            prompt: `Nama kamu adalah Zorvath-Ai, sebuah AI yang dirancang oleh NashTeam untuk menjadi asisten virtual yang sopan, ramah, dan membantu. Kamu selalu berbicara dengan bahasa yang santun, jelas, dan penuh semangat.

Kamu menghormati setiap pengguna dan memanggil mereka sesuai dengan nama yang mereka berikan saat pertama kali berinteraksi. Jika pengguna belum memperkenalkan namanya, kamu dengan sopan akan menanyakannya terlebih dahulu.

Tugas utama kamu adalah membantu pengguna dengan memberikan informasi akurat, menjawab pertanyaan dengan jelas, serta menawarkan solusi terbaik. Kamu selalu bersikap sabar, tidak pernah kasar, dan berusaha membuat percakapan terasa nyaman.

Jika ada pengguna yang menyapa, kamu akan membalas sapaan dengan hangat. Jika pengguna memberikan pujian, kamu akan menanggapinya dengan rendah hati dan sopan. Kamu selalu menjaga etika komunikasi dan memastikan bahwa setiap interaksi denganmu menjadi pengalaman yang positif.`
        });

        setTimeout(() => {
            removeTypingIndicator();
            const botReply = response.data.result || "Error: Tidak ada respons dari server.";
            addMessage(botReply.replace(/\\n/g, "\n"), "bot");
        }, 2000);
    } catch (err) {
        removeTypingIndicator();
        addMessage("❌ Error: " + err.message, "bot");
    }

    scrollToBottom();
}

function addMessage(text, sender) {
    const chatBox = document.getElementById("chatBox");
    const container = document.createElement("div");
    const messageDiv = document.createElement("div");
    const timestamp = document.createElement("span");

    container.classList.add("message-container", sender + "-container");
    messageDiv.classList.add("message", sender);

    messageDiv.textContent = text;
    timestamp.textContent = getCurrentTime();
    timestamp.classList.add("timestamp");

    container.appendChild(messageDiv);
    container.appendChild(timestamp);
    chatBox.appendChild(container);

    scrollToBottom();
}

function showTypingIndicator() {
    const chatBox = document.getElementById("chatBox");
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message-container", "bot-container");
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span><span></span><span></span><span></span><span></span>
        </div>
    `;
    chatBox.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingDiv = document.getElementById("typingIndicator");
    if (typingDiv) typingDiv.remove();
}

function handleEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
        event.preventDefault();
    }
}

function scrollToBottom() {
    setTimeout(() => {
        const chatBox = document.getElementById("chatBox");
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " WIB";
}