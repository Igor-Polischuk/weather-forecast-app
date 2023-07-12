import { useNavigate } from "react-router-dom";
import { useCurrentUserQuery, useLoginMutation } from "@/gql";

export function useLogin() {
    const [login, { loading, error }] = useLoginMutation();
    const { refetch } = useCurrentUserQuery();
    const navigate = useNavigate();

    const onSubmit = async (inputData: { email: string, password: string }) => {
        try {
            const data = await login({ variables: inputData });
            data.data?.login.access_token
            localStorage.setItem('token', data.data?.login.access_token || "");
            await refetch();
            navigate('/');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return {
        onSubmit, loading, error
    }
}