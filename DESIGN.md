Design Document

Profile of Ruiqi is an interactive portfolio website built with Flask, HTML, CSS, JavaScript, and the OpenAI API. The idea is to turn my portfolio into a fictional “Harvard Bureau of Investigation” agent archive. Instead of showing one static resume page, visitors search for my agent profile and then explore different identity files, such as Designer, Researcher, Artist, and Hidden Identity.

This project was built with help from ChatGPT 5.5. I used it to debug code, organize the file structure, refine UI ideas, and write parts of the Flask, JavaScript, HTML, and CSS. I still made the design decisions, edited the content, tested the site, and adjusted the project based on what I wanted the final experience to feel like.


Technical Structure:
The backend is built with Flask in `app.py`. Flask serves the main page and handles the `/chat` route for the AI chatbot. The OpenAI API key is loaded from an environment variable called `OPENAI_API_KEY`, so the key is not stored in the code or uploaded to GitHub.

The frontend is mostly built in one HTML file: `templates/index.html`. Instead of using many separate pages, I used multiple `<main>` sections and JavaScript to show and hide them. This makes the site feel like a single interactive experience. The main screens include the search page, agent profile page, Designer page, Researcher page, Artist page, Hidden Identity page, and AI chat page.

The CSS is stored in `static/styles.css`, and the interaction logic is stored in `static/script.js`. Images and videos are stored in `static/assets/`.


Frontend Interaction:
The main navigation is controlled by JavaScript. When a visitor clicks a button, the script hides the current screen and shows the next one. I created a helper function called `openScreen()` to manage this and to scroll the page back to the top each time a new screen opens.

The Researcher and Designer pages include checkbox filters. Each project entry has tags stored in a `data-tags` attribute. When users select filters, JavaScript checks which entries match those tags and hides the others.

The Hidden Identity page uses a simple password check in JavaScript. If the visitor enters the correct password, the hidden page opens. If not, the page shows an “ACCESS DENIED” warning.


AI Chatbot:
The AI chatbot uses the OpenAI API through the Flask backend. The frontend sends the visitor’s message to the `/chat` route, and Flask sends that message to OpenAI along with a system prompt and portfolio context.

The chatbot is designed as “AI Ruiqi,” a digital version of me inside the portfolio. It answers in first person, gives project suggestions, and helps visitors decide which identity page to explore. If the AI response includes text like `[Open Designer Page]`, JavaScript turns that text into a clickable button that opens the correct page.

I chose to keep the API call in the backend because putting the API key in frontend JavaScript would expose it to anyone using the website.


Design Choices:
The visual style is inspired by official files, agent profiles, and archive systems. I used this style because my portfolio is about multiple identities rather than one fixed role. The “agent file” concept makes it easier to show different sides of my work while keeping everything connected.

I used Georgia as the main fonts to create a formal but slightly playful archive feeling. The black-and-white layout keeps the pages clean, while the avatar images make the site feel more personal. I drew my avatars with Procreate.

For project demos, I used MP4 video files instead of GIFs because GIF files were too large and caused problems when pushing to GitHub.


Future Improvements:
If I had more time, I would add more detailed project pages, improve mobile responsiveness, and give the AI chatbot more structured project data. I would also consider turning each identity page into a separate Flask route so visitors could share direct links to specific pages.
Overall, this project is both a portfolio and a small interactive identity system. It uses web development, AI, and visual storytelling to make my resume feel more personal and memorable :D