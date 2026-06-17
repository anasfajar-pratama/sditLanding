<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Stat;

class StatController extends Controller
{
    public function index()
    {
        return response()->json(Stat::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|string|max:100',
            'value' => 'required|string|max:50',
        ]);

        $stat = Stat::create([
            'label' => $request->label,
            'value' => $request->value,
            'suffix' => $request->suffix ?? '+',
            'icon' => $request->icon ?? 'users',
            'order' => Stat::count() + 1,
        ]);

        $this->logStore('statistik', $stat->label);

        return response()->json(['message' => 'Stat berhasil ditambahkan.', 'data' => $stat], 201);
    }

    public function update(Request $request, int $id)
    {
        $stat = Stat::findOrFail($id);
        $stat->update($request->only(['label', 'value', 'suffix', 'icon', 'order']));

        $this->logUpdate('statistik', $stat->label);

        return response()->json(['message' => 'Stat berhasil diperbarui.', 'data' => $stat]);
    }

    public function destroy(int $id)
    {
        $stat = Stat::findOrFail($id);
        $label = $stat->label;
        $stat->delete();

        $this->logDelete('statistik', $label);

        return response()->json(['message' => 'Stat berhasil dihapus.']);
    }
}
