import { useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import initializeAuthentication from "../firebase/firebase-init";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/features/user/userSlice";
import { toast } from "sonner";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [reloadLoading, setReloadLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();

  const createUserInDB = (person) => {
    fetch("https://easy-mart-server-sandy.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(person);
      });
  };

  const googleSignIn = (navigate, location) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const person = {
          name: result.user.displayName,
          email: result.user.email,
          role: "user",
        };
        createUserInDB(person);
        toast.success("Logged in!");
        navigate(location);
      })
      .catch((error) => console.log(error.message));
  };

  const createNewUser = async (username, email, password) => {
    setLoading(true);
    const result = await fetch(
      `https://easy-mart-server-sandy.vercel.app/users/${email}`
    );
    const data = await result.json();
    console.log(data);

    if (!data?.user) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: username });
        await sendEmailVerification(auth.currentUser);
        toast.success("Email verification sent");
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("User registered with the same email!");
      setLoading(false);
    }
  };

  const signInUser = (email, password, navigate, location) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user.emailVerified === false) {
          toast.error("User not verified! Please check your mail.");
          setLoading(false);
          return;
        }
        if (result.user.emailVerified === true) {
          const person = {
            name: result.user.displayName,
            email: result.user.email,
            role: "user",
          };
          createUserInDB(person);
          toast.success("Logged in!");
        }

        setLoading(false);
        navigate(location);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        const person = {
          name: user.displayName,
          email: user.email,
        };
        setUser(person);
        getIdToken(user).then((idToken) => {
          dispatch(setToken(idToken));
        });
      }
      setReloadLoading(false);
    });
    return () => unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    googleSignIn,
    user,
    setUser,
    auth,
    signOut,
    createNewUser,
    signInUser,
    loading,
    reloadLoading,
  };
};

export default useFirebase;
