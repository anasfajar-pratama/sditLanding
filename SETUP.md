# Panduan Setup SDIT Bunga Cempaka — Hostinger
# foto header guru bisa di set sendiri tanpa dari profil guru.

## Persyaratan Server
- PHP 8.2+
- MySQL 5.7+ / MariaDB 10.3+
- Ekstensi PHP: pdo_mysql, gd, fileinfo, mbstring, openssl, tokenizer, xml, ctype, json, bcmath
- Composer 2.x
- Node.js 18+ & npm (untuk build frontend, bisa dilakukan di local)

---

## Langkah Deploy ke Hostinger

### 1. Siapkan Database
1. Masuk ke hPanel Hostinger → **Databases → MySQL Databases**
2. Buat database baru (catat nama, username, password)

### 2. Upload File ke Hostinger
**Opsi A (Lewat File Manager):**
1. Ekstrak ZIP ini di komputer lokal terlebih dahulu
2. Masuk ke **hPanel → File Manager → public_html**
3. Upload semua folder & file ke `public_html/` KECUALI folder `public/`
4. Upload isi folder `public/` ke langsung `public_html/`

**Opsi B (Lewat FTP):**
1. Hubungkan FTP client (FileZilla) ke hosting Anda
2. Upload semua file dengan struktur:
   - Folder `app/`, `bootstrap/`, `config/`, `database/`, dll → `/home/username/`
   - Isi folder `public/` → `/home/username/public_html/`

### 3. Konfigurasi .env
1. Copy file `.env.example` menjadi `.env`
2. Edit `.env` dengan konfigurasi database Anda:
   ```
   APP_URL=https://domain-anda.com
   DB_HOST=127.0.0.1
   DB_DATABASE=nama_database
   DB_USERNAME=username_db
   DB_PASSWORD=password_db
   ADMIN_EMAIL=admin@sekolah.sch.id
   ADMIN_PASSWORD=PasswordAnda!
   ```
3. Tambahkan APP_KEY (generate dengan: `php artisan key:generate --show`)

### 4. Install Dependencies & Setup Database
Lewat SSH Hostinger (Terminal):
```bash
# Masuk ke direktori project
cd /home/username/

# Install Composer dependencies
composer install --no-dev --optimize-autoloader

# Generate app key (jika belum)
php artisan key:generate

# Jalankan migrasi & seeder
php artisan migrate --force
php artisan db:seed --force

# Clear cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5. Build Frontend (di komputer lokal)
```bash
# Di komputer lokal, masuk ke folder project
cd sdit-bunga-cempaka/

# Install npm packages
npm install

# Build untuk production
npm run build
```
Kemudian upload folder `public/build/` ke hosting.

### 6. Permission Folder
Pastikan folder berikut bisa ditulis (permission 755/777):
```
storage/
storage/framework/sessions/
storage/framework/views/
storage/framework/cache/
storage/logs/
public/uploads/
```

### 7. Akses Website
- **Landing Page:** `https://domain-anda.com`
- **Admin Panel:** `https://domain-anda.com/admin`
- **Login:** Email & password yang dikonfigurasi di `.env`

---

## Tentang Storage Gambar

> ⚠️ **Khusus Hostinger (Shared Hosting):** Gambar disimpan langsung di `public/uploads/` bukan di `storage/`. Ini solusi terbaik untuk shared hosting yang tidak support `php artisan storage:link`.

Gambar yang diupload akan otomatis:
- Dikompres menggunakan PHP GD Library
- Diubah ke format JPEG (kualitas 75%)
- Diresize jika melebihi 1920px lebar
- Disimpan di `public/uploads/[kategori]/`

---

## Troubleshooting

**Halaman error 500:**
- Periksa file `.env` sudah benar
- Periksa koneksi database
- Jalankan `php artisan config:clear`

**Gambar tidak tampil:**
- Pastikan folder `public/uploads/` memiliki permission write (755)

**Admin tidak bisa login:**
- Pastikan seeder sudah dijalankan: `php artisan db:seed --force`
- Cek email & password di `.env`

**Error "No application encryption key":**
- Jalankan: `php artisan key:generate`

---

## Struktur File Penting

```
public/
├── index.php          ← Entry point Laravel
├── .htaccess          ← URL rewrite rules
├── build/             ← Hasil build Vite (landing + admin)
└── uploads/           ← Folder upload gambar (auto-created)

resources/js/
├── landing/           ← React SPA landing page
└── admin/             ← React SPA admin panel

database/
└── migrations/        ← Struktur database

app/
├── Helpers/ImageHelper.php   ← Kompresi gambar
└── Models/                   ← Model database
```

---

## Default Login Admin
- **Email:** `admin@sditbungacempaka.sch.id` (sesuai `.env`)
- **Password:** `Admin@2024!` (sesuai `.env`)

> **Segera ganti password setelah pertama login!**

---

Dibuat dengan Laravel 12 + React + Vite + Tailwind CSS
