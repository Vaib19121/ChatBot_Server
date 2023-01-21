const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
require("dotenv/config");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const configuration = new Configuration({
    organization: "org-zlvuqNPsrXDvxpZ1e8f7aK5P",
    apiKey:process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

router.get("/test", (req, res) => {
    
    res.json({message: "Hello World!"});
});

router.post("/", async (req, res) => {
    const {message,model,temperature} = req.body;
    console.log(message,model,temperature);
    const response = await openai.createCompletion({
        model: model,
        prompt: message,
        max_tokens: 100,
        temperature: temperature,
    });
    console.log(response.data);
    res.json({message: response.data.choices[0].text});
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
 

module.export = app;