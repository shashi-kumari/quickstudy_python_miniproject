
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/logo';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Lightbulb, Brain, Clock, BookOpen, CheckCircle, Download } from 'lucide-react';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-quickstudy-darkbg text-white' : 'bg-gradient-to-br from-white to-purple-50'}`}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo size="md" />
        <button 
          onClick={toggleDarkMode} 
          className="rounded-full p-2 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="w-full max-w-5xl flex flex-col items-center text-center">
          <div className="mb-6 floating-animation">
            <Logo size="xl" showText={false} />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-4 dark:text-white relative">
            <span className={`${darkMode ? 'text-quickstudy-indigo' : 'gradient-text'}`}>QuickStudy</span>
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-medium mb-6 dark:text-white">
            <span className={`${darkMode ? 'text-quickstudy-coral' : 'text-quickstudy-purple'}`}>Study smart, not hard!</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
            Transform your study materials into easy-to-digest summaries, flashcards, and mind maps in seconds.
          </p>

          <div className="relative mb-12">
            <Link
              to="/upload"
              className="group bg-gradient-main hover:bg-opacity-90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:gap-3 shadow-lg hover:shadow-quickstudy-purple/30 animate-bounce-subtle"
            >
              <span>Start Studying</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="mt-8 mb-16 w-full">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">How QuickStudy Works</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Simple steps to transform your study materials into effective learning tools
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                { 
                  icon: <BookOpen className="w-12 h-12 text-quickstudy-purple" />,
                  title: "Upload Your Materials", 
                  description: "Drop or upload your study materials such as PDFs, PowerPoint presentations, or text files."
                },
                { 
                  icon: <Brain className="w-12 h-12 text-quickstudy-teal" />,
                  title: "Choose Your Study Format", 
                  description: "Select what type of content you want to generate: summaries, flashcards, or mind maps."
                },
                { 
                  icon: <Lightbulb className="w-12 h-12 text-quickstudy-coral" />,
                  title: "Study Effectively", 
                  description: "Review your AI-generated study materials that highlight the most important concepts."
                }
              ].map((step, index) => (
                <div key={index} className={`card-hover-effect p-8 rounded-3xl transition-all ${darkMode ? 'bg-gray-800/70 shadow-lg backdrop-blur-sm' : 'bg-white shadow-xl'} transform hover:-translate-y-2 hover:shadow-2xl`}>
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-purple-50'} mb-4`}>
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-16">
            <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Student studying with laptop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Learn Anywhere</h3>
                  <p className="text-gray-200">Access your study materials on any device, anytime</p>
                </div>
              </div>
            </div>

            <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Effective note-taking" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Minimize Study Time</h3>
                  <p className="text-gray-200">Focus on what matters with AI-powered summary tools</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              { 
                title: 'Smart Summaries', 
                description: 'Condense lengthy materials into key points',
                icon: <CheckCircle className="w-6 h-6 text-quickstudy-green" />
              },
              { 
                title: 'Interactive Flashcards', 
                description: 'Test your knowledge with auto-generated cards',
                icon: <CheckCircle className="w-6 h-6 text-quickstudy-blue" />
              },
              { 
                title: 'Visual Mind Maps', 
                description: 'Visualize connections between concepts',
                icon: <CheckCircle className="w-6 h-6 text-quickstudy-pink" />
              }
            ].map((feature, index) => (
              <div key={index} className={`card-hover-effect rounded-xl p-6 shadow-md ${darkMode ? 'bg-gray-800/70 backdrop-blur-sm' : 'bg-white'} flex items-start`}>
                <div className="mr-3 mt-1">{feature.icon}</div>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : ''}`}>{feature.title}</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
