import Tts from 'react-native-tts';

Tts.setDefaultLanguage('ja-JP');

const useTts = () =>{
    
    Tts.speak('Hello, world!');
}
const speak = (text)=>{
    Tts.getInitStatus().then(()=>{
        Tts.speak(text);
    })
}
const stopSpeak = ()=>{
    Tts.getInitStatus().then(()=>{
        Tts.stop();
    })
}
export {useTts, speak, stopSpeak} 