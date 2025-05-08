import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { SiConvertio } from 'react-icons/si'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const VALID_USERS = [
    { email: 'username1234@example.com', password: 'Password1234' },
    { email: 'jane@example.com', password: 'secure456' }
]

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const user = VALID_USERS.find(u => u.email === email && u.password === password)
        if (user) {
            localStorage.setItem('isAuthenticated', 'true')
            if (remember) localStorage.setItem('rememberMe', 'true')
            // Navigate to root of the app, relative to basename
            navigate('/', { replace: true })
        } else {
            alert('Invalid credentials')
        }
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
                        <a href="#" className={styles.forgot}>Forgot?</a>
                    </div>

                    <button type="submit" className={styles.submit}>Log In</button>
                </form>
                <div className={styles.footer}>
                    {/* Disabled Google button */}
                    <button
                        type="button"
                        className={styles.googleButton}
                        disabled
                        title="Coming soon"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login