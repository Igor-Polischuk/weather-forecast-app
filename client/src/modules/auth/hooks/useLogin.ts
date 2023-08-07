import { useNavigate } from "react-router-dom";
import { useCurrentUserLazyQuery, useLoginMutation } from "@/gql";
import { isClickedLogOut } from "@/apollo/user-vars";
import { ApolloError } from "@apollo/client";


interface IUseLoginReturningType {
    onSubmit: (inputData: {
        email: string;
        password: string;
    }) => Promise<void>;
    loading: boolean;
    error: ApolloError | undefined;
}

export function useLogin(): IUseLoginReturningType {
    const [login, { loading: loginLoading, error }] = useLoginMutation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, { refetch, loading: userLoading }] = useCurrentUserLazyQuery();
    const navigate = useNavigate();
    const loading = loginLoading || userLoading

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