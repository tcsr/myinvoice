import { createContext, useState, useEffect } from 'react';

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userDetailsFromStore = JSON.parse(localStorage.getItem('user'));
    if (userDetailsFromStore) {
      setUserProfile(userDetailsFromStore);
      // Assuming userRole is a property of userDetailsFromStore
      setUserRole(userDetailsFromStore.userRole || 'Invoice Admin');
    }
  }, []);

  const updateUserProfile = (profile) => {
    setUserProfile(profile);
    setUserRole(profile.userRole || 'Invoice Admin'); // Update role
    localStorage.setItem('user', JSON.stringify(profile));
  };

  return (
    <UserDetailsContext.Provider value={{ userProfile, userRole, updateUserProfile }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;
