// /api/react.js

export default async function handler(req, res) {
  // Hanya izinkan metode POST dari frontend
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const { post_link, reacts } = req.body;

    // Validasi input
    if (!post_link || !reacts) {
      return res.status(400).json({ ok: false, error: 'post_link dan reacts wajib diisi.' });
    }

    // Konfigurasi sesuai screenshot
    const API_KEY = 'bc4a149fde30cd361ad7026e4250d933061619d3d453df350b7490c8fae60d4c';
    const BASE_URL = 'https://foreign-marna-sithaunarathnapromax-9a005c2e.koyeb.app/api';

    // Menyusun URL dengan Query Parameters: ?url=...&react=...&apikey=...
    // Catatan: Nama parameter (url/react) disesuaikan dengan standar API sejenis, 
    // silakan ganti jika asitha.top menggunakan nama parameter berbeda (misal: 'link' atau 'text')
    const targetUrl = `${BASE_URL}?apiKey=${API_KEY}&?postUrl=${encodeURIComponent(post_link)}&emojis=${encodeURIComponent(reacts)}`;

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    const data = await response.json();

    // Teruskan status code dan data dari API utama ke frontend kamu
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Backend Error:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Terjadi kesalahan pada server backend.',
      details: error.message 
    });
  }
}

