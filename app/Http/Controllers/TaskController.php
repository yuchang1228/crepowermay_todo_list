<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query()->where('user_id', auth()->id());

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }

        if(request('description')) {
            $query->where('description', 'like', "%" . request('description') . '%');
        }

        if(request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortFields, $sortDirection)->paginate(10);

        return inertia('Task/Index', [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Task/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        Task::create($data);

        return to_route('task.index')->with('success', "Task \"{$data['name']}\" created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit', [
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task->update($data);

        return to_route('task.index')->with('success', "Task \"{$task->name}\" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        return to_route('task.index')->with('success', "Task \"$name\" deleted successfully");
    }
}
