import React, { useState , useEffect } from 'react'

const GoogleTranslate = () => {


    const [clickCount, setClickCount] = useState(0);

    const googleTranslateElementInit = () => {

        if (window.google && window.google.translate) {
            const existingElement = document.getElementById('google_translate_element');
            if (existingElement && !existingElement.querySelector('.skiptranslate')) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        autoDisplay: false,
                    },
                    'google_translate_element'
                );
            }
        }
    };

    useEffect(() => {

        const existingScript = document.getElementById('google-translate-script');
        if (!existingScript) {
            const addScript = document.createElement('script');
            addScript.setAttribute('id', 'google-translate-script');
            addScript.setAttribute(
                'src',
                '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
            );
            document.body.appendChild(addScript);
            window.googleTranslateElementInit = googleTranslateElementInit;
        }

        return () => {
            const script = document.getElementById('google-translate-script');
            if (script) {
                document.body.removeChild(script);
                delete window.googleTranslateElementInit;
            }
        };
    }, []);

    return (
        <>
            <div onClick={() => {
                setClickCount(prev => prev + 1)
                if (clickCount % 1 === 0 && clickCount !== 0) {
                    window.location.reload();
                }
            }}>
                <div id="google_translate_element"></div>
            </div>
        </>
    )
}

export default GoogleTranslate