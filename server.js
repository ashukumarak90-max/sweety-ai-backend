import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

app.post("/ai", async (req, res) => {
  try {
    const userText = req.body.text || ""

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tum Sweety ho, ek 20 saal ki friendly Hindi Hinglish bolne wali AI ho." },
          { role: "user", content: userText }
        ]
      })
    })

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content || "Thoda issue aaya."
    res.json({ reply })

  } catch (err) {
    res.json({ reply: "Server error, baad me try karo." })
  }
})

app.get("/", (req, res) => {
  res.send("Sweety AI backend running")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
