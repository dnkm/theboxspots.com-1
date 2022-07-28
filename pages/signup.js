import { useState } from 'react';
import styles from '../styles/Signup.module.scss';
import { initializeAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../lib/firebase';
import AuthRouter from '../lib/auth-router';

export default function SignUp() {
    let [error, setError] = useState("");

    const submitForm = async (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;
        let rpassword = e.target.rpassword.value;

        if (password !== rpassword) return setError("Passwords do not match");

        try {
            let auth = initializeAuth(firebaseApp);
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={styles.page}>
            <AuthRouter authed={false} redirect="/app" />

            <div />

            <form className={styles.form} onSubmit={submitForm}>
                <h1>Create an Organization</h1>
                <p>Design your journey with Box Spots</p>

                <h3>{error}</h3>

                <div />

                <input id="email" placeholder='Email' autoCapitalize='none' autoCorrect='none' />

                <input id="password" placeholder='Password' autoCapitalize='none' autoCorrect='none' type="password" />

                <input id="rpassword" placeholder='Retype Password' autoCapitalize='none' autoCorrect='none' type="password" />
            </form >

            <div className={styles.next}>
                <button>
                    <i />
                </button>
            </div>
        </div >
    );
}