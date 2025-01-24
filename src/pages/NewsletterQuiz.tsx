import { useState } from 'react';
import bgImage from '../assets/images/newsletter-bg.png';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const NewsletterQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');

  const questions: QuizQuestion[] = [
    {
      question: "What's your primary interest in our newsletter?",
      options: ["Tech Updates", "Industry News", "Career Tips", "All of the above"],
      correctAnswer: "All of the above"
    },
    {
      question: "How often would you like to receive our newsletter?",
      options: ["Weekly", "Bi-weekly", "Monthly", "Daily"],
      correctAnswer: "Weekly"
    },
    {
      question: "Which topics interest you the most?",
      options: ["Frontend Development", "Backend Development", "DevOps", "Full Stack"],
      correctAnswer: "Full Stack"
    }
  ];

  const handleAnswerSubmit = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your newsletter subscription logic here
      console.log('Subscribing email:', email);
      // You can add API call here
      alert('Thanks for subscribing!');
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Newsletter Preference Quiz
          </h1>

          {!showResults ? (
            <div className="space-y-6">
              <div className="bg-white/90 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {questions[currentQuestion].question}
                </h2>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSubmit(option)}
                      className="w-full text-left px-4 py-3 rounded-lg bg-white hover:bg-gray-100 
                               border border-gray-200 transition duration-200 ease-in-out"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-center text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Thanks for completing the quiz!
                </h2>
                <p className="text-gray-600 mb-2">
                  Your Score: {score} out of {questions.length}
                </p>
                <p className="text-gray-600 mb-6">
                  Subscribe to our newsletter to get personalized content.
                </p>
              </div>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 
                             focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                           transition duration-200 ease-in-out font-semibold"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterQuiz;