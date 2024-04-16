<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Knuckles\Scribe\Attributes\BodyParam;
use Knuckles\Scribe\Attributes\QueryParam;
use Knuckles\Scribe\Attributes\ResponseField;

/**
 *  @group Task Action 任務操作
 *
 *  APIs for allocate vacation
 */
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

        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }

        if (request('description')) {
            $query->where('description', 'like', "%" . request('description') . '%');
        }

        if (request('status')) {
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
     * 任務列表
     *
     * @response {
     *     "success": true,
     *     "msg": "ok",
     *     "data": [
     *         "data": [
     *             {
     *                 "id": 1,
     *                 "name": "Task 1",
     *                 "description": "Task 1 description",
     *                 "created_at": "2021-09-01 00:00:00",
     *                 "updated_at": "2021-09-01 00:00:00",
     *                 "due_date": "2024-05-03",
     *                 "status": "pending"
     *             }
     *         ]
     *     ]
     * }
     */
    #[QueryParam('sort_field', 'string', '排序欄位, 預設為 created_at 排序', example: 'status')]
    #[QueryParam('sort_field', 'string', '排序方式, 預設為"desc"排', example: "asc")]
    #[QueryParam('name', 'string', '用"name"過濾任務, 預設為空', example: "abc")]
    #[QueryParam('description', 'string', '用"description"過濾任務, 預設為空', example: "abc")]
    #[QueryParam('status', 'string', '用"status"過濾任務, 預設為空', example: "pending")]
    #[ResponseField(name: 'task.id', type: 'string', description: '任務 ID')]
    #[ResponseField(name: 'task.name', type: 'string', description: '任務名稱')]
    #[ResponseField(name: 'task.description', type: 'string', description: '任務描述')]
    #[ResponseField(name: 'task.created_at', type: 'string', description: '任務創建日期')]
    #[ResponseField(name: 'task.updated_at', type: 'string', description: '任務更新日期')]
    #[ResponseField(name: 'task.due_date', type: 'string', description: '任務截止日期')]
    #[ResponseField(name: 'task.status', type: 'string', description: '任務狀態')]
    public function api_index()
    {
        $query = Task::query()->where('user_id', 1);

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . '%');
        }

        if (request('description')) {
            $query->where('description', 'like', "%" . request('description') . '%');
        }

        if (request('status')) {
            $query->where('status', request('status'));
        }

        $tasks = $query->orderBy($sortFields, $sortDirection)->get();

        return TaskResource::collection($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Task/Create');
    }

    /**
     * 任務新增
     *
     * @response {
     *     "success": true,
     *     "msg": "Task "{task_name}" created successfully"
     * }
     */
    #[BodyParam(name: 'name', type: 'string', description: '任務名稱', required: true)]
    #[BodyParam(name: 'description', type: 'string', description: '任務描述')]
    #[BodyParam(name: 'due_date', type: 'string', description: '任務截止日期(Y/m/d)', example: '2025-09-01')]
    #[BodyParam(name: 'status', type: 'string', description: '任務狀態(pending, completed)', example: "pending", required: true)]
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        // $data['user_id'] = auth()->id();
        $data['user_id'] = 1;

        Task::create($data);

        return response()->json(['message' => "Task \"{$data['name']}\" created successfully"]);
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
     * 任務更新
     *
     * @response {
     *     "success": true,
     *     "msg": "Task "{task_name}" updated successfully"
     * }
     */
    #[BodyParam(name: 'name', type: 'string', description: '任務名稱', required: true)]
    #[BodyParam(name: 'description', type: 'string', description: '任務描述')]
    #[BodyParam(name: 'due_date', type: 'string', description: '任務截止日期(Y/m/d)', example: '2025-09-01')]
    #[BodyParam(name: 'status', type: 'string', description: '任務狀態(pending, completed)', example: "pending", required: true)]
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task->update($data);

        return response()->json(['message' => "Task \"{$task['name']}\" updated successfully"]);
    }

    /**
     * 任務刪除
     *
     * @response {
     *     "success": true,
     *     "msg": "Task "{task_name}" deleted successfully"
     * }
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $task->delete();
        return response()->json(['message' => "Task \"{$name}\" deleted successfully"]);
    }
}
