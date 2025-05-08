import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
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
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        resetTranscript
    } = useSpeechRecognition()

    const [isCopied, setCopied] = useClipboard(transcript, { successDuration: 1000 })

    // Log transcript updates for debugging
    useEffect(() => {
        console.log('Transcript updated:', transcript)
    }, [transcript])

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
                    DJohn's Voice App <SiConvertio className={styles.headIcon} />
                </h1>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Logout
                </button>
            </div>

            {/* Recording status indicator */}
            {listening && (
                <div className={styles.recordingIndicator}>
                    ● Recording...
                </div>
            )}

            {/* White canvas area */}
            <div className={styles.canvas}>
                <p className={styles.prompt}>
                    Click “Start” and speak; then “Stop” to get your transcript.
                </p>
                <div className={styles.mainContent}>
                    {transcript || 'Your transcript will appear here.'}
                </div>

                {/* Button group inside canvas */}
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