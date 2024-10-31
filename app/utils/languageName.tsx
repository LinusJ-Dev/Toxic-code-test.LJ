const languageMap: { [key: string]: string } = {
    'en': 'English',
    'fr': 'French',
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    // Add more language codes and names as needed
};

export default function getLanguageName(code: string) {
    return languageMap[code] || `Unknown language (${code})`;
}