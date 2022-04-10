import firebaseApp from "../components/lib/firebase"
import { getFirestore, collection, addDoc  } from "firebase/firestore";


const db = getFirestore(firebaseApp);
try {
  const docRef = addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
		born: 1815,
		karo: 'jan',
		karo: 'jan'
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
export {firebaseApp, db }