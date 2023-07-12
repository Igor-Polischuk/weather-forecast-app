/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/gql";

export function useLogin() {
    // const [login, { loading, error }] = useMutation(LOGIN);
    const [login, { loading, error }] = useLoginMutation();
    const navigate = useNavigate();

    const onSubmit = async (inputData: { email: string, password: string }) => {
        try {
            const data = await login({ variables: inputData });
            data.data?.login.access_token
            localStorage.setItem('token', data.data?.login.access_token || "");
            navigate('/')
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return {
        onSubmit, loading, error
    }
}