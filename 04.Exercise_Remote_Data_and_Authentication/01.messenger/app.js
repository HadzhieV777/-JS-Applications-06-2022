function attachEvents() {
  const button = {
    submit: document.querySelector("#submit"),
    refresh: document.querySelector("#refresh"),
  };

  const field = {
    name: document.querySelector('[name="author"]'),
    content: document.querySelector('[name="content"]'),
    messages: document.querySelector("#messages"),
  };

  const name = field.name.value.trim();
  const message = field.content.value.trim();
  const allMessages = [];

  const url = "http://localhost:3030/jsonstore/messenger";

  button.submit.addEventListener("click", async () => {
    field.messages.value = "";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: name,
          content: message,
        }),
      });

      if (response.ok == false) {
        throw new Error(await response.error.json());
      }
    } catch (error) {
      alert(error);
    }
  });

  button.refresh.addEventListener("click", async () => {
    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach((m) =>
      addMessage(m, field.messages, allMessages)
    );

    field.messages.scrollTop = field.messages.scrollHeight;
  });
}

attachEvents();

function addMessage(message, section, messages) {
  messages.push(`${message.author}: ${message.content}`);

  section.value = messages.join("\n");
}
