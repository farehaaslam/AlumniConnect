import { useState, useEffect } from 'react';

export const useAuthName = () => {
  // Initialize state from localStorage if available
  const [userName, setUserName] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Load saved user name on initial render
  useEffect(() => {
    const savedName = localStorage.getItem('user_name');
    if (savedName) {
      setUserName(savedName);
      setIsLoggedIn(true);
    }
  }, []);

  // Function to set user name after login
  const loginUser = (name: string) => {
    localStorage.setItem('user_name', name);
    setUserName(name);
    setIsLoggedIn(true);
  };

  // Function to clear user name on logout
  const logoutUser = () => {
    localStorage.removeItem('user_name');
    setUserName('');
    setIsLoggedIn(false);
  };

  return { userName, isLoggedIn, loginUser, logoutUser };
};