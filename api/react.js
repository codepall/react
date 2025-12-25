const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi API ASITHA-MD dari gambar
const API_KEY = "bc4a149fde30cd361ad7026e4250d933061619d3d453df350b7490c8fae60d4c";
const BASE_URL = "https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app";

app.use(bodyParser.json());

// Melayani file statis (index.html Anda)
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Endpoint Utama: /api/react
 * Sesuai dengan fetch() di index.html Anda
 */
app.post('/api/react', async (req, res) => {
    const { post_link, reacts } = req.body;

    // Validasi input
    if (!post_link || !reacts) {
        return res.status(400).json({ 
            status: false, 
            message: "Link postingan dan reaction payload wajib diisi." 
        });
    }

    try {
        /* Catatan: Endpoint spesifik untuk 'react' tidak terlihat di gambar, 
           jadi saya asumsikan strukturnya mengikuti standar API Asitha-MD.
           Gunakan API Key sebagai query parameter atau Bearer token.
        */
        const response = await axios.get(`${BASE_URL}/api/endpoint`, {
            params: {
                url: post_link,
                reaction: reacts,
                apikey: API_KEY // Menggunakan API Key dari gambar
            }
        });

        // Mengembalikan response sukses ke frontend
        res.status(200).json(response.data);

    } catch (error) {
        console.error("Error calling ASITHA API:", error.message);
        
        // Menangani error dari API eksternal
        const statusCode = error.response ? error.response.status : 500;
        const errorData = error.response ? error.response.data : { message: "Internal Server Error" };
        
        res.status(statusCode).json({
            status: false,
            error: errorData
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Reaction Hub berjalan di http://localhost:${PORT}`);
});
