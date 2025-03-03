import { createContext, useContext, useEffect, useState } from 'react';
import { getUserSession } from '../utils/localStorage';

const UserContext = createContext();
const session = getUserSession();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(session ? session.id : undefined)
  const [userEmail, setUserEmail] = useState(session ? session.email : undefined);
  const [userName, setUserName] = useState(session ? session.name : undefined);

  const setUserInContext = () => {
    const session = getUserSession();
    if (session) {
      if (session.id !== userId) {
        setUserId(session.id);
      }

      if (session.name !== userName) {
        setUserName(session.name);
      }

      if (session.email !== userEmail) {
        setUserEmail(session.email);
      }
    }
  };

  const clearUserContext = () => {
      setUserId(undefined);
      setUserEmail(undefined);
      setUserName(undefined);
  }

  return (
    <UserContext.Provider value={{ userId, userEmail, userName, setUserInContext, clearUserContext }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserProvider = () => useContext(UserContext);