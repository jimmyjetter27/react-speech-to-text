import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { SiConvertio } from 'react-icons/si'

// Predefined valid credentials
const VALID_USERS = [
    { email: 'username1234@example.com', password: 'Password1234' },
    { email: 'jane@example.com', password: 'secure456' }
]

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = VALID_USERS.find(u => u.email === email && u.password === password)
        if (user) {
            console.log('logging in ', user)
            localStorage.setItem('isAuthenticated', 'true')
            if (remember) localStorage.setItem('rememberMe', 'true')
            navigate('/', { replace: true })  // redirect to main page
        } else {
            alert('Invalid email or password')
        }
    }

    return (
        <div className={styles.loginBackground}>
            <div className={styles.card}>
                <SiConvertio className={styles.logoIcon} />
                <h2>{`DJohn's Voice App`}</h2>
                <p className={styles.subtitle}>Log in to access transcript tools and settings</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <div className={styles.rememberMe}>
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={() => setRemember(prev => !prev)}
                        />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit" className={styles.loginButton}>Login</button>
                </form>
                <div className={styles.links}>
                    <a href="https://accounts.google.com" target="_blank" rel="noopener noreferrer">Sign in with Google</a>
                    <a href="https://anotepad.com" target="_blank" rel="noopener noreferrer">Open Online Notepad</a>
                </div>
                <div className={styles.credentials}>
                    <p>Test Credentials:</p>
                    <p><strong>username1234@example.com</strong> / <code>Password1234</code></p>
                    <p><strong>jane@example.com</strong> / <code>secure456</code></p>
                </div>
            </div>
        </div>
    )
}

export default Login