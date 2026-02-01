export const en = {
    auth: {
        login: {
            action: "Login",
            header: "Log into your account",
            email: {
                title: "Email",
                placeholder: "Enter your email address"
            },
            password: {
                title: "Password",
                placeholder: "Enter your password",
            },
            errors: {
                failure: "Login failed"
            },
            reset: "Reset"
        },
        register: {
            action: "Register",
            message: "Register a new account",
        }
    },
    navbar: {
        spacedRepetition: "Spaced Repetition",
        aiAssistance: "AI Assistance",
        trustworthyAnswers: "Trustworthy Answers",
    },
    footer: {
        sections: [
            {
                title: "About Us",
                links: [
                    "About Memoria",
                    "About Spaced Repetition",
                    "About Large Language Models (LLMs)",
                    "About using credible sources",
                ]
            },
            {
                title: "Features",
                links: [
                    "Flashcards",
                    "Decks",
                    "Shared Decks",
                    "Statistics",
                ]
            },
        ],
        copyright: "© 2025 Memoria, Inc."
    },
    landing: {
        hero: {
            headline: "Study efficiently with spaced repetition and trustworthy AI assistance",
            subheadline: "Enhance your education process using a scientifically proven memorization method, and get immediate help from the AI-assistant, whose replies are based solely on trustworthy information.",
            cta: "Get Started",
        },
        spacedRepetition: {
            headline: "Spaced Repetition",
            subheadline: "Learn more efficiently with scientifically proven <b>spaced repetition</b> memorization method. Create <b>flashcards</b>, organize them into <b>decks</b>, or add <b>shared decks</b> created by other learners into your collection. The system schedules reviews at optimal intervals, helping you retain knowledge longer with less effort.",
            cta: "Try It Out",
        },
        AIAssistance: {
            headline: "AI Assistance",
            subheadline: "Interact with an AI tutor that is always ready to give you detailed answers on all of your questions. There is no interruption of the learning process — you get your answers <b>immediately</b>, and focus on <b>understanding</b> rather than bland memorization of the study material.",
            cta: "Check It Out",
        },
        trustworthyAnswers: {
            headline: "Trustworthy Answers",
            subheadline: "All AI responses are based solely upon real educational resources, such as textbooks and methodological guidelines, ensuring <b>accuracy</b> of the information provided to the student, and <b>eliminating AI hallucinations</b>.",
            cta: "Let's begin",
        },
        sharedDecks: {
            headline: "Popular Shared Decks",
            subheadline: "Here are shared decks popular among other learners. Make sure to check them out!",
        }
    },
    validation: {
        fields: {
            email: "Email",
            password: "Password",
        },
        rules: {
            required: "{fieldName} is required",
            minLength: "{fieldName} must be at least {minLength} characters long",
            email: "Email address is invalid",
            between: "{fieldName} must be between {min} and {max}",
        }
    }
};