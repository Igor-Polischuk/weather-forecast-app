import { useNavigate } from "react-router-dom";
import { useCurrentUserLazyQuery, useLoginMutation } from "@/gql";

export function useLogin() {
    const [login, { loading, error }] = useLoginMutation();
    const [_, {refetch}] = useCurrentUserLazyQuery();
    const navigate = useNavigate();

    const onSubmit = async (inputData: { email: string, password: string }) => {
        try {
            const data = await login({ variables: inputData });
            data.data?.login.accessToken
            localStorage.setItem('token', data.data?.login.accessToken || "");
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