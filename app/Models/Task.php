<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'due_date',
        'status',
        'user_id'
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
