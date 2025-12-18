const webhookURL = "https://app.softinsert.com/webhook/3090a203-84a1-4e36-925d-2bfe5ef65bf5/chat";

function addMessage(text, sender) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value;
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
  .then(res => res.json())
  .then(data => {
    addMessage(data.reply || "No response", "bot");
  });
}

