import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
        toast.error(error.message);
    },
        onSuccess: (data) => {
            console.log(data);
            toast.success(data);
            setToken(""); // Reset token after successful confirmation
        }
});

    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token);
    }

    const handleComplete = (token: ConfirmToken["token"]) => {
        console.log("Token complete:", token);
        mutate({ token });
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirm your account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Enter your 6 digit code received {''}
                <span className=" text-fuchsia-500 font-bold"> via email</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >6 digit code</label>
                <div className="flex justify-center mt-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 mx-2 rounded-lg border-fuchsia-600 placeholder-white shadow border" />
                        <PinInputField className="w-10 h-10 p-3 mx-2 rounded-lg border-fuchsia-600 placeholder-white shadow border" />
                        <PinInputField className="w-10 h-10 p-3 mx-2 rounded-lg border-fuchsia-600 placeholder-white shadow border" />
                        <PinInputField className="w-10 h-10 p-3 mx-2 rounded-lg border-fuchsia-600 placeholder-white shadow border" />
                        <PinInputField className="w-10 h-10 p-3 mx-2 rounded-lg border-fuchsia-600 placeholder-white shadow border" />
                        <PinInputField className="w-10 h-10 p-3 mx-2 rounded-lg border-fuchsia-600 placeholder-white shadow border" />
                    </PinInput>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/new-code'
                    className="text-center text-gray-300 font-normal"
                >
                    ask for a new code
                </Link>
            </nav>

        </>
    )
}