import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import type { TaskformData, Task } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
    data: Task
    taskId: Task["_id"]
}

export default function EditTaskModal({ data, taskId }: EditTaskModalProps) {

    const navigate = useNavigate()

    const Params = useParams()
    const projectId = Params.projectId!

    const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskformData>({
        defaultValues: {
            name: data.name,
            description: data.description,
        }
    })
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
            queryClient.invalidateQueries({ queryKey: ['tasks', taskId] });
            toast.success(data);
            reset();
            navigate(location.pathname, { replace: true });
        }
    })

    const handleEditTask = (formData: TaskformData) => {
        const data = {
            projectId,
            taskId,
            formData
        }
        console.log("Editing task with data:", data);
        mutate(data)
    }


    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Edit Task
                                </Dialog.Title>

                                <p className="text-xl font-bold">Make changes to a Task on {''}
                                    <span className="text-fuchsia-600">this form</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >

                                    <TaskForm
                                        register={register}
                                        errors={errors}
                                    />

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Task'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}