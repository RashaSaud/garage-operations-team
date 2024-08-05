// import React, { createContext,useEffect, useState } from "react";
// import { _db, auth } from "src/config/config";
// import LogIn from "src/pages/user/login";

// type InitialValuesType = {
//     email: string,
//     password: string;
//     role:string
//   }

//   const initialValues: InitialValuesType = {
//     email: '',
//     password: '',
//     role:''
//   }

// export const AuthContext = createContext(initialValues as any);

// export const AuthProvider = ({ children} :any) => {
//   const [user, setUser] = useState <null|any>({
//     email:'',
//     uid:''
//   });
//   const [load, setLoad] = useState(true);

//   useEffect(() => {
//     const unsub =  auth.onAuthStateChanged( async (user) => {
//       //   const userInfo = _db.collection('dashboard').doc('users').collection('user').doc(user?.uid)
//       //   const doc = await userInfo.get();
//       //  const data =  doc.data()
//       //       setUser({
//       //           ...data,
//       //           email:data?.email,
//       //           role:data?.role,
//       //           uid:user?.uid
//       //       })
            
//       //     setLoad(false)

          
//         });

//         return unsub  
//   }, []);

//   if(load){
//     return <LogIn/>
//   }

//   return (

//     <AuthContext.Provider value={{ user }}>
//        <div>
      
//         {children}
//        </div>
//         </AuthContext.Provider>
//  );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from 'src/config/config';

interface UserContextType {
  user: any | null;
  setUser: (user: any | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};