import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const signupAPI = (values) => {
    console.log(values);
    try {
        return new Promise((resovle, reject) => {
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    onAuthStateChanged(auth, (user) => {
                        sendEmailVerification(auth.currentUser)
                            .then(() => {
                                resovle({ message: "Email verfication sent.", user: user });
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                reject({ message: errorCode })
                            })
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode.localeCompare('auth/email-already-in-use') === 0) {
                        reject({ message: 'Already user registered.' })
                    } else if (errorCode.localeCompare('auth/network-request-failed') === 0) {
                        reject({ message: 'please check your internet connection.' })
                    }
                });
        })

    } catch (error) {
        console.log(error);
    }

}

export const loginAPI = (values) => {
    console.log(values);
    return new Promise((resovle, reject) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user.emailVerified) {
                    resovle({ message: "You are successfully login ", user: user });
                    // localStorage.setItem("loginstatus", "true");
                    // naigate('/')
                } else {
                    reject({ message: "Your Email is not Verified..." });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode.localeCompare('auth/wrong-password') === 0) {
                    reject({ message: "password is wrong." })
                } else if (errorCode.localeCompare('auth/user-not-found') === 0) {
                    reject({ message: "Email is not registred" })
                }
            });
    })
}

export const forgetAPI = (values) => {
    console.log(values);
    try {
        return new Promise((resovle, reject) => {
            sendPasswordResetEmail(auth, values.email)
                .then(() => {
                    resovle({ message: "Password reset link sent to your email id." });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    reject({ message: errorCode })
                });
        })
    } catch (error) {
        console.log(error);
    }
}

export const logoutAPI = (values) => {
    return new Promise((resovle, reject) => {
        signOut(auth)
            .then(() => {
                resovle({ message: "Loggout successfully." });
            }).catch((error) => {
                reject({ message: error.errorCode })
            });
    })
}