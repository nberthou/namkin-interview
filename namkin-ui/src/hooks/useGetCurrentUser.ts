import { useGetCurrentUserQuery } from "../slices/apiSlice";

export const useGetCurrentUser = () => {
  const { data: currentUser } = useGetCurrentUserQuery();

  return currentUser;
};
