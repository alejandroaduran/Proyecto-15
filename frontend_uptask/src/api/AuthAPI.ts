import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { type ConfirmToken, type ForgotPasswordForm, type RequestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm, userSchema } from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = "/auth/create-account";
        const { data } = await api.post<string>(url, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(formData: ConfirmToken) {
    try {
        const url = "/auth/confirm-account";
        const { data } = await api.post<string>(url, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = "/auth/request-code";
        const { data } = await api.post<string>(url, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = "/auth/login";
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem("AUTH_TOKEN", data);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = "/auth/forgot-password";
        const { data } = await api.post<string>(url, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = "/auth/validate-token";
        const { data } = await api.post<string>(url, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updatePasswordWithToken({ password, passwordConfirmation, token }: { password: string, passwordConfirmation: string, token: ConfirmToken["token"] }) {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<string>(url, { password, passwordConfirmation });
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api.get("/auth/user");
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}