import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAppContext {
  onboardingCompleted: boolean;
  user?: {
    token: string;
    name: string;
  };
}

const AppContext = createContext<IAppContext>({
  onboardingCompleted: false,
});

export const isUserLoggedIn = () => {
  const { user } = useContext(AppContext);
  return !!user?.token;
};

export const isUserNotLoggedIn = () => {
  const { user } = useContext(AppContext);
  return !user?.token;
};

export const AppProvider: React.FC<{
  children: ReactNode;
  afterLoad: () => Promise<void>;
}> = ({ children, afterLoad }) => {
  const [user, setUser] = useState();
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('proffy');
      if (data) {
        const { user, onboardingCompleted } = JSON.parse(data);
        setUser(user);
        setOnboardingCompleted(onboardingCompleted);
        await afterLoad();
      }
    })();
  }, []);

  return (
    <AppContext.Provider value={{ user, onboardingCompleted }}>
      {children}
    </AppContext.Provider>
  );
};
