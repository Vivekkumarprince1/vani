const axios = require('axios');
const translate = require('@vitalets/google-translate-api');

// Get supported languages
exports.getLanguages = async (req, res) => {
    try {
        // This is a simplified languages list for demonstration
        const languages = {
            "en": { "name": "English", "nativeName": "English", "dir": "ltr" },
            "es": { "name": "Spanish", "nativeName": "Español", "dir": "ltr" },
            "fr": { "name": "French", "nativeName": "Français", "dir": "ltr" },
            "de": { "name": "German", "nativeName": "Deutsch", "dir": "ltr" },
            "it": { "name": "Italian", "nativeName": "Italiano", "dir": "ltr" },
            "ja": { "name": "Japanese", "nativeName": "日本語", "dir": "ltr" },
            "ko": { "name": "Korean", "nativeName": "한국어", "dir": "ltr" },
            "pt": { "name": "Portuguese", "nativeName": "Português", "dir": "ltr" },
            "ru": { "name": "Russian", "nativeName": "Русский", "dir": "ltr" },
            "zh-Hans": { "name": "Chinese (Simplified)", "nativeName": "中文 (简体)", "dir": "ltr" },
            "ar": { "name": "Arabic", "nativeName": "العربية", "dir": "rtl" },
            "hi": { "name": "Hindi", "nativeName": "हिन्दी", "dir": "ltr" }
        };

        res.json(languages);
    } catch (error) {
        console.error('Error fetching languages:', error);
        res.status(500).json({ error: 'Failed to fetch languages' });
    }
};

// Translate text using Google Translate API
exports.translateText = async (req, res) => {
    try {
        const { text, targetLanguage } = req.body;

        if (!text || !targetLanguage) {
            return res.status(400).json({ error: 'Text and target language are required' });
        }

        // Convert from Azure format (zh-Hans) to Google format (zh-CN) if needed
        let googleLanguageCode = targetLanguage;
        if (targetLanguage === 'zh-Hans') {
            googleLanguageCode = 'zh-CN';
        } else if (targetLanguage === 'zh-Hant') {
            googleLanguageCode = 'zh-TW';
        }

        const result = await translate(text, { to: googleLanguageCode });

        res.json({
            text: result.text,
            to: targetLanguage
        });
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Failed to translate text' });
    }
}; 