import { createContext, useContext, useEffect, useState } from 'react';
import { getUserSession } from '../utils/localStorage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();

  useEffect(() => {
    const session = getUserSession();
    if (session) {
      setUserId(session.id);
      setUserName(session.name);
      setUserEmail(session.email);
    }
  }, [userId, userName, userEmail]);

  const setUserInContext = () => {
    const session = getUserSession();
    if (session) {
      if (session.id !== userId) {
        setUserId(session.id);
        // console.log('new userId was set:', session.id);
      }

      if (session.name !== userName) {
        setUserName(session.name);
        // console.log('new userName was set:', session.name);
      }

      if (session.email !== userEmail) {
        setUserEmail(session.email);
        // console.log('new userEmail was set:', session.email);
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