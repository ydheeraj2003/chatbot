
import express from 'express';
import ollama from 'ollama';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/query-gemma2:2b', async (req, res) => {
    const { prompt, history } = req.body;
    let conversation = '';
    if (history && history.length > 0) {
        history.forEach(entry => {
            conversation += `User: ${entry.prompt}\nModel: ${entry.response}\n`;
        });
    }
    conversation += `User: ${prompt}`;
    const chatConfig = {
        model: "gemma2:2b",
        role: "user",
        content: conversation
    };
    try {
        console.log(`Running prompt with history: ${chatConfig.content}`);
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: chatConfig.content }]
        });
        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });
    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});

app.post('/query-phi3', async (req, res) => {
    const { prompt, history } = req.body;
    let conversation = '';
    if (history && history.length > 0) {
        history.forEach(entry => {
            conversation += `User: ${entry.prompt}\nModel: ${entry.response}\n`;
        });
    }
    conversation += `User: ${prompt}`;
    const chatConfig = {
        model: "phi3",
        role: "user",
        content: conversation
    };
    try {
        console.log(`Running prompt with history: ${chatConfig.content}`);
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: chatConfig.content }]
        });

        const modelResponse = response.message.content.trim();
        console.log(`Model response: ${modelResponse}`);
        res.json({ text: modelResponse });
    } catch (error) {
        console.error('Error querying the model:', error.message);
        res.status(500).json({ error: 'Error querying the model' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

