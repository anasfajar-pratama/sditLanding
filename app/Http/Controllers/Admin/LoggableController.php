<?php

namespace App\Http\Controllers\Admin;

use App\Models\AdminActivityLog;

trait LoggableController
{
    protected function log(string $action, ?string $details = null): void
    {
        AdminActivityLog::log(
            session('admin_id'),
            session('admin_name'),
            $action,
            $details
        );
    }

    protected function logStore(string $entity, string $name): void
    {
        $this->log("create_{$entity}", "Menambahkan {$entity}: {$name}");
    }

    protected function logUpdate(string $entity, string $name): void
    {
        $this->log("update_{$entity}", "Memperbarui {$entity}: {$name}");
    }

    protected function logDelete(string $entity, string $name): void
    {
        $this->log("delete_{$entity}", "Menghapus {$entity}: {$name}");
    }
}
