import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {ChevronUpIcon, ChevronDownIcon} from "@heroicons/react/16/solid";

export default function Index ({ auth, tasks, success, queryParams = null }) {
    queryParams = queryParams || {}
    const handleDelete = (task) => {
        if(!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }
        router.delete(route('task.destroy', task.id))
    }

    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value
        } else {
            delete queryParams[name]
        }

        router.get(route('task.index', queryParams))
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return
        searchFieldChanged(name, e.target.value)
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field) {
            if(queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            } else {
                queryParams.sort_direction = 'asc'
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc'
        }

        router.get(route('task.index', queryParams))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Task</h2>
                <Link href={route("task.create")} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                    Add new
                </Link>
            </div>}
        >
            <Head title="Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && 
                        (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>)}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th onClick={(e) => sortChanged('id')}>
                                                <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                    ID
                                                    <div>
                                                        <ChevronUpIcon className={"w-4 " + (queryParams.sort_field === 'id' && queryParams.sort_direction === 'asc' ? 'text-white' : '')} />
                                                        <ChevronDownIcon className={"w-4 -mt-2 " + (queryParams.sort_field === 'id' && queryParams.sort_direction === 'desc' ? 'text-white' : '' )}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortChanged('name')}>
                                                <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                    Name
                                                    <div>
                                                    <ChevronUpIcon className={"w-4 " + (queryParams.sort_field === 'name' && queryParams.sort_direction === 'asc' ? 'text-white' : '')} />
                                                        <ChevronDownIcon className={"w-4 -mt-2 " + (queryParams.sort_field === 'name' && queryParams.sort_direction === 'desc' ? 'text-white' : '' )}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="px-3 py-3">Description</th>
                                            <th onClick={(e) => sortChanged('status')}>
                                                <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                    Status
                                                    <div>
                                                    <ChevronUpIcon className={"w-4 " + (queryParams.sort_field === 'status' && queryParams.sort_direction === 'asc' ? 'text-white' : '')} />
                                                        <ChevronDownIcon className={"w-4 -mt-2 " + (queryParams.sort_field === 'status' && queryParams.sort_direction === 'desc' ? 'text-white' : '' )}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortChanged('created_at')}>
                                                <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                    Create Date
                                                    <div>
                                                    <ChevronUpIcon className={"w-4 " + (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'asc' ? 'text-white' : '')} />
                                                        <ChevronDownIcon className={"w-4 -mt-2 " + (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'desc' ? 'text-white' : '' )}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th onClick={(e) => sortChanged('due_date')}>
                                                <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                                                    Due Date
                                                    <div>
                                                    <ChevronUpIcon className={"w-4 " + (queryParams.sort_field === 'due_date' && queryParams.sort_direction === 'asc' ? 'text-white' : '')} />
                                                        <ChevronDownIcon className={"w-4 -mt-2 " + (queryParams.sort_field === 'due_date' && queryParams.sort_direction === 'desc' ? 'text-white' : '' )}/>
                                                    </div>
                                                </div>
                                            </th>
                                            <th className="px-3 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput className="w-full" defaultValue={queryParams.name} placeholder="Task Name" onBlur={e => searchFieldChanged('name', e.target.value)} onKeyPress={e => onKeyPress('name', e)}/>
                                            </th>
                                            <th className="px-3 py-3">
                                                <TextInput className="w-full" defaultValue={queryParams.description} placeholder="Task Description" onBlur={e => searchFieldChanged('description', e.target.value)} onKeyPress={e => onKeyPress('description', e)}/>
                                            </th>
                                            <th className="px-3 py-3">
                                                <SelectInput className='w-full' defaultValue={queryParams.status} onChange={e => searchFieldChanged('status', e.target.value)}>
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tasks.data.map((task) => (
                                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2 text-nowrap">{task.id}</td>
                                            <td className="px-3 py-2">{task.name}</td>
                                            <td className="px-3 py-2">{task.description}</td>
                                            <td className="px-3 py-2 text-nowrap"><span className={"px-2 py-1 rounded text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                            </span></td>
                                            <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link href={route("task.edit", task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">Edit</Link>
                                                <button onClick={(e) => handleDelete(task)} className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}