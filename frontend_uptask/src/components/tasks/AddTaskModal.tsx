import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import type { TaskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
    const navigate = useNavigate()
    // Hook to get the current location
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const show = modalTask === 'true' ? true : false


    //Obtain projectId from the URL
    //const projectId = queryParams.get('projectId')
    const params = useParams()
    const projectId = params.projectId!

    const initialValues: TaskFormData = {
        name: "",
        description: "",
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const handleCreateTask = (FormData: TaskFormData) => {
        //console.log("Creating task with data:", FormData);
        const data = {
            formData: FormData,
            projectId: projectId
        }
        //console.log("Data to send:", data);
        mutate(data);

    }

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(`Error creating task: ${error instanceof Error ? error.message : 'Unknown error'}`);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
            toast.success(data)
            reset()
            // Close the modal after creating the task
            navigate(location.pathname, { replace: true });
        }
    })

    return (
        <>
            <Transition appear show={show} as={Fragment}>
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
                                        New Task
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill the form and  {''}
                                        <span className="text-fuchsia-600">create a task</span>
                                    </p>
                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        noValidate
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />
                                        <input
                                            type="submit"
                                            value="Create Task"
                                            className="bg-fuchsia-600 text-white font-bold uppercase rounded-lg px-5 py-3 mt-5 w-full hover:cursor-pointer hover:bg-fuchsia-700 transition-colors"
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}