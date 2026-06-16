<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Panel — SDIT Bunga Cempaka</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />

    <meta name="csrf-token" content="{{ csrf_token() }}" />

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/admin/main.jsx'])
</head>
<body>
    <div id="admin-app"></div>
</body>
</html>
