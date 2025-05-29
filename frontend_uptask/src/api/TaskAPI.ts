import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { TaskFormData, Project } from "../types";

type TaskAPI = {
    formData: TaskFormData;
    projectId: Project["_id"];
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

