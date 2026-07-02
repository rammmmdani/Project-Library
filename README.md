# E-Library Sederhana CRUD

Website katalog Perpustakaan Al-Rabbani yang sudah dibuat menjadi CRUD menggunakan HTML, CSS, dan JavaScript.

## Fitur CRUD

- **Create**: tambah data buku baru melalui form CRUD.
- **Read**: tampilkan daftar katalog dan halaman detail buku.
- **Update**: edit data buku dari tombol Edit, serta ubah status buku dari halaman detail.
- **Delete**: hapus data buku dari tabel katalog.
- **Search & Filter**: cari buku dan filter berdasarkan status.
- **LocalStorage**: data tersimpan otomatis di browser tanpa database.

## Struktur File

- `index.html` = halaman utama, katalog, form tambah/edit, hapus data.
- `detail.html` = halaman detail buku dan update status pinjam/kembali.
- `assets/css/style.css` = file tampilan website.
- `assets/js/app.js` = logic CRUD JavaScript.
- `assets/img/` = gambar/logo.

## Cara Menjalankan

1. Ekstrak ZIP.
2. Buka folder `e-library-sederhana-crud` di VS Code.
3. Jalankan dengan Live Server / Go Live.
4. Buka `index.html`.
5. Tambahkan, edit, lihat detail, atau hapus data buku.

Catatan: Karena memakai LocalStorage, data tersimpan di browser yang sama. Untuk mengembalikan data awal, klik tombol **Reset Data Contoh**.
