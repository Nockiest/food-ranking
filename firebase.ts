

import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, updateDoc, collection, onSnapshot , query, DocumentData, QuerySnapshot, getDocs} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { getStorage, ref, uploadBytes,getDownloadURL, StorageReference } from 'firebase/storage';
import { User ,setPersistence,browserSessionPersistence } from 'firebase/auth';
 

const firebaseConfig = {
  apiKey: "AIzaSyCm1KkHTlvokOMXhrtcNqF1rDC_m7C_zbw",
  authDomain: "food-ranking-d391d.firebaseapp.com",
  projectId: "food-ranking-d391d",
  storageBucket: "food-ranking-d391d.appspot.com",
  messagingSenderId: "629245452002",
  appId: "1:629245452002:web:761033414b4d46e1b288bb",
  measurementId: "G-SZ7N4MC030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();
const colRef = collection(db, 'files');
export { db,colRef, auth, provider, storage };
// Create a reference with an initial file path and name

const pathReference = ref(storage, 'files/Another%file_adf_OndřejLukeš hanluk@seznam.cz_7608bb02-0e03-4e94-9703-acb9512ddeb6_ ');

// Create a reference from a Google Cloud Storage URI
const gsReference = ref(storage, 'gs://bucket/files/stars.jpg');

const filesRef = ref(storage, `files/hello_something_OndřejLukeš hanluk@seznam.cz_3f35f6f0-72bc-4f6d-884e-8cdd7b7b6da0_`);

// Get the download URL
export const downloadURLFinder = async (storageRef: StorageReference): Promise<string | null> => {
  try {
    const url = await getDownloadURL(storageRef);
    console.log(url, storageRef);
    return url;
  } catch (error) {
    console.error("Error getting download URL:", error);
    return null;
  }
};

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set successfully");
  })
  .catch((error) => {
    console.error("Error setting session persistence:", error);
  });
export const signInWithGoogle: () => Promise<UserCredential> = () => {

  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result, "xyz");
      const name = result.user?.displayName;
      const email = result.user?.email;
      const profilePic = result.user?.photoURL;
      if (!email || !email.endsWith('zaci.gopat.cz')) {
        // If email domain is not valid, throw an error
        auth.signOut()
        throw new Error('Přihlašte se účtem gymnázia Opatov');
      }
      return result;
    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
      throw error;
    });
};


export const getUserAuthentication = async () => {
  try {
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
    return user as  User | null;
  } catch (error) {
    console.error("Error getting user authentication:", error);
    return null;
  }
};

export const checkUserAccess = async () => {
  try {
    const user = await getUserAuthentication();
    if (user) {
      const userEmail = user.email;
      if (userEmail === 'hanluk@seznam.cz') {
        console.log('User has access to the Firebase database');
        return true;
      } else {
        console.log('User does not have access to the Firebase database');
        return false;
      }
    } else {
      console.log('No user is signed in');
      return false;
    }
  } catch (error) {
    console.error("Error checking user access:", error);
    return false;
  }
};

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('User has signed out');
  }
});

export const fetchPosts = async (): Promise<DocumentData[]> => {
  try {
    const colRef = collection(db, 'Foods');
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(colRef);
    const postsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return postsData;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};