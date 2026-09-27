# Michael Octama Portfolio

Portofolio satu halaman berbasis Next.js untuk menampilkan profil, pengalaman, keahlian, dan write-up cyber security.

## Menjalankan lokal

```bash
pnpm dev
```

Buka `http://localhost:3000` di browser.

## Menambah write-up

Data kartu write-up berada di `app/page.js`, pada konstanta `writeups`. Setelah file PDF atau Markdown diunggah ke penyimpanan publik, tambahkan URL pada data tersebut dan ubah kartu menjadi tautan.

Untuk kebutuhan ini, Supabase Storage cocok untuk file kecil dan metadata Postgres. Cloudflare R2 lebih cocok bila koleksi PDF akan banyak atau ukurannya besar.

## Deploy ke Vercel

1. Buat repository GitHub dari folder ini.
2. Import repository melalui dashboard Vercel.
3. Vercel akan mendeteksi Next.js dan menjalankan build secara otomatis.

Tidak ada environment variable yang diperlukan sebelum penyimpanan write-up dihubungkan.
