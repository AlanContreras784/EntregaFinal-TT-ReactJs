// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();


//////////////////////////////////////////////////////////////////////
///////////////// AUTENTICACIÓN DE USUARIOS FIREBASE//////////////////////////
//////////////////////////////////////////////////////////////////////

//const provider = new GoogleAuthProvider();
//const auth = getAuth();


export function crearUsuario(email, password){
    return(
        new Promise((res,rej)=>{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            // Signed up 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user);
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error);
                // ..
            });
        })
    )
    
}

export function loginEmailPass(email, password){

    return(
        new Promise((res,rej)=>{
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log('Credenciales', userCredential);
                const user = userCredential.user;
                console.log(user);
                res(user);
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error);
            });
        }
    )
    )

}


auth.useDeviceLanguage()
export function logearG(){
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log("test", result)
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        console.log("test error", error )
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}
///////////////////////////////////////////////////////////
///////////////////// BASE DE DATOS FIRESTORE  //////// ////////
////////////////////////////////////////////////////////////////

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export function crearUsuarioEnFirebase(name, imagen,age,email,country) {
    return new Promise(async (res, rej) => {
        try {
        const docRef = await addDoc(collection(db, "usuarios"), {
                name: name,
                imagen: imagen,
                age: age,
                email: email,
                country: country
        });

        console.log("Document written with ID: ", docRef.id);
        res(docRef)

        } catch (e) {
        console.error("Error adding document: ", e);
        rej(e)
        }
    });
}

export function obtenerUsuarios() {
    return(
        new Promise(async (res, rej) => {
                try {
                    const querySnapshot = await getDocs(collection(db, "usuarios"));
                    console.log(querySnapshot, "respuesta al getDocs")
                    
                    const resultados = querySnapshot.docs.map(doc => {
                        console.log(doc, "documento sin ejecutar metodo .data()")
                        const data = doc.data();
                        console.log(data, "doc con data extraida")
                        return {
                            id: doc.id,
                            name: data.name,
                            imagen: data.imagen,
                            age: data.age,
                            email: data.email,
                            country: data.country
                        };
                    });

                    res (resultados);
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

export function obtenerUsuarioEnFirebase(id) {
    return(
        new Promise(async (res, rej) => {
                try {
                    const docRef = doc(db, "usuarios", id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        const data = docSnap.data();
                        const usuario = {
                            id: docSnap.id,
                            name: data.name,
                            imagen: data.imagen,
                            age: data.age,
                            email: data.email,
                            country: data.country
                        }
                        console.log(usuario)
                        res(usuario)
                    } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                        rej("No such document!")
                    }
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

export function editarUsuario(usuario){
    return(
        new Promise(async (res, rej) => {
            try{
                if (!usuario || typeof usuario.id !== "string" || usuario.id.trim() === "") {
                    throw new Error("El ID del usuario es inválido o no está definido");
                }
                await setDoc(doc(db, "usuarios", usuario.id), {
                    id:usuario.id,
                    name: usuario.name,
                    imagen: usuario.imagen,
                    age: usuario.age,
                    email: usuario.email,
                    country: usuario.country
                })
                console.log("Document written ");
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }
        })
    )
}

export function eliminarUsuario(id){
    return(
        new Promise(async(res, rej) => {
            try{
                await deleteDoc(doc(db, "usuarios", id))
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }

        })
    )
}
