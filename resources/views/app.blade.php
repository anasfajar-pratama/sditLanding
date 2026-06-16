<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SDIT Bunga Cempaka — Mendidik Generasi Cerdas &amp; Berakhlak</title>
    <meta name="description" content="SDIT Bunga Cempaka — Sekolah Dasar Islam Terpadu unggulan di Bekasi. Mendidik generasi cerdas, berakhlak mulia, dan berprestasi." />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

    <meta name="csrf-token" content="{{ csrf_token() }}" />

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/landing/main.jsx'])
</head>
<body>
    <div id="app"></div>
</body>
</html>
