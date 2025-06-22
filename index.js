import React, { useState, useEffect, useCallback } from 'react';

// --- Data for the Syllabus and Quizzes ---
// NOTE: This data is expanded for a more comprehensive learning experience.
const grammarSyllabus = [
  {
    id: 'nouns',
    title: 'Nouns: The Building Blocks',
    content: `Nouns represent a person, place, thing, or idea.\n- **Common Nouns:** General names (e.g., city, dog).\n- **Proper Nouns:** Specific names, capitalized (e.g., London, Fido).\n- **Abstract Nouns:** Ideas or concepts (e.g., love, freedom).`,
    quiz: [
      { question: "Which is a proper noun?", options: ["river", "Amazon", "boat"], answer: "Amazon" },
      { question: "What type of noun is 'courage'?", options: ["Concrete", "Abstract", "Proper"], answer: "Abstract" }
    ]
  },
  {
    id: 'pronouns',
    title: 'Pronouns: Replacing Nouns',
    content: `Pronouns stand in for nouns to avoid repetition.\n- **Subject Pronouns:** I, you, he, she, it, we, they.\n- **Object Pronouns:** me, you, him, her, it, us, them.\n- **Possessive Pronouns:** mine, yours, his, hers, ours, theirs.`,
    quiz: [
        { question: "Choose the correct pronoun: 'Give the book to ___.'", options: ["I", "me", "mine"], answer: "me"},
        { question: "In 'She is a doctor,' 'She' is a...", options: ["Subject Pronoun", "Object Pronoun", "Possessive Pronoun"], answer: "Subject Pronoun"}
    ]
  },
  {
    id: 'verbs',
    title: 'Verbs: Words of Action & Being',
    content: `Verbs express actions or a state of being.\n- **Action Verbs:** Show action (e.g., run, think).\n- **Linking Verbs:** Connect a subject to a description (e.g., is, seem).\n- **Helping Verbs:** Help the main verb (e.g., will, have, can).`,
    quiz: [
      { question: "In 'She will go,' what is the helping verb?", options: ["go", "will", "She"], answer: "will" },
      { question: "Which is a linking verb?", options: ["jump", "seems", "write"], answer: "seems" }
    ]
  },
  {
    id: 'adjectives_adverbs',
    title: 'Adjectives & Adverbs: Describing Words',
    content: `They add detail to your sentences.\n- **Adjectives:** Modify nouns (e.g., beautiful flower).\n- **Adverbs:** Modify verbs, adjectives, or other adverbs (e.g., run quickly, very beautiful).`,
    quiz: [
      { question: "In 'He drove quickly,' what is 'quickly'?", options: ["Adjective", "Adverb", "Verb"], answer: "Adverb" },
      { question: "Which word is an adjective in 'The red ball bounced'?", options: ["red", "ball", "bounced"], answer: "red" }
    ]
  },
  {
    id: 'tenses',
    title: 'Tenses: Understanding Time',
    content: `Tenses show when an action happens.\n- **Past Tense:** Happened before (e.g., "I walked.").\n- **Present Tense:** Happens now (e.g., "I walk.").\n- **Future Tense:** Will happen later (e.g., "I will walk.").`,
    quiz: [
      { question: "Which sentence is in the future tense?", options: ["He read the book.", "He will read the book."], answer: "He will read the book." },
      { question: "'They played outside.' is an example of which tense?", options: ["Past", "Present", "Future"], answer: "Past" }
    ]
  },
  {
    id: 'prepositions',
    title: 'Prepositions: Location & Relationship',
    content: `Prepositions show relationships of location, time, or direction.\n- **Examples:** on, in, at, for, to, from, under.\n- **Example Sentence:** "The cat is **under** the table."`,
    quiz: [
      { question: "Which word is a preposition in 'She walked through the door.'?", options: ["walked", "through", "door"], answer: "through" },
      { question: "Complete: 'He will meet me ___ the corner.'", options: ["on", "at", "in"], answer: "at" }
    ]
  },
  {
    id: 'conjunctions',
    title: 'Conjunctions: Joining Words',
    content: `Conjunctions connect words, phrases, and clauses.\n- **Coordinating (FANBOYS):** for, and, nor, but, or, yet, so.\n- **Subordinating:** because, since, although, when.\n- **Example:** "I left **because** I was tired."`,
    quiz: [
        { question: "Which is a coordinating conjunction?", options: ["and", "while", "after"], answer: "and" },
        { question: "Choose the best conjunction: 'He was tired, ___ he went to bed.'", options: ["so", "if", "although"], answer: "so" }
    ]
  },
  {
    id: 'articles',
    title: 'Articles: A, An, The',
    content: `Articles specify the definiteness of a noun.\n- **'A/An' (Indefinite):** For non-specific nouns. 'An' before vowel sounds (e.g., a car, an apple).\n- **'The' (Definite):** For specific nouns (e.g., The car I saw).`,
    quiz: [
      { question: "Which article for '__ university'?", options: ["a", "an", "the"], answer: "a" },
      { question: "Correct: 'I saw __ eagle flying over __ lake.'", options: ["an, the", "a, the", "the, an"], answer: "an, a" }
    ]
  },
    {
    id: 'conditionals',
    title: 'Conditional Sentences',
    content: `Conditionals express cause and effect.\n- **First Conditional:** (if + present, will + verb) - Real future possibility. "If it rains, we will stay inside."\n- **Second Conditional:** (if + past, would + verb) - Unreal present/future. "If I had a million dollars, I would travel the world."`,
    quiz: [
      { question: "Which conditional is for a likely future event?", options: ["First", "Second"], answer: "First" },
      { question: "Complete: 'If I knew the answer, I ___ you.'", options: ["will tell", "would tell", "tell"], answer: "would tell" }
    ]
  },
    {
    id: 'voice',
    title: 'Active and Passive Voice',
    content: `Voice shows if the subject performs or receives the action.\n- **Active Voice:** The subject does the action. "The dog chased the cat."\n- **Passive Voice:** The subject receives the action. "The cat was chased by the dog."`,
    quiz: [
      { question: "Is 'The cake was eaten by the boy.' active or passive?", options: ["Active", "Passive"], answer: "Passive" },
      { question: "Rewrite 'The company hired her' in passive voice.", options: ["She was hired by the company.", "She hired the company."], answer: "She was hired by the company." }
    ]
  }
];

