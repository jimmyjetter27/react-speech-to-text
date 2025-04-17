import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './app.module.css'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from 'react-use-clipboard'
import { BiSolidCopyAlt } from 'react-icons/bi'
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs'
import { SiConvertio } from 'react-icons/si'
import { jsPDF } from 'jspdf'

const App = () => {
    const navigate = useNavigate()
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition()
    const [isCopied, setCopied] = useClipboard(transcript, { successDuration: 1000 })

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-In' })
    const stopListening = () => SpeechRecognition.stopListening()

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('rememberMe')
        navigate('/login', { replace: true })
    }

    if (!browserSupportsSpeechRecognition) {
        return <p>Your browser does not support speech recognition.</p>
    }

    const saveAsPDF = () => {
        const doc = new jsPDF()
        const lines = doc.splitTextToSize(transcript, 180)
        doc.text(lines, 10, 10)
        doc.save('DJohns_Voice_Transcript.pdf')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>DJohn's Voice App <SiConvertio className={styles.headIcon} /></h1>
                <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </div>
            <p>Click start, speak, then stop to get your transcript.</p>
            <div className={styles.mainContent}>
                {transcript}
            </div>
            <div className={styles.btn}>
                <button onClick={startListening}><BsFillMicFill /> Start</button>
                <button onClick={stopListening}><BsFillMicMuteFill /> Stop</button>
                <button onClick={setCopied}>{isCopied ? 'Copied!' : <><BiSolidCopyAlt /> Copy</>}</button>
                <button onClick={saveAsPDF}>Save as PDF</button>
                <button onClick={resetTranscript}>Clear</button>
            </div>
            <div className={styles.links}>
                <a href="https://anotepad.com" target="_blank" rel="noopener noreferrer">Open Online Notepad</a>
            </div>
        </div>
    )
}

export default App