const axios = require('axios');

// Get supported languages
exports.getLanguages = async (req, res) => {
    try {
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

// Translate text using Azure Translator
exports.translateText = async (req, res) => {
    try {
        const { text, targetLanguage } = req.body;

        if (!text || !targetLanguage) {
            return res.status(400).json({ error: 'Text and target language are required' });
        }

        const subscriptionKey = process.env.AZURE_TRANSLATOR_KEY;
        const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT; // e.g., https://api.cognitive.microsofttranslator.com
        const region = process.env.AZURE_TRANSLATOR_REGION;     // e.g., eastus

        const response = await axios({
            baseURL: `${endpoint}/translate`,
            method: 'post',
            params: {
                'api-version': '3.0',
                'to': targetLanguage
            },
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Ocp-Apim-Subscription-Region': region,
                'Content-type': 'application/json'
            },
            data: [{ Text: text }]
        });

        const translatedText = response.data[0]?.translations[0]?.text;

        res.json({
            text: translatedText,
            to: targetLanguage
        });
    } catch (error) {
        console.error('Error translating text:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to translate text' });
    }
};
