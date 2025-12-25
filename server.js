const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = "bc4a149fde30cd361ad7026e4250d933061619d3d453df350b7490c8fae60d4c";

app.post('/send-react', async (req, res) => {
    const { postUrl, emojis } = req.body;

    try {
        const response = await axios.get(`https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api/whatsapp/react`, {
            params: {
                url: postUrl,
                react: emojis,
                apikey: API_KEY // Bisa lewat query param sesuai gambar 2 metode 2
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengirim react" });
    }
});

app.listen(3000, () => console.log('Server jalan di port 3000'));
