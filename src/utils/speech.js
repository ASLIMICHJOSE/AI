/**
 * Speech synthesis utilities for text-to-speech functionality
 */

let currentUtterance = null;

/**
 * Reads text aloud using Web Speech API
 * @param {string} text - The text to read
 * @param {Object} options - Speech options (rate, pitch, voice, etc.)
 * @returns {Promise<void>}
 */
export const speak = (text, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('Speech synthesis not supported in this browser'));
      return;
    }

    // Cancel any ongoing speech
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set options
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    
    if (options.voice) {
      utterance.voice = options.voice;
    }

    utterance.onend = () => {
      currentUtterance = null;
      resolve();
    };

    utterance.onerror = (event) => {
      currentUtterance = null;
      reject(event);
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Stops any ongoing speech
 */
export const stopSpeaking = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

/**
 * Pauses speech
 */
export const pauseSpeaking = () => {
  if (window.speechSynthesis && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
};

/**
 * Resumes paused speech
 */
export const resumeSpeaking = () => {
  if (window.speechSynthesis && window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
};

/**
 * Gets available voices
 * @returns {Array} - Array of available speech synthesis voices
 */
export const getAvailableVoices = () => {
  if (!window.speechSynthesis) {
    return [];
  }
  return window.speechSynthesis.getVoices();
};

/**
 * Checks if speech is currently active
 * @returns {boolean}
 */
export const isSpeaking = () => {
  return window.speechSynthesis && window.speechSynthesis.speaking;
};

export default {
  speak,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
  getAvailableVoices,
  isSpeaking,
};
