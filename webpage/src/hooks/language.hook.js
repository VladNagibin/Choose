import i18next from "i18next";
import { useCallback, useEffect, useState } from "react"

export const UseLanguage = () => {
    const [language, setLanguage] = useState('ru')
    const [readyLanguage, setReady] = useState(false)

    const changeLanguage = useCallback((language) => {
        i18next.changeLanguage(language);
        setLanguage(language)
        localStorage.setItem('choose-language', JSON.stringify({
            language: language
        }))
    }, [language]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('choose-language'))
        if (data && data.language) {
            changeLanguage(data.language)
        }
        setReady(true)
    }, [changeLanguage])
    return {language,readyLanguage,changeLanguage}

}