const idioms = [
    { idiom: "Bite the bullet", meaning: "To endure a difficult situation with courage.", example: "He had to bite the bullet and work extra hours to finish the project." },
    { idiom: "Break the ice", meaning: "To initiate a conversation in a social setting.", example: "He told a joke to break the ice at the party." },
    { idiom: "Cost an arm and a leg", meaning: "To be very expensive.", example: "That new sports car must have cost an arm and a leg." },
    { idiom: "Hit the road", meaning: "To begin a journey.", example: "We should hit the road early to avoid traffic." },
    { idiom: "Once in a blue moon", meaning: "Happening very rarely.", example: "I only see my cousin once in a blue moon." }
];

const readingPassages = [
    {
        id: 'tech',
        title: 'The Rise of Artificial Intelligence',
        passage: "Artificial intelligence (AI) is transforming our world at an incredible pace. From powering virtual assistants on our smartphones to enabling self-driving cars, AI's applications are vast. At its core, AI involves creating algorithms that allow computers to learn from data and make intelligent decisions. This technology holds the promise of solving some of humanity's biggest challenges, but it also raises important ethical questions about privacy and job displacement that society must address.",
        questions: [
            { q: "What is the main idea of the passage?", a: "AI is a rapidly growing technology with both benefits and challenges." },
            { q: "According to the passage, AI helps computers to do what?", a: "Learn from data and make decisions." },
            { q: "What is mentioned as a potential downside of AI?", a: "Ethical concerns like privacy and job loss." }
        ]
    }
];

