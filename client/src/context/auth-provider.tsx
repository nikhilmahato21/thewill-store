import { createContext, useContext, useEffect } from "react";

import useAuth from "@/hooks/api/use-auth";
import { UserType} from "@/types/api.type";

import { useNavigate } from "react-router-dom";
import { PermissionType } from "@/constant";

// Define the context shape
type AuthContextType = {
  user?:UserType,
  error:any;
  isLoading:boolean;
  isFetching:boolean;
  refetchAuth: () => void;
  
  
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
 
  const {
    data:authData,
    error:authError,
    isLoading,
    isFetching,
    refetch:refetchAuth,
  } = useAuth();
  const user = authData?.user;

 
 

  // const permissions = usePermissions(user, workspace);

  // const hasPermission = (permission: PermissionType): boolean => {
  //   return permissions.includes(permission);
  // };


  return (
    <AuthContext.Provider
      value={{
        user,
        error: authError,
        isLoading,
         isFetching,
        refetchAuth
        // navigate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
