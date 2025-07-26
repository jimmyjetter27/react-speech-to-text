// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import useClipboard from 'react-use-clipboard'
import { BiSolidCopyAlt } from 'react-icons/bi'
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs'
import { SiConvertio } from 'react-icons/si'
import { jsPDF } from 'jspdf'
import styles from './app.module.css'
// import 'regenerator-runtime/runtime';

const App = () => {
    const navigate = useNavigate()
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition()
    const [isCopied, setCopied] = useClipboard(transcript, { successDuration: 1000 })
    const [showBraveWarning, setShowBraveWarning] = useState(false)

    // Log transcript updates for debugging
    useEffect(() => {
        console.log('Transcript updated:', transcript)
    }, [transcript])

    // Detect Brave browser to warn about Web Speech API
    useEffect(() => {
        if ('brave' in navigator && navigator.brave.isBrave) {
            navigator.brave.isBrave().then(isBrave => {
                if (isBrave) setShowBraveWarning(true)
            })
        }
    }, [])

    const startListening = () => {
        console.log('Start listening')
        SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
    }
    const stopListening = () => {
        console.log('Stop listening')
        SpeechRecognition.stopListening()
    }
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
                <h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    DJohn's Voice App <SiConvertio className={styles.headIcon} />
                </h1>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>

            {showBraveWarning && (
                <div className={styles.warning}>
                    It looks like you’re using Brave browser. Brave’s privacy shields can block the Web Speech
                    API, preventing transcription. For best results, disable shields for this site or use Chrome
                    or Edge.
                </div>
            )}

            {listening && <div className={styles.recordingIndicator}>● Recording...</div>}

            <div className={styles.canvas}>
                <p className={styles.prompt}>
                    Click “Start” and speak; once you stop, your transcript will appear below.
                </p>
                <div className={styles.mainContent}>
                    {transcript || 'Speak now — your words will be transcribed here!!!'}
                </div>
                <div className={styles.btnContainer}>
                    <button onClick={startListening}>
                        <BsFillMicFill /> Start
                    </button>
                    <button onClick={stopListening}>
                        <BsFillMicMuteFill /> Stop
                    </button>
                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : <><BiSolidCopyAlt /> Copy</>}
                    </button>
                    <button onClick={saveAsPDF}>Save as PDF</button>
                    <button onClick={resetTranscript}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default App