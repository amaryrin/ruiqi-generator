const menuScreen = document.getElementById("menuScreen");
const builderScreen = document.getElementById("builderScreen");
const chatScreen = document.getElementById("chatScreen");

const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");

const chatOpenBtn = document.getElementById("chatOpenBtn");
const chatBackBtn = document.getElementById("chatBackBtn");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

const hiddenIdentityBtn = document.getElementById("hiddenIdentityBtn");
const passwordScreen = document.getElementById("passwordScreen");
const passwordBackBtn = document.getElementById("passwordBackBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordSubmitBtn = document.getElementById("passwordSubmitBtn");
const passwordWarning = document.getElementById("passwordWarning");

const hiddenUnlockedScreen = document.getElementById("hiddenUnlockedScreen");
const hiddenBackBtn = document.getElementById("hiddenBackBtn");

const researcherIdentityBtn = document.getElementById("researcherIdentityBtn");
const researcherScreen = document.getElementById("researcherScreen");
const researcherBackBtn = document.getElementById("researcherBackBtn");

const researchFilters = document.querySelectorAll(".research-filter");
const researchEntries = document.querySelectorAll(".resume-entry");
const noResearchResults = document.getElementById("noResearchResults");

const designerIdentityBtn = document.getElementById("designerIdentityBtn");
const designerScreen = document.getElementById("designerScreen");
const designerBackBtn = document.getElementById("designerBackBtn");

const designerFilters = document.querySelectorAll(".designer-filter");
const designerEntries = document.querySelectorAll(".designer-entry");

const artistIdentityBtn = document.getElementById("artistIdentityBtn");
const artistScreen = document.getElementById("artistScreen");
const artistBackBtn = document.getElementById("artistBackBtn");

function hideAllScreens() {
    menuScreen.classList.add("hidden");
    builderScreen.classList.add("hidden");
    chatScreen.classList.add("hidden");
    passwordScreen.classList.add("hidden");
    hiddenUnlockedScreen.classList.add("hidden");
    researcherScreen.classList.add("hidden");
    designerScreen.classList.add("hidden");
    artistScreen.classList.add("hidden");
}

function openScreen(screen) {
    hideAllScreens();
    screen.classList.remove("hidden");
    window.scrollTo(0, 0);
}

// Front page search button -> agent profile page
startBtn.addEventListener("click", () => {
    openScreen(builderScreen);
});

// Exit button -> back to front page
backBtn.addEventListener("click", () => {
    openScreen(menuScreen);
});

// Hidden Identity card -> password page
hiddenIdentityBtn.addEventListener("click", () => {
    openScreen(passwordScreen);
    passwordInput.value = "";
    passwordWarning.textContent = "";
    passwordInput.focus();
});

// Password page -> back to profile
passwordBackBtn.addEventListener("click", () => {
    openScreen(builderScreen);
});

// Check password
passwordSubmitBtn.addEventListener("click", checkHiddenPassword);

passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkHiddenPassword();
    }
});

function checkHiddenPassword() {
    const typedPassword = passwordInput.value.trim().toLowerCase();

    if (typedPassword === "instagram") {
        openScreen(hiddenUnlockedScreen);
    } else {
        passwordWarning.textContent = "ACCESS DENIED";
        alert("ACCESS DENIED");
    }
}

// Hidden unlocked page -> back to profile
hiddenBackBtn.addEventListener("click", () => {
    openScreen(builderScreen);
});

// Researcher card -> Researcher page
researcherIdentityBtn.addEventListener("click", () => {
    openScreen(researcherScreen);
});

researcherBackBtn.addEventListener("click", () => {
    openScreen(builderScreen);
});

// Designer card -> Designer page
designerIdentityBtn.addEventListener("click", () => {
    openScreen(designerScreen);
});

designerBackBtn.addEventListener("click", () => {
    openScreen(builderScreen);
});

// Artist card -> Artist page
artistIdentityBtn.addEventListener("click", () => {
    openScreen(artistScreen);
});

artistBackBtn.addEventListener("click", () => {
    openScreen(builderScreen);
});

// Agent profile page -> AI chat page
chatOpenBtn.addEventListener("click", () => {
    openScreen(chatScreen);
});

// AI chat page -> back to agent profile page
chatBackBtn.addEventListener("click", () => {
    openScreen(builderScreen);
});

// Research filters
researchFilters.forEach((filter) => {
    filter.addEventListener("change", filterResearchEntries);
});

function filterResearchEntries() {
    const selectedTags = Array.from(researchFilters)
        .filter((filter) => filter.checked)
        .map((filter) => filter.value);

    let visibleCount = 0;

    researchEntries.forEach((entry) => {
        const entryTags = entry.dataset.tags.split(" ");

        const shouldShow =
            selectedTags.length === 0 ||
            selectedTags.some((tag) => entryTags.includes(tag));

        if (shouldShow) {
            entry.classList.remove("hidden");
            visibleCount++;
        } else {
            entry.classList.add("hidden");
        }
    });

    if (visibleCount === 0) {
        noResearchResults.classList.remove("hidden");
    } else {
        noResearchResults.classList.add("hidden");
    }
}

// Designer filters
designerFilters.forEach((filter) => {
    filter.addEventListener("change", filterDesignerEntries);
});

function filterDesignerEntries() {
    const selectedTags = Array.from(designerFilters)
        .filter((filter) => filter.checked)
        .map((filter) => filter.value);

    designerEntries.forEach((entry) => {
        const entryTags = entry.dataset.tags.split(" ");

        const shouldShow =
            selectedTags.length === 0 ||
            selectedTags.some((tag) => entryTags.includes(tag));

        if (shouldShow) {
            entry.classList.remove("hidden");
        } else {
            entry.classList.add("hidden");
        }
    });
}

// Chat with Flask/OpenAI backend
chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userText = chatInput.value.trim();

    if (userText === "") {
        return;
    }

    addMessage(userText, "user");
    chatInput.value = "";

    addMessage("Thinking...", "ai");

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();

        chatMessages.lastChild.remove();

        if (data.reply) {
            addMessage(data.reply, "ai");
        } else if (data.error) {
            addMessage("Error: " + data.error, "ai");
        } else {
            addMessage("Something went wrong. No reply was returned.", "ai");
        }
    } catch (error) {
        chatMessages.lastChild.remove();
        addMessage("Connection error. Check Flask terminal.", "ai");
        console.error(error);
    }
});

function addMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("message", sender);

    const linkActions = {
        "[Open Designer Page]": () => openScreen(designerScreen),
        "[Open Researcher Page]": () => openScreen(researcherScreen),
        "[Open Artist Page]": () => openScreen(artistScreen),
        "[Open Hidden Identity Page]": () => openScreen(passwordScreen)
    };

    let remainingText = text;

    Object.keys(linkActions).forEach((label) => {
        if (remainingText.includes(label)) {
            const parts = remainingText.split(label);

            if (parts[0].trim() !== "") {
                const textBlock = document.createElement("p");
                textBlock.textContent = parts[0].trim();
                message.appendChild(textBlock);
            }

            const linkButton = document.createElement("button");
            linkButton.textContent = label.replace("[", "").replace("]", "");
            linkButton.classList.add("chat-link-button");
            linkButton.addEventListener("click", linkActions[label]);
            message.appendChild(linkButton);

            remainingText = parts.slice(1).join(label);
        }
    });

    if (remainingText.trim() !== "") {
        const textBlock = document.createElement("p");
        textBlock.textContent = remainingText.trim();
        message.appendChild(textBlock);
    }

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}