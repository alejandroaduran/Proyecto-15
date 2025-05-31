import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { TaskFormData, Project, Task } from "../types";

type TaskAPI = {
    formData: TaskFormData;
    projectId: Project["_id"];
    taskId: Task["_id"]
}

export async function createTask({ formData, projectId }: Pick<TaskAPI, "formData" | "projectId">) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("Error creating task:", error.response?.data);
            throw new Error(error.response.data.error || "Error creating task");
        }
        throw error;
    }
};

export async function getTaskById({ projectId, taskId }: Pick<TaskAPI, "projectId" | "taskId">) {
    try {
        const url = `projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("Error fetching task:", error.response?.data);
            throw new Error(error.response.data.error || "Error fetching task");
        }
        throw error;
    }
}

