import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth }) {
    const {data, setData, post, errors} = useForm({
        name: '',
        status: '',
        description: '',
        due_date: '',
    })

    const onSubmit = (e) => {
        e.preventDefault()

        post(route('task.store'))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create New Task</h2>}
        >
            <Head title="Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                             <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div>
                                    <InputLabel htmlFor="task_name" value="Task Name" />
                                    <TextInput id="task_name" type="text" name="name" value={data.name} className="mt-1 block w-full" isFocused={true} onChange={(e) => setData("name", e.target.value)} />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_description" value="Task Description" />
                                    <TextAreaInput id="task_description" name="description" value={data.description} className="mt-1 block w-full" onChange={(e) => setData("description", e.target.value)} />
                                    <InputError message={errors.description} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                                    <TextInput id="task_due_date" type="date" name="due_date" value={data.due_date} className="mt-1 block w-full" onChange={(e) => setData("due_date", e.target.value)} />
                                    <InputError message={errors.due_date} className="mt-2"/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="task_status" value="Task Status" />
                                    <SelectInput id="task_status" name="status" value={data.status} className="mt-1 block w-full" onChange={(e) => setData("status", e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2"/>
                                </div>
                                <div className="mt-4 text-right">
                                    <Link href={route("task.index")} className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">Cancel</Link>
                                    <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Submit</button>
                                </div>
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}