// ===========================
// Firebase Inicialización
// ===========================
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";

import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    getDoc, 
    getDocs, 
    getFirestore, 
    setDoc 
} from "firebase/firestore";

// Configuración con variables de entorno Vite
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

auth.useDeviceLanguage();


// =====================================
//    AUTENTICACIÓN (async/await)
// =====================================

export async function crearUsuario(email, password) {
    try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Credenciales:", cred);
        return cred.user;
    } catch (error) {
        console.error(error.code, error.message);
        throw error;
    }
}

export async function loginEmailPass(email, password) {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login:", cred);
        return cred.user;
    } catch (error) {
        console.error(error.code, error.message);
        throw error;
    }
}

export async function logearG() {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Login Google:", result);
        return result.user;
    } catch (error) {
        console.error("Google Login Error:", error);
        throw error;
    }
}


// =====================================
//  FIRESTORE: CRUD USUARIOS (async/await)
// =====================================

export async function crearUsuarioEnFirebase(name, imagen, age, email, country) {
    try {
        const docRef = await addDoc(collection(db, "usuarios"), {
            name,
            imagen,
            age,
            email,
            country
        });
        console.log("Usuario creado con ID:", docRef.id);
        return docRef;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}

export async function obtenerUsuarios() {
    try {
        const querySnapshot = await getDocs(collection(db, "usuarios"));

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}

export async function obtenerUsuarioEnFirebase(id) {
    try {
        const docRef = doc(db, "usuarios", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error("El usuario no existe");
        }

        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
    }
}

export async function editarUsuario(usuario) {
    try {
        if (!usuario?.id) {
            throw new Error("ID de usuario inválido");
        }

        await setDoc(doc(db, "usuarios", usuario.id), usuario);
        console.log("Usuario actualizado");
        return true;
    } catch (error) {
        console.error("Error al editar usuario:", error);
        throw error;
    }
}

export async function eliminarUsuario(id) {
    try {
        await deleteDoc(doc(db, "usuarios", id));
        console.log("Usuario eliminado");
        return true;
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
}
