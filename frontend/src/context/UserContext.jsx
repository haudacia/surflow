

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { getUserToken, getUserSession, setUserSession, removeUserSession } from '../utils/localStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(session ? session.id : undefined)
  const [userEmail, setUserEmail] = useState(session ? session.email : undefined);
  const [userName, setUserName] = useState(session ? session.name : undefined);
  const [userInitials, setUserInitials] = useState(session ? userName.split(" ").map((word) => word[0]) : '')

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
      setUserInitials(userName.split(" ").map((word) => word[0]))
    }
  };

  const clearUserContext = () => {
    setUserId(undefined);
    setUserEmail(undefined);
    setUserName(undefined);
  }

  return (
    <UserContext.Provider value={{ userId, userEmail, userName, setUserInContext, clearUserContext, userInitials }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUserProvider = () => useContext(UserContext);