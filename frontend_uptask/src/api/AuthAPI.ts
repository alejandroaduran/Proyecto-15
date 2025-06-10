import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { ConfirmToken, UserRegistrationForm } from "../types";

export async function createAccount(formdata: UserRegistrationForm) {
    try {
        const url = "/auth/create-account";
        const { data } = await api.post<string>(url, formdata);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(formdata: ConfirmToken) {
    try {
        const url = "/auth/confirm-account";
        const { data } = await api.post<string>(url, formdata);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}