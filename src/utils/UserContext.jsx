import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/utils/firebaseConfig'; // Firebase 초기화 파일
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Utility function to generate a default user object
const createDefaultUser = (firebaseUser, username, userId) => ({
  id: userId, // Use the auto-incremented user ID
  username: username || firebaseUser.displayName || 'again',
  description: '모두의 지속가능한 옷장!',
  exchanges: 0,
  height: 170,
  weight: 60,
  length: 260,
  liked_clothes: [],
  liked_parties: [],
  my_clothes: [],
  profile_picture: firebaseUser.photoURL || '',
  show_body_size: true,
  tickets: 0,
});

// Function to create a new user with auto-incremented ID
export const createNewUserWithIncrementedId = async (firebaseUser, username) => {
  const counterDocRef = doc(db, 'counters', 'userIdCounter'); // A document to track the last used ID
  const counterDoc = await getDoc(counterDocRef);

  let newUserId = 5; // Default ID value

  if (counterDoc.exists()) {
    // Increment the user ID based on the last value in the counter
    newUserId = counterDoc.data().lastUserId + 1;
    
    // Update the counter document
    await updateDoc(counterDocRef, { lastUserId: newUserId });
  } else {
    // If counter document doesn't exist, create it with the first ID
    await setDoc(counterDocRef, { lastUserId: newUserId });
  }

  // Create the default user object with the new ID
  const newUser = createDefaultUser(firebaseUser, username, newUserId);

  // Save the user in Firestore
  const userDocRef = doc(db, 'User', firebaseUser.uid);
  await setDoc(userDocRef, newUser);

  return newUser;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userClothes, setUserClothes] = useState([]);   // 유저가 넣어둔 옷들 (지금 api가 등록된 옷/안등록된 옷 구분을 안 함)
  const [loading, setLoading] = useState(true);
  const [userLoaded, setUserLoaded] = useState(false);  // Track when user is fully loaded

  // Function to fetch user's clothes
  const fetchUserClothes = async (userId) => {
    try {
      //const response = await axios.get(`http://68.183.225.136:3000/cloth/user/${userId}`);
      const response = await axios.get(`http://68.183.225.136:3000/cloth/user/1`);  // 1번을 제외한 api가 터짐 (코드500)

      console.log("user clothes fetched: ", response.data);
      setUserClothes(response.data);
    } catch (error) {
      console.error('Error fetching user clothes:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'User', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Merge Firestore data with Firebase Auth data
            setUser({ ...firebaseUser, ...userDoc.data() });
          } else {
            // Create new user in Firestore
            const newUser = await createNewUserWithIncrementedId(firebaseUser);
            setUser(newUser);
          }

        } catch (error) {
          console.error('Error fetching or creating user:', error);
          alert('사용자 정보를 불러오는 데 실패했습니다.');
          setUser(null); // Fallback to null user on error
        }
      } else {
        setUser(null);
        setUserClothes([]); // Clear clothes on logout
      }
      setUserLoaded(true);  // Set userLoaded to true after user data is fetched or logged out
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.id && userLoaded) {
      // Fetch user's clothes only if the user is loaded
      fetchUserClothes(user.id);
    }
  }, [user, userLoaded]);  // This runs after the user is loaded and the user state is updated


  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserClothes([]); // Clear clothes on logout
      console.log('로그아웃 했습니다.');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, userClothes, fetchUserClothes, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

