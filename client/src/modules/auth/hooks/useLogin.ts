/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../graphql/mutation.graphql";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const [login, { loading, error }] = useMutation(LOGIN);
    const navigate = useNavigate();

    const onSubmit = async (inputData: { email: string, password: string }) => {
        try {
            const data = await login({ variables: inputData });
            localStorage.setItem('token', data.data.login.access_token);
            navigate('/')
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return {
        onSubmit, loading, error
    }
}