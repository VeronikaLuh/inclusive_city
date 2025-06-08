import { useEffect, useRef, useState } from "react"

const useSpeechToText = (options: any) => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const recognitionRef = useRef<any>(null)

    // Функція для відтворення звуку
    const playSound = (frequency: number, duration: number, type: 'start' | 'stop') => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            if (type === 'start') {
                // Звук включення - зростаючий тон
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.5, audioContext.currentTime + duration)
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
            } else {
                // Звук виключення - спадаючий тон
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
                oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, audioContext.currentTime + duration)
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
            }

            oscillator.type = 'sine'
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + duration)
        } catch (error) {
            console.warn('Не вдалося відтворити звук:', error)
        }
    }

    useEffect(() => {
      // Перевірка, чи підтримується Web Speech API у браузері
      if (!("webkitSpeechRecognition" in window)) {
        console.error("Web speech api is not supported");
        return;
      }

      // Ініціалізація об'єкта розпізнавання мови
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      const recognition = recognitionRef.current;

      // Налаштування параметрів розпізнавання
      recognition.interimResults = options.interimResults || true; // Отримання проміжних результатів під час розпізнавання
      recognition.lang = options.lang || "uk-UA"; // Встановлення мови розпізнавання (українська за замовчуванням)
      recognition.continuous = options.continuous || false; // Якщо true — розпізнавання триває без зупинки

      // Перевірка наявності підтримки граматики (SpeechGrammarList)
      if ("webkitSpeechGrammarList" in window) {
        const grammar =
          "#JSGF v1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
        const speechRecognitionList = new (
          window as any
        ).webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
      }

      // Обробник події отримання результатів розпізнавання
      recognition.onresult = (event: any) => {
        let text = "";
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        setTranscript(text);
      };

      // Обробник помилок під час розпізнавання мови
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      // Обробник події завершення розпізнавання
      recognition.onend = () => {
        setIsListening(false);
        setTranscript("");
      };

      // Функція очистки для зупинки розпізнавання при демонтажі компонента або повторному запуску 
      return () => {
        recognition.stop();
      };
    }, [])

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start()
            playSound(800, 0.2, 'start');
            setIsListening(true)
        }
    }

    const stopListening = () => {
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
        playSound(600, 0.3, 'stop');
        setIsListening(false);
      }
    };

    return {
        isListening,
        transcript,
        startListening,
        stopListening
    }
}

export default useSpeechToText