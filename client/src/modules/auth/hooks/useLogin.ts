import { useNavigate } from "react-router-dom";
import { useCurrentUserLazyQuery, useLoginMutation } from "@/gql";
import { isClickedLogOut } from "@/apollo/user-vars";

export function useLogin() {
    const [login, { loading, error }] = useLoginMutation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, {refetch}] = useCurrentUserLazyQuery();
    const navigate = useNavigate();

    const onSubmit = async (inputData: { email: string, password: string }) => {
        try {
            await login({ variables: inputData });
            await refetch();
            isClickedLogOut(false);
            navigate('/');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return {
        onSubmit, loading, error
    }
}