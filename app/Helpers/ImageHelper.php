<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class ImageHelper
{
    public static function compress(UploadedFile $file, string $folder = 'images', int $quality = 75): string
    {
        $uploadPath = public_path('uploads/' . $folder);
        if (!file_exists($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        $filename = time() . '_' . uniqid() . '.jpg';
        $destination = $uploadPath . '/' . $filename;

        $mime = $file->getMimeType();
        $sourcePath = $file->getRealPath();

        if ($mime === 'image/jpeg' || $mime === 'image/jpg') {
            $source = imagecreatefromjpeg($sourcePath);
        } elseif ($mime === 'image/png') {
            $source = imagecreatefrompng($sourcePath);
            // Convert PNG transparency to white background
            $bg = imagecreatetruecolor(imagesx($source), imagesy($source));
            imagefill($bg, 0, 0, imagecolorallocate($bg, 255, 255, 255));
            imagecopy($bg, $source, 0, 0, 0, 0, imagesx($source), imagesy($source));
            imagedestroy($source);
            $source = $bg;
        } elseif ($mime === 'image/gif') {
            $source = imagecreatefromgif($sourcePath);
        } elseif ($mime === 'image/webp') {
            $source = imagecreatefromwebp($sourcePath);
        } else {
            // Fallback: just move file
            $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadPath, $filename);
            return 'uploads/' . $folder . '/' . $filename;
        }

        // Resize if too large (max 1920px width)
        $origW = imagesx($source);
        $origH = imagesy($source);
        $maxW = 1920;

        if ($origW > $maxW) {
            $ratio = $maxW / $origW;
            $newW = $maxW;
            $newH = (int)($origH * $ratio);
            $resized = imagecreatetruecolor($newW, $newH);
            imagecopyresampled($resized, $source, 0, 0, 0, 0, $newW, $newH, $origW, $origH);
            imagedestroy($source);
            $source = $resized;
        }

        imagejpeg($source, $destination, $quality);
        imagedestroy($source);

        return 'uploads/' . $folder . '/' . $filename;
    }

    public static function delete(string $path): void
    {
        if ($path && file_exists(public_path($path))) {
            unlink(public_path($path));
        }
    }
}