// --- UI Helper Components ---
const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-xl transition-shadow duration-300 ${className}`}>
    {title && <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-800 text-center">{title}</h2>}
    {children}
  </div>
);

const Button = ({ onClick, children, className = '', disabled = false, type = 'button' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    type={type}
    className={`w-full px-6 py-3 rounded-xl text-white font-bold text-lg shadow-lg transition-transform duration-200
     transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2
     ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 focus:ring-indigo-500'}
     ${className}`}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, label, type = 'text' }) => (
  <div>
    {label && <label className="block text-gray-700 text-md font-semibold mb-2">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
    />
  </div>
);

// --- Login & Welcome ---
const LoginScreen = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (name.trim() && age.trim()) {
            onLogin({ name: name.trim(), age: age.trim() });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
            <div className="w-full max-w-md">
                <Card title="English Learning Portal">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input label="Please Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Alex Doe" />
                        <Input label="Please Enter Your Age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 25" type="number" />
                        <div className="pt-4"><Button type="submit" disabled={!name.trim() || !age.trim()}>Enter Portal</Button></div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

const WelcomePopup = ({ studentName, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all scale-100 opacity-100 animate-slide-up">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">Welcome, {studentName}!</h2>
            <p className="text-gray-700 text-lg mb-8">Your English learning journey begins now.</p>
            <Button onClick={onClose} className="px-10 py-3 text-xl">Start Learning</Button>
        </div>
        <style>{`@keyframes fade-in{from{opacity:0}to{opacity:1}} @keyframes slide-up{from{transform:translateY(20px)}to{transform:translateY(0)}} .animate-fade-in{animation:fade-in .3s ease-out forwards} .animate-slide-up{animation:slide-up .4s ease-out forwards}`}</style>
    </div>
);


// --- QUIZ & DASHBOARD ---
const StudentDashboard = ({ student, progress }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Student Progress</h3>
        <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-1">Grammar Quizzes: {progress.completed} of {progress.total}</p>
            <div className="bg-gray-200 rounded-full h-4"><div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%`}}></div></div>
        </div>
        <div className="border-t pt-6"><p className="text-center text-lg text-gray-600">Age: {student.age}</p></div>
    </div>
);

const Quiz = ({ questions, topicTitle, onComplete, onExit }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (option) => {
        const newAnswers = [...userAnswers, option];
        setUserAnswers(newAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsFinished(true);
        }
    };
    
    // This view is shown when the quiz is finished.
    if (isFinished) {
        // Calculate score only once when finished.
        const score = questions.reduce((acc, question, index) => {
            return question.answer === userAnswers[index] ? acc + 1 : acc;
        }, 0);

        return (
            <Card title={`Quiz Results: ${topicTitle}`} className="bg-blue-50">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">You scored:</p>
                    <p className="text-6xl font-extrabold text-indigo-600 my-4">{score} / {questions.length}</p>
                    <Button onClick={() => onComplete(topicTitle)}>Finish Quiz</Button>
                </div>
            </Card>
        );
    }

    // This view is for an active question.
    const currentQuestion = questions[currentQuestionIndex];
    return (
        <Card title={topicTitle} className="bg-indigo-50">
            <div className="flex justify-between items-center mb-4">
                <button onClick={onExit} className="text-gray-600 hover:text-indigo-600 font-semibold">&larr; Go Back</button>
                <p className="text-lg text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
            <p className="text-xl font-semibold text-gray-900 my-4 text-center">{currentQuestion.question}</p>
            <div className="space-y-4">
                {currentQuestion.options.map((option, index) => <button key={index} onClick={() => handleAnswer(option)} className="w-full text-left p-4 bg-white rounded-lg border-2 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50 transition-colors duration-200 font-medium text-lg">{option}</button>)}
            </div>
        </Card>
    );
};

// --- LEARNING SECTIONS ---
const GrammarSection = ({ onQuizStart }) => (
    <div className="space-y-8">
        {grammarSyllabus.map(module => (
            <Card key={module.id} title={module.title}>
                <div className="text-lg text-gray-800 whitespace-pre-line leading-relaxed mb-6">{module.content}</div>
                <Button onClick={() => onQuizStart(module)}>Take Quiz on {module.title}</Button>
            </Card>
        ))}
    </div>
);

