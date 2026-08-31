const API_BASE = "https://embagent-openai-api.onrender.com";
const overlay = document.getElementById("loadingOverlay");
let userAgent = {
  icon: null,
  name: null,
  mission: null,
  files: [],
  expertise: "",
  etiquette: "",
  links: "",
  knowledgeText: ""
};

document.querySelectorAll(".icon-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".icon-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    userAgent.icon = card.getAttribute("data-icon");
  });
});

function goToStep2() {
  if (!userAgent.icon) {
    alert("Please select an icon.");
    return;
  }
  document.getElementById("step1").classList.remove("active");
  document.getElementById("step2").classList.add("active");
}

function goToStep3() {
  const nameInput = document.getElementById("agentName").value.trim();
  if (!nameInput) {
    alert("Please enter a name for your agent.");
    return;
  }
  userAgent.name = nameInput;
  document.getElementById("step2").classList.remove("active");
  document.getElementById("step3").classList.add("active");
}

function goToStep4() {
  const mission = document.getElementById("agentMission").value.trim();
  if (!mission) {
    alert("Please describe the agent’s mission.");
    return;
  }
  userAgent.mission = mission;
  document.getElementById("step3").classList.remove("active");
  document.getElementById("step4").classList.add("active");
}

function goToStep5() {
  const fileInput = document.getElementById("knowledgeFile");
  const files = Array.from(fileInput.files);
  const links = document.getElementById("agentLinks").value.trim();

  if (files.length === 0 && links === "") {
    alert("Please upload at least one file OR enter a link.");
    return;
  }

  userAgent.files = files;
  userAgent.links = links;

  document.getElementById("step4").classList.remove("active");
  document.getElementById("step5").classList.add("active");

  document.getElementById("agentSummary").innerHTML = `
    <p><strong>Icon:</strong> ${userAgent.icon}</p>
    <p><strong>Name:</strong> ${userAgent.name}</p>
    <p><strong>Mission:</strong> ${userAgent.mission}</p>
    <p><strong>Expertise:</strong> ${userAgent.expertise}</p>
    <p><strong>Etiquette:</strong> ${userAgent.etiquette}</p>
    <p><strong>Links:</strong> ${links || "None provided"}</p>
    <p><strong>Files:</strong> ${files.length > 0 ? files.map(f => f.name).join(", ") : "None provided"}</p>
  `;
}

// async function submitAgent() {

//   // show the overlay
//   overlay.classList.add("active");

//   const formData = new FormData();
//   userAgent.files.forEach(file => formData.append("files", file));
//   formData.append("usecase", `${userAgent.name} – ${userAgent.mission}`);
//   formData.append("expertise", userAgent.expertise);
//   formData.append("etiquette", userAgent.etiquette);
//   formData.append("links", userAgent.links);

//   try {
//     const res = await fetch(`${API_BASE}/upload`, {
//       method: "POST",
//       body: formData
//     });
//     if (!res.ok) throw new Error(`Server responded with ${res.status}`);

//     const data = await res.json();

//     // hide the overlay
//     overlay.classList.remove("active");

//     // switch screens
//     document.getElementById("step5").classList.remove("active");
//     document.getElementById("chatScreen").classList.add("active");

//     // populate your chat UI...
//     document.getElementById("agentAvatar").src = `/embagent/icons/${userAgent.icon}`;
//     document.getElementById("agentDisplayName").innerText = userAgent.name;
//     document.getElementById("agentMissionInfo").innerText = userAgent.mission;
//     document.getElementById("agentFilesInfo").innerText = userAgent.files.map(f => f.name).join(", ");

//     // start the chat
//     appendMessage("agent", data.knowledgeText);

//   } catch (err) {
//     console.error("Failed to submit agent:", err);
//     overlay.classList.remove("active");    // hide on error
//     alert("❌ Error creating agent: " + err.message);
//   }
// }




// after defining submitAgent(), append at the bottom of script.js:


document.getElementById("infoToggle").addEventListener("click", () => {
  document.getElementById("chatScreen").classList.toggle("info-visible");
});
function toggleAgentInfo() {
  const infoBox = document.getElementById("agentInfo");
  infoBox.style.display = infoBox.style.display === "none" ? "block" : "none";
}

