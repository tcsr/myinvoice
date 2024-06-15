import { createContext, useState, useEffect, useContext } from 'react';

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userRole, setUserRole] = useState("");

  const updateUserProfile = (profile) => {
    setUserProfile(profile);
    setUserRole(profile.userRole || 'Invoice Admin');
  };

  return (
    <UserDetailsContext.Provider value={{ userProfile, userRole, updateUserProfile }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

// Hook to use the user details context
export const useUserDetails = () => useContext(UserDetailsContext);

export default UserDetailsProvider;
