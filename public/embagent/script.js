const API_BASE = "https://embagent-openai-api.onrender.com";

  let userAgent = {
    icon: null,
    name: null,
    mission: null,
    files: [],
    expertise: '',
    etiquette: '',
    links: '',
    knowledgeText: '',
    session_id: Date.now().toString()  // ← Simple unique ID
  };
  
  document.querySelectorAll(".icon-card").forEach(card => {
    card.addEventListener("click", () => {
      // Remove selection from all
      document.querySelectorAll(".icon-card").forEach(c => c.classList.remove("selected"));
      // Add selection
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
    // document.getElementById("step3").classList.remove("active");
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
      
        // Show agent summary
        document.getElementById("agentSummary").innerHTML = `
          <p><strong>Icon:</strong> ${userAgent.icon}</p>
          <p><strong>Name:</strong> ${userAgent.name}</p>
          <p><strong>Mission:</strong> ${userAgent.mission}</p>
          <p><strong>Expertise:</strong> ${userAgent.expertise}</p>
          <p><strong>Etiquette:</strong> ${userAgent.etiquette}</p>
          <p><strong>Links:</strong> ${links || "None provided"}</p>
          <p><strong>Files:</strong> ${
            files.length > 0 ? files.map(f => f.name).join(", ") : "None provided"
          }</p>
        `;
      }
      async function submitAgent() {
        document.getElementById("loadingOverlay").style.display = "flex";
      
        const formData = new FormData();
      
        userAgent.files.forEach(file => {
          formData.append("files", file);  // ✅ FastAPI default
        });
      
        formData.append("usecase", `${userAgent.name} - ${userAgent.mission}`);
        formData.append("expertise", userAgent.expertise);
        formData.append("etiquette", userAgent.etiquette);
        formData.append("links", userAgent.links);
      
        // ✅ LOGGING GOES HERE
        console.log("FormData being sent:");
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
      
        try {
          const res = await fetch(`${API_BASE}/upload`, {
            method: "POST",
            body: formData
          });
      
          if (!res.ok) {
            throw new Error(`Server responded with ${res.status}`);
          }
      
          const data = await res.json();

          // 🧠 Store knowledge for later use in chat
          userAgent.knowledgeText = data.bot_response || "";
          
          // ✅ Proceed to chat
          document.getElementById("loadingOverlay").style.display = "none";
          document.getElementById("step5").classList.remove("active");
          document.getElementById("chatScreen").classList.add("active");
          
          document.getElementById("agentAvatar").src = `/embagent/icons/${userAgent.icon}`;
          document.getElementById("agentDisplayName").innerText = userAgent.name;
          document.getElementById("agentMissionInfo").innerText = userAgent.mission;
          document.getElementById("agentFilesInfo").innerText = userAgent.files.map(f => f.name).join(', ');
          
          // ✅ Show AI's intro message
          appendMessage("agent", userAgent.knowledgeText);
        } catch (err) {
          console.error("❌ Failed to submit agent:", err);
          alert("❌ Error creating agent: " + err.message);
          document.getElementById("loadingOverlay").style.display = "none";
        }
      }
      function toggleAgentInfo() {
        const infoBox = document.getElementById("agentInfo");
        infoBox.style.display = infoBox.style.display === "none" ? "block" : "none";
      }
      
      function appendMessage(sender, text) {
        const chatBox = document.getElementById("chatBox");
        const msg = document.createElement("div");
        msg.style.margin = "0.5rem 0";
        msg.style.textAlign = sender === "user" ? "right" : "left";
        msg.innerHTML = `<strong>${sender === "user" ? "You" : userAgent.name}:</strong> ${text}`;
        chatBox.appendChild(msg);
        chatBox.scrollTop = chatBox.scrollHeight;
      }
      
      async function sendMessage() {
        const input = document.getElementById("userInput");
        const userText = input.value.trim();
        if (!userText) return;
      
        appendMessage("user", userText);
        input.value = "";
      
        const response = await fetch(`${API_BASE}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: userAgent.session_id,
            message: userText,
            icon: userAgent.icon,
            name: userAgent.name,
            mission: userAgent.mission,
            knowledge: userAgent.knowledgeText,
            expertise: userAgent.expertise,
            etiquette: userAgent.etiquette,
            links: userAgent.links
          })
        });
      
        const data = await response.json();
        appendMessage("agent", data.response);
      }
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
        window.location.href = "/";  // 👈 Update to "/landing" if that's your landing route
      }