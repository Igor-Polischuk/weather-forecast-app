import { REFRESH_MUTATION } from "@/modules/auth/graphql/mutation/refresh";
import { client } from "./apollo-client";

export const refreshToken = async () => {
  try {
    await client.mutate({
      mutation: REFRESH_MUTATION,
    });
  } catch (error) {
    //
  }
};