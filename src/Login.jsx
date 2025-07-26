// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import {SiConvertio, SiGoogle} from 'react-icons/si'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const VALID_USERS = [
    { email: 'username1234@example.com', password: 'Password1234' },
    { email: 'djohn@gmail.com', password: 'password' },
    { email: 'jane@example.com', password: 'secure456' }
]

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)
    const [showGoogleModal, setShowGoogleModal] = useState(false)

    // const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const user = VALID_USERS.find(u => u.email === email && u.password === password)
        if (user) {
            localStorage.setItem('isAuthenticated', 'true')
            if (remember) localStorage.setItem('rememberMe', 'true')
            window.location.href = '/';
            // navigate('/', { replace: true })
        } else {
            alert('Invalid credentials')
        }
    }

    const handleGoogleSignIn = () => {
        setShowGoogleModal(true)
    }

    const handleSelectGoogleUser = user => {
        // Simulate Google authentication
        localStorage.setItem('isAuthenticated', 'true')
        if (remember) localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('userEmail', user.email)
        setShowGoogleModal(false)
        // navigate('/', { replace: true })
        window.location.href = '/';
    }

    const handleForgot = e => {
        e.preventDefault()
        // Prepopulate with the first valid user's credentials
        const { email: demoEmail, password: demoPass } = VALID_USERS[0]
        setEmail(demoEmail)
        setPassword(demoPass)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <header className={styles.header}>
                    <SiConvertio className={styles.logo}/>
                    <h1 className={styles.title}>DJohn's Voice App</h1>
                </header>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label className={styles.label} htmlFor="password">Password</label>
                    <div className={styles.passwordContainer}>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className={styles.toggleButton}
                            onClick={() => setShowPassword(prev => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <BsEyeSlash/> : <BsEye/>}
                        </button>
                    </div>

                    <div className={styles.options}>
                        <label className={styles.rememberMe}>
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(prev => !prev)}
                            /> Remember me
                        </label>
                        <a href="#" className={styles.forgot} onClick={handleForgot}>
                            Forgot?
                        </a>
                    </div>

                    <button type="submit" className={styles.submit}>Log In</button>
                </form>
                <div className={styles.footer}>
                    <button
                        disabled={true}
                        type="button"
                        className={styles.googleButton}
                        // onClick={handleGoogleSignIn}
                        onClick={() => {}}
                        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                        <img
                            src="/assets/google.png"
                            alt="Google logo"
                            className={styles.googleLogo}
                            style={{width: '20px', marginRight: '8px'}}
                        />
                        Sign in with Google
                    </button>
                </div>

                {showGoogleModal && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <SiGoogle size={24} color="#4285f4" style={{ marginRight: '8px' }} />
                                <h2>Select an account</h2>
                            </div>
                            <ul className={styles.modalList}>
                                {VALID_USERS.map(u => (
                                    <li key={u.email} className={styles.modalItem}>
                                        <button
                                            onClick={() => handleSelectGoogleUser(u)}
                                            className={styles.modalButton}
                                        >
                                            <img
                                                src="/assets/google.png"
                                                alt=""
                                                className={styles.modalIcon}
                                            />
                                            {u.email}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={() => setShowGoogleModal(false)}
                                className={styles.modalCancel}
                            >Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login