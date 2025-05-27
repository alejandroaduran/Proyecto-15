import api from "@/lib/axios";
import { dashboardProjectSchema, type Project, type ProjectFormData } from "@/types/index";
import { isAxiosError } from "axios";


export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjects() {
    try {
        const { data } = await api("/projects")
        const response = dashboardProjectSchema.safeParse(data)
        console.log(response)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectsById(id: Project["_id"]) {
    try {
        const { data } = await api(`/projects/${id}`)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type projectAPIType = {
    formData: ProjectFormData,
    projectId: Project["_id"]
}

export async function updateProject({ formData, projectId }: projectAPIType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id: Project["_id"]) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        console.log(data)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}