function appendMessage(who, text) {
  const container = document.createElement("div");
  container.classList.add("message", who);

  // 1) Header for the name
  const header = document.createElement("div");
  header.classList.add("message-header");
  header.innerText = who === "agent" ? userAgent.name : "You";

  // 2) Body for the content
  const body = document.createElement("div");
  body.classList.add("message-body");
  body.innerText = text;

  container.append(header, body);
  document.getElementById("chatBox").append(container);
  container.scrollIntoView({ behavior: "smooth" });
}

// 🆕 Optional typing indicator logic
function showTyping() {
  const chatBox = document.getElementById("chatBox");
  const typing = document.createElement("div");
  typing.className = "chat-message agent typing-indicator";
  typing.innerHTML = `<div class="message-bubble"><em>${userAgent.name} is typing...</em></div>`;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  document.querySelectorAll(".typing-indicator").forEach(el => el.remove());
}


// 1) When user clicks “Create” on Step 5:
async function submitAgent() {
  // Show overlay
  document.getElementById("loadingOverlay").style.display = "flex";

  // Build FormData
  const formData = new FormData();
  userAgent.files.forEach(file => formData.append("files", file));
  formData.append("usecase", `${userAgent.name} - ${userAgent.mission}`);
  formData.append("expertise", userAgent.expertise);
  formData.append("etiquette", userAgent.etiquette);
  formData.append("links", userAgent.links);

  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const data = await res.json();
    // 2) Hide overlay, show chat screen
    document.getElementById("loadingOverlay").style.display = "none";
    document.getElementById("step5").classList.remove("active");
    document.getElementById("chatScreen").classList.add("active");

    // 3) Populate agent info in the header/info panel
    document.getElementById("agentAvatar").src = `/embagent/icons/${userAgent.icon}`;
    document.getElementById("agentDisplayName").innerText = userAgent.name;
    document.getElementById("agentMissionInfo").innerText = userAgent.mission;
    document.getElementById("agentFilesInfo").innerText = data.filename_list.join(", ");

    // 4) Store the combined knowledge text
    userAgent.knowledgeText = data.knowledgeText;

    // 5) Immediately show that knowledge as the first “agent” message
    appendMessage("agent", data.knowledgeText);

  } catch (err) {
    console.error("❌ Failed to submit agent:", err);
    alert("❌ Error creating agent: " + err.message);
    document.getElementById("loadingOverlay").style.display = "none";
  }
}

// 6) sendMessage() to hit /chat:
async function sendMessage() {
  const input = document.getElementById("userInput");
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  input.value = "";

  showTyping();

  try {
    const resp = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userText,
        icon: userAgent.icon,
        name: userAgent.name,
        mission: userAgent.mission,
        knowledge: userAgent.knowledgeText,  // ← matches ChatRequest.knowledge
        expertise: userAgent.expertise,
        etiquette: userAgent.etiquette,
        links: userAgent.links
      })
    });

    if (!resp.ok) {
      // If FastAPI returned a 400/500, try to read the JSON detail
      const errObj = await resp.json().catch(() => null);
      removeTyping();
      const errMsg = errObj?.detail || `Server responded with ${resp.status}`;
      throw new Error(errMsg);
    }

    const data = await resp.json();
    removeTyping();
    appendMessage("agent", data.response);

  } catch (err) {
    removeTyping();
    console.error("❌ Chat failed:", err);
    appendMessage("agent", "❌ I encountered an error. Please try again.");
  }
}
// Navigation functions (unchanged)
function goToStep1() {
  document.getElementById("step2").classList.remove("active");
  document.getElementById("step1").classList.add("active");
}

function goToStep3Back() {
  document.getElementById("step4").classList.remove("active");
  document.getElementById("step3").classList.add("active");
}

function goToStep4Back() {
  document.getElementById("step5").classList.remove("active");
  document.getElementById("step4").classList.add("active");
}

function goToStep2Back() {
  document.getElementById("step3").classList.remove("active");
  document.getElementById("step2").classList.add("active");
}

function goHome() {
  window.location.href = "/";
}