const DictationSection = () => {
    const sentences = ["The quick brown fox jumps over the lazy dog.", "Technology has changed the world.", "Reading is a great way to learn new things.", "The sun sets in the west.", "She sells seashells by the seashore.", "Never underestimate the importance of a good education."];
    const [currentSentence, setCurrentSentence] = useState('');
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');

    const newSentence = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        setCurrentSentence(sentences[randomIndex]);
        setUserInput('');
        setFeedback('');
    }, [sentences]);

    useEffect(() => { newSentence(); }, [newSentence]);

    const playAudio = () => {
        if (!currentSentence || window.speechSynthesis.speaking) return;
        const utterance = new SpeechSynthesisUtterance(currentSentence);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const checkAnswer = () => {
        const cleanOriginal = currentSentence.trim().toLowerCase().replace(/[^\w\s]/gi, '');
        const cleanUser = userInput.trim().toLowerCase().replace(/[^\w\s]/gi, '');
        setFeedback(cleanOriginal === cleanUser ? 'Correct! Well done!' : `Not quite. The correct sentence was: "${currentSentence}"`);
    };
    
    return (
        <Card title="Spelling & Dictation">
             <p className="text-lg text-gray-600 mt-1 text-center mb-6">Listen to the sentence and type what you hear.</p>
             <div className="space-y-4">
                 <div className="flex gap-4"><Button onClick={playAudio}>🔊 Play Sentence</Button><Button onClick={newSentence} className="bg-gray-500 hover:bg-gray-600 focus:ring-gray-400">Next Sentence</Button></div>
                 <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Type the sentence here..." className="w-full p-4 border border-gray-300 rounded-lg text-lg min-h-[100px]"/>
                 <Button onClick={checkAnswer}>Check My Answer</Button>
                 {feedback && <p className={`text-center font-bold text-xl p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{feedback}</p>}
             </div>
        </Card>
    );
};

const SpeakingSection = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [feedback, setFeedback] = useState('');
    const sentences = ["The beautiful scenery of the mountains is breathtaking.", "He decided to pursue a career in software development.", "International collaboration is essential for solving global issues."];
    const [currentSentence, setCurrentSentence] = useState(sentences[0]);

    const handleRecord = () => {
        setIsRecording(true);
        setFeedback('');
        setTimeout(() => { setIsRecording(false); setFeedback("Great pronunciation! Your pace was excellent."); }, 3000);
    };

    const nextSentence = () => {
        const currentIndex = sentences.indexOf(currentSentence);
        const nextIndex = (currentIndex + 1) % sentences.length;
        setCurrentSentence(sentences[nextIndex]);
    };
    
    return (
         <Card title="Speaking Practice">
             <p className="text-lg text-gray-600 mt-1 text-center mb-6">Read a sentence aloud and get feedback. (Simulation)</p>
             <p className="text-2xl text-center font-semibold text-indigo-700 p-4 bg-indigo-50 rounded-lg mb-6">"{currentSentence}"</p>
             <div className="flex gap-4"><Button onClick={handleRecord} disabled={isRecording}>{isRecording ? '🎙️ Recording...' : 'Start Recording'}</Button><Button onClick={nextSentence} className="bg-gray-500 hover:bg-gray-600 focus:ring-gray-400">New Sentence</Button></div>
             {feedback && <div className="mt-6"><h3 className="text-xl font-bold text-center mb-2">Feedback</h3><p className="p-4 bg-blue-100 text-blue-800 rounded-lg text-center text-lg">{feedback}</p></div>}
        </Card>
    );
};

const ReadingSection = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (question, answer) => setAnswers({...answers, [question]: answer});
    
    const handleCheck = () => {
        setShowResults(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setShowResults(false);
        // This querySelector is a simple way to clear inputs without complex state management for this specific case.
        document.querySelectorAll('.reading-input').forEach(input => input.value = '');
    };

    return (
        <Card title="Reading Comprehension">
            {readingPassages.map(passage => (
                <div key={passage.id}>
                    <h3 className="text-2xl font-bold text-indigo-800 mb-3">{passage.title}</h3>
                    <p className="text-lg text-gray-800 whitespace-pre-line leading-relaxed mb-6">{passage.passage}</p>
                    {passage.questions.map((q, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-semibold text-lg">{index + 1}. {q.q}</p>
                            <input type="text" onChange={(e) => handleAnswer(q.q, e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-lg reading-input" placeholder="Type your answer here..." disabled={showResults}/>
                            {showResults && <p className={`text-sm mt-1 ${answers[q.q]?.trim().toLowerCase() === q.a.toLowerCase() ? 'text-green-600' : 'text-red-600'}`}>Correct Answer: {q.a}</p>}
                        </div>
                    ))}
                </div>
            ))}
            <Button onClick={showResults ? handleRetry : handleCheck}>{showResults ? 'Try Again' : 'Check Answers'}</Button>
        </Card>
    );
};

const IdiomsSection = () => (
    <Card title="Idioms & Phrases">
        <div className="space-y-6">
        {idioms.map(item => (
            <div key={item.idiom} className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="text-xl font-bold text-indigo-800">{item.idiom}</h3>
                <p className="text-lg text-gray-700 mt-1"><strong>Meaning:</strong> {item.meaning}</p>
                <p className="text-md text-gray-600 mt-1 italic"><strong>Example:</strong> "{item.example}"</p>
            </div>
        ))}
        </div>
    </Card>
);


// --- Main App Component ---
function App() {
    const [studentInfo, setStudentInfo] = useState(null);
    const [activeSection, setActiveSection] = useState('grammar');
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [completedQuizzes, setCompletedQuizzes] = useState([]);
    const [showWelcome, setShowWelcome] = useState(false);

    const handleLogin = (info) => { setStudentInfo(info); setShowWelcome(true); };
    const handleQuizStart = (quizModule) => { setActiveQuiz({ ...quizModule }); };
    const handleQuizComplete = (quizTitle) => {
        if (!completedQuizzes.includes(quizTitle)) { setCompletedQuizzes([...completedQuizzes, quizTitle]); }
        setActiveQuiz(null);
    };
    
    const renderSection = () => {
        if (activeQuiz) return <Quiz {...activeQuiz} onComplete={handleQuizComplete} onExit={() => setActiveQuiz(null)} />;
        switch (activeSection) {
            case 'dictation': return <DictationSection />;
            case 'speaking': return <SpeakingSection />;
            case 'reading': return <ReadingSection />;
            case 'idioms': return <IdiomsSection />;
            case 'grammar':
            default: return <GrammarSection onQuizStart={handleQuizStart} />;
        }
    };
    
    if (!studentInfo) return <LoginScreen onLogin={handleLogin} />;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {showWelcome && <WelcomePopup studentName={studentInfo.name} onClose={() => setShowWelcome(false)} />}
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-700">English Learning Portal</h1>
                    <div className="text-right"><span className="font-semibold text-gray-800">{studentInfo.name}</span><span className="text-gray-500 text-sm"> (Age: {studentInfo.age})</span></div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <nav className="flex flex-wrap gap-2 mb-8">
                        {['grammar', 'dictation', 'speaking', 'reading', 'idioms'].map(section => (
                            <button key={section} onClick={() => setActiveSection(section)} className={`flex-1 capitalize px-3 py-3 text-base font-bold rounded-lg transition-all duration-200 ${activeSection === section ? 'bg-indigo-700 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}>
                                {section.replace('_', ' & ')}
                            </button>
                        ))}
                    </nav>
                    {renderSection()}
                </div>
                <div className="lg:col-span-1">
                    <StudentDashboard student={studentInfo} progress={{ completed: completedQuizzes.length, total: grammarSyllabus.length }}/>
                </div>
            </main>
        </div>
    );
}

export default App;
