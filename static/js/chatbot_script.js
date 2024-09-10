const userMessage = [
    ["hi", "hey", "hello"],
    ["sure", "yes", "no"],
    ["are you genius", "are you nerd", "are you intelligent"],
    ["i hate you", "i don't like you"],
    ["how are you", "how is life", "how are things", "how are you doing"],
    ["what is front-end", "how is covid 19", "how is covid19 situation"],
    ["what are you doing", "what is going on", "what is up"],
    ["how old are you"],
    ["who are you", "are you human", "are you bot", "are you human or bot"],
    ["who created you", "who made you", "who is your creator"],
    ["your name please", "your name", "may I know your name", "what is your name", "what do you call yourself"],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool", "very good"],
    ["bad", "bored", "tired"],
    ["help me", "tell me a story", "tell me a joke"],
    ["ah", "ok", "okay", "nice", "welcome"],
    ["thanks", "thank you"],
    ["what should I eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["corona", "covid19", "coronavirus"],
    ["you are funny"],
    ["I don't know"],
    ["boring"],
    ["I'm tired"]
];

const botReply = [
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    ["Okay"],
    ["Yes I am!"],
    ["I'm sorry about that. But I like you too."],
    ["Fine... how are you?", "Pretty well, how are you?", "Fantastic, how are you?"],
    ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],
    ["Nothing much", "About to go to sleep", "Can you guess?", "I don't know actually"],
    ["I am always young."],
    ["I am just a bot", "I am a bot."],
    ["Tech Prem"],
    ["I am nameless", "I don't have a name"],
    ["I love you too", "Me too"],
    ["Have you ever felt bad?", "Glad to hear it"],
    ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
    ["What about?", "Once upon a time..."],
    ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
    ["You're welcome"],
    ["Biryani", "Burger", "Sushi", "Pizza","Rice with sambar"],
    ["Dude!"],
    ["Yes?"],
    ["Please stay home"],
    ["Glad to hear it"],
    ["Say something interesting"],
    ["Sorry for that. Let's chat!"],
    ["Take some rest, Dude!"]
    
];

const alternative = [
    "Same here, dude.",
    "That's cool! Go on...",
    "Dude...",
    "Ask something else...",
    "Hey, I'm listening...",
    "Sorry, I didn't get that.",
    "Could you ask something else?",
    "I'm not sure how to respond to that."
];

const specificResponses = {
    "what is front end": "Front-end is a part of web development that involves creating the user interface and experience of a website. It's not a language, but it typically involves languages like HTML, CSS, and JavaScript.",  
    "what is back end":"The backend is the server-side part of a web application that handles data processing, storage, and server logic. It works behind the scenes to ensure the frontend (user interface) functions correctly. Technologies used for backend include languages like Python and Java, and databases like MySQL.",
    "suggest some courses for front end":"kindly visit this page <a href='./Categories/categories1.html' target='_blank'>Front-end</a>",
    "suggest some courses for back end" :"kindly visit this page for <a href='./Categories/categories2.html' target='_blank'>Back-end</a>",
    "what is full stack development" :" Full stack development involves working on both the frontend (user interface) and backend (server-side) of a web application. A full stack developer handles everything from designing the UI to managing databases and server logic."
};

const synth = window.speechSynthesis;

function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
}

function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    if (input !== "") {
        output(input);
    }
    inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value.trim();
            if (input !== "") {
                output(input);
            }
            inputField.value = "";
        }
    });
});

function output(input) {
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "")
        
        .replace(/[\W_]/g, " ")
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .trim();

    console.log(`Processed input: ${text}`); // Debugging

    let response = compare(userMessage, botReply, text);
    if (!response) {
        response = alternative[Math.floor(Math.random() * alternative.length)];
    }
    addChat(input, response);
}

function compare(triggerArray, replyArray, string) {
    console.log(`Received input: ${string}`); 
    
 
    if (specificResponses[string]) {
        console.log(`Specific response found for: ${string}`); 
        return specificResponses[string];
    }

    
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < triggerArray[x].length; y++) {
            let pattern = new RegExp(`\\b${triggerArray[x][y]}\\b`, 'i');
            if (pattern.test(string)) {
                let replies = replyArray[x];
                return replies[Math.floor(Math.random() * replies.length)];
            }
        }
    }

    console.log('No match found, checking fallback.'); 
    return containMessageCheck(string);
}

function containMessageCheck(string) {
    const expectedReply = [
        ["Good Bye, dude", "Bye, See you!", "Dude, Bye. Take care of your health in this situation."],
        ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
        ["Have a pleasant evening!", "Good evening too", "Evening!"],
        ["Good morning, Have a great day!", "Morning, dude!"],
        ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
    ];
    const expectedMessage = [
        ["bye", "tc", "take care"],
        ["night", "good night"],
        ["evening", "good evening"],
        ["morning", "good morning"],
        ["noon"]
    ];

    for (let x = 0; x < expectedMessage.length; x++) {
        if (expectedMessage[x].includes(string)) {
            let replies = expectedReply[x];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }
    return null;
}

function addChat(input, response) {
    const mainDiv = document.getElementById("message-section");

    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${response}</span>`;
    mainDiv.appendChild(botDiv);

    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(response);
}
