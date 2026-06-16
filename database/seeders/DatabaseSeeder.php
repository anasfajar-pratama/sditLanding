<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use App\Models\Setting;
use App\Models\Hero;
use App\Models\Stat;
use App\Models\About;
use App\Models\Program;
use App\Models\Teacher;
use App\Models\Facility;
use App\Models\Testimonial;
use App\Models\ContactInfo;
use App\Models\Gallery;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        Admin::create([
            'name' => 'Administrator',
            'email' => env('ADMIN_EMAIL', 'admin@sditbungacempaka.sch.id'),
            'password' => env('ADMIN_PASSWORD', 'Admin@2024!'),
        ]);

        // Settings
        $settings = [
            'school_name' => 'SDIT Bunga Cempaka',
            'tagline' => 'Mendidik Generasi Cerdas & Berakhlak',
            'whatsapp_number' => '6281318988499',
            'address' => 'Jl. Bunga Cempaka No. 12, Kec. Cikampek, Karawang, Jawa Barat 17510',
            'email' => 'info@sditbungacempaka.sch.id',
            'phone' => '+62 813-1898-8499',
            'facebook' => 'https://facebook.com/sditbungacempaka',
            'instagram' => 'https://instagram.com/sditbungacempaka',
            'youtube' => '',
            'footer_description' => 'Mendidik Generasi Cerdas, Berakhlak, dan Berprestasi sejak tahun 2005.',
            'copyright_text' => '© 2026 SDIT Bunga Cempaka. Hak Cipta Dilindungi. 🌸',
            'ppdb_link' => '#kontak',
            'ppdb_text' => 'Daftar Sekarang',
            'logo' => '',
            'logo_yayasan' => '',
        ];

        foreach ($settings as $key => $value) {
            Setting::set($key, $value);
        }

        // Hero
        Hero::create([
            'hero_style' => 'centered',
            'title' => 'Mendidik Generasi Cerdas & Berakhlak Mulia',
            'title_line1' => 'Taman Bermain & Belajar',
            'title_line2' => 'Generasi Berakhlak Mulia',
            'badge' => 'Akreditasi A — Tahun Ajaran 2025/2026',
            'subtitle' => 'Sekolah Dasar Islam Terpadu Terbaik',
            'description' => 'Mendidik Generasi Cerdas, Berakhlak, dan Berprestasi. Lingkungan sekolah yang asri, nyaman, dan Islami untuk buah hati Anda.',
            'cta_text' => 'Informasi Pendaftaran',
            'cta_link' => '#kontak',
            'secondary_cta_text' => 'Lihat Program Kami',
            'secondary_cta_link' => '#program',
        ]);

        // Stats
        $stats = [
            ['label' => 'Siswa Aktif', 'value' => '500', 'suffix' => '+', 'icon' => 'users', 'order' => 1],
            ['label' => 'Guru Profesional', 'value' => '30', 'suffix' => '+', 'icon' => 'graduation-cap', 'order' => 2],
            ['label' => 'Tahun Berpengalaman', 'value' => '15', 'suffix' => '', 'icon' => 'calendar', 'order' => 3],
            ['label' => 'Prestasi Diraih', 'value' => '100', 'suffix' => '+', 'icon' => 'trophy', 'order' => 4],
        ];
        foreach ($stats as $stat) {
            Stat::create($stat);
        }

        // About
        About::create([
            'title' => 'Tentang SDIT Bunga Cempaka',
            'content' => 'SDIT Bunga Cempaka adalah sekolah dasar Islam terpadu yang berdiri di bawah naungan Yayasan Fajar Nusantara. Kami berkomitmen untuk memberikan pendidikan berkualitas tinggi yang mengintegrasikan ilmu pengetahuan umum dengan nilai-nilai Islam yang kuat.',
            'vision' => 'Menjadi sekolah dasar Islam terpadu terkemuka yang menghasilkan generasi cerdas, berakhlak mulia, dan berprestasi.',
            'mission' => 'Menyelenggarakan pendidikan Islam terpadu yang berkualitas; Mengembangkan potensi akademik dan non-akademik siswa; Membentuk karakter Islami yang kuat dan berakhlak mulia.',
        ]);

        // Programs
        $programs = [
            ['title' => 'Tahfidz Al-Quran', 'description' => 'Program hafalan Al-Quran terstruktur dengan metode yang menyenangkan. Siswa ditargetkan menghafal minimal 3 juz selama 6 tahun.', 'icon' => 'book-open', 'order' => 1],
            ['title' => 'Pembelajaran Aktif', 'description' => 'Metode pembelajaran modern yang berpusat pada siswa, mendorong kreativitas, berpikir kritis, dan kemampuan pemecahan masalah.', 'icon' => 'lightbulb', 'order' => 2],
            ['title' => 'Pembinaan Akhlak', 'description' => 'Program pembinaan karakter dan akhlak Islami yang terintegrasi dalam setiap aspek kehidupan sekolah sehari-hari.', 'icon' => 'heart', 'order' => 3],
            ['title' => 'Bahasa Arab & Inggris', 'description' => 'Pembelajaran dua bahasa internasional sejak dini untuk mempersiapkan siswa menghadapi era globalisasi.', 'icon' => 'globe', 'order' => 4],
            ['title' => 'STEM Education', 'description' => 'Program sains, teknologi, teknik, dan matematika yang inovatif untuk mempersiapkan siswa di era digital.', 'icon' => 'cpu', 'order' => 5],
            ['title' => 'Shalat Berjemaah', 'description' => 'Pembiasaan ibadah shalat Dhuha dan Zuhur berjemaah setiap hari untuk membentuk kedisiplinan dan keimanan yang kokoh.', 'icon' => 'star', 'order' => 6],
        ];
        foreach ($programs as $program) {
            Program::create(array_merge($program, ['is_active' => true]));
        }

        // Teachers
        $teachers = [
            ['name' => 'Ustdzh. Siti Rahayu, S.Pd.I', 'position' => 'Kepala Sekolah', 'bio' => '15 tahun pengalaman, S2 Pendidikan Islam', 'order' => 1, 'is_featured' => true],
            ['name' => 'Ust. Ahmad Fauzi, S.Pd', 'position' => 'Guru Tahfidz', 'bio' => 'Hafidz 30 Juz, pengajar Al-Qur\'an berpengalaman', 'order' => 2],
            ['name' => 'Ustdzh. Nurlaila Hidayah, S.Pd', 'position' => 'Guru Kelas 1', 'bio' => 'Sabar, kreatif, dan sangat menyenangkan', 'order' => 3],
            ['name' => 'Ust. Ridwan Santosa, M.Pd', 'position' => 'Guru Matematika & Sains', 'bio' => 'Lulusan S2, menerapkan metode fun learning', 'order' => 4],
            ['name' => 'Ustdzh. Fitri Amalia, S.Pd', 'position' => 'Guru B. Indonesia & PAI', 'bio' => 'Terampil, berdedikasi, dan penuh semangat', 'order' => 5],
            ['name' => 'Ust. Hendra Permana, S.Pd', 'position' => 'Guru Olahraga & Pramuka', 'bio' => 'Energik, motivatif, dan aktif membimbing siswa', 'order' => 6],
        ];
        foreach ($teachers as $teacher) {
            Teacher::create(array_merge($teacher, ['is_active' => true, 'is_featured' => $teacher['is_featured'] ?? false]));
        }

        // Facilities
        $facilities = [
            ['name' => 'Ruang Kelas Ber-AC', 'type' => 'facility', 'description' => 'Ruang kelas modern dengan pendingin udara dan fasilitas belajar lengkap.', 'icon' => 'home', 'order' => 1],
            ['name' => 'Perpustakaan', 'type' => 'facility', 'description' => 'Perpustakaan lengkap dengan koleksi buku umum dan Islami yang beragam.', 'icon' => 'book', 'order' => 2],
            ['name' => 'Laboratorium Komputer', 'type' => 'facility', 'description' => 'Lab komputer modern untuk mendukung pembelajaran teknologi dan coding.', 'icon' => 'monitor', 'order' => 3],
            ['name' => 'Aula Serbaguna', 'type' => 'facility', 'description' => 'Aula besar yang digunakan untuk kegiatan olahraga, seni, dan acara sekolah.', 'icon' => 'layers', 'order' => 4],
            ['name' => 'Masjid Sekolah', 'type' => 'facility', 'description' => 'Masjid sekolah yang nyaman untuk kegiatan ibadah dan pembelajaran agama.', 'icon' => 'star', 'order' => 5],
            ['name' => 'Kantin Sehat', 'type' => 'facility', 'description' => 'Kantin yang menyediakan makanan bergizi dan halal untuk siswa.', 'icon' => 'coffee', 'order' => 6],
            ['name' => 'Pramuka', 'type' => 'eskul', 'description' => 'Kegiatan pramuka untuk membentuk karakter mandiri, disiplin, dan jiwa kepemimpinan.', 'icon' => 'compass', 'order' => 1],
            ['name' => 'Seni Kaligrafi', 'type' => 'eskul', 'description' => 'Mengembangkan bakat seni menulis Arab yang indah dan bermakna.', 'icon' => 'pen-tool', 'order' => 2],
            ['name' => 'Futsal', 'type' => 'eskul', 'description' => 'Ekstrakurikuler olahraga futsal untuk mengembangkan kebugaran dan kerjasama tim.', 'icon' => 'activity', 'order' => 3],
            ['name' => 'Tari & Seni Budaya', 'type' => 'eskul', 'description' => 'Melestarikan budaya bangsa melalui seni tari dan pertunjukan budaya.', 'icon' => 'music', 'order' => 4],
            ['name' => 'Robotika', 'type' => 'eskul', 'description' => 'Program robotika untuk memperkenalkan dunia teknologi kepada siswa sejak dini.', 'icon' => 'cpu', 'order' => 5],
            ['name' => 'Tartil & Tahsin', 'type' => 'eskul', 'description' => 'Memperbaiki bacaan Al-Quran dengan makharijul huruf dan tajwid yang benar.', 'icon' => 'book-open', 'order' => 6],
            ['name' => 'Rihlah Tahunan', 'type' => 'kegiatan', 'description' => 'Perjalanan wisata edukatif tahunan yang menambah wawasan dan pengalaman siswa.', 'icon' => 'map', 'order' => 1],
            ['name' => 'Pesantren Kilat', 'type' => 'kegiatan', 'description' => 'Kegiatan pesantren kilat di bulan Ramadan untuk memperdalam ilmu agama.', 'icon' => 'moon', 'order' => 2],
            ['name' => 'Olimpiade & Lomba', 'type' => 'kegiatan', 'description' => 'Persiapan dan keikutsertaan dalam berbagai olimpiade akademik tingkat kota dan provinsi.', 'icon' => 'trophy', 'order' => 3],
            ['name' => 'Gelar Prestasi', 'type' => 'kegiatan', 'description' => 'Ajang apresiasi dan pameran karya siswa yang diadakan setiap semester.', 'icon' => 'award', 'order' => 4],
        ];
        foreach ($facilities as $facility) {
            Facility::create(array_merge($facility, ['is_active' => true]));
        }

        // Testimonials (only 3 active by default, others can be toggled)
        $testimonials = [
            ['name' => 'Ibu Dewi Rahmawati', 'relation' => 'Wali murid kelas 3', 'content' => '"Anak saya jadi lebih rajin sholat dan sudah hafal beberapa juz sejak di SDIT Bunga Cempaka. Gurunya sabar dan perhatian sekali."', 'rating' => 5, 'is_active' => true],
            ['name' => 'Bapak Rizky Pratama', 'relation' => 'Wali murid kelas 5', 'content' => '"Sekolah yang luar biasa! Bukan hanya pintar secara akademik, tapi akhlak anak saya juga terbentuk dengan sangat baik."', 'rating' => 5, 'is_active' => true],
            ['name' => 'Ibu Sari Indah', 'relation' => 'Wali murid kelas 1', 'content' => '"Lingkungannya Islami, gurunya ramah, dan program tahfidznya bagus banget. Sangat direkomendasikan untuk orang tua Muslim!"', 'rating' => 5, 'is_active' => true],
            ['name' => 'Bapak Ahmad Fauzi', 'relation' => 'Wali murid kelas 4', 'content' => '"Alhamdulillah, anak saya sangat berkembang sejak bersekolah di sini. Selain prestasi akademiknya meningkat, akhlak dan ibadahnya juga semakin baik."', 'rating' => 5, 'is_active' => false],
            ['name' => 'Ibu Siti Rahmawati', 'relation' => 'Wali murid kelas 6', 'content' => '"SDIT Bunga Cempaka benar-benar luar biasa! Program tahfidz-nya sangat bagus dan anak saya sudah hafal 5 juz. Sangat puas dengan kualitas pendidikan di sini."', 'rating' => 5, 'is_active' => false],
        ];
        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }

        // Contact Info
        $contacts = [
            'phone' => '+62 813-1898-8499',
            'phone_2' => '',
            'email' => 'info@sditbungacempaka.sch.id',
            'email_2' => 'ppdb@sditbungacempaka.sch.id',
            'address' => 'Jl. Bunga Cempaka No. 12, Kec. Cikampek, Karawang, Jawa Barat 17510',
            'postal_code' => '17510',
            'operational_hours' => "Senin - Jumat: 07.00 - 15.00 WIB\nSabtu: 07.00 - 12.00 WIB",
            'map_iframe' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4!2d107.46!3d-6.41!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zBsKwMjQnMzYuMCJTIDEwN8KwMjcnMzYuMCJF!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
        ];
        foreach ($contacts as $key => $value) {
            ContactInfo::set($key, $value);
        }

        // Gallery — upload foto melalui admin panel
        // (kosong di awal, admin upload via menu Galeri)
    }
}
