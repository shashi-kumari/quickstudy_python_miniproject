
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/logo';
import Footer from '@/components/layout/Footer';
import UploadArea from '@/components/ui/upload-area';
import { ArrowLeft, ArrowRight, MessageSquare, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary']);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleChatSubmit = () => {
    if (chatInput.trim() === '') {
      toast.error('Please enter instructions first');
      return;
    }
    
    toast.success('Instructions added successfully');
    setShowChat(false);
  };

  const handleGenerateContent = () => {
    if (!selectedFile) {
      toast.error('Please upload a file first');
      return;
    }

    if (selectedOptions.length === 0) {
      toast.error('Please select at least one content type to generate');
      return;
    }

    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      // In a real app, we'd send the file to the backend and process it
      navigate('/results', { 
        state: { 
          fileName: selectedFile.name,
          generatedTypes: selectedOptions,
        } 
      });
    }, 2000);
  };

  const generateOptions = [
    { id: 'summary', label: 'Summary', description: 'Key points from your material' },
    { id: 'flashcards', label: 'Flashcards', description: 'Question & answer cards for testing' },
    { id: 'mindmap', label: 'Mind Map', description: 'Visual connections between concepts' }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-quickstudy-darkbg text-white' : 'bg-gradient-to-br from-white to-purple-50'}`}>
      <div className="container max-w-4xl mx-auto p-6 flex-1 animate-fade-in">
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-quickstudy-text dark:text-white hover:text-quickstudy-purple transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <Logo size="md" />
          <button 
            onClick={toggleDarkMode} 
            className="rounded-full p-2 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
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

        <div className={`rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Background image with overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">Upload Your Study Material</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Upload your notes, PDFs, or presentations to get started</p>

            <div className="mb-8 transition-all hover:scale-102">
              <UploadArea onFileSelected={handleFileSelected} />
              {selectedFile && (
                <div className="mt-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-medium dark:text-white">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button 
                    className="text-red-500 text-sm hover:underline"
                    onClick={() => setSelectedFile(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
              
              <div className="flex justify-center mt-3">
                <button 
                  onClick={() => setShowChat(!showChat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-purple-50 hover:bg-purple-100 text-quickstudy-purple'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Add Custom Instructions</span>
                </button>
              </div>
              
              {showChat && (
                <div className="mt-4 animate-fade-in">
                  <Card className={darkMode ? "bg-gray-700 border-gray-600" : ""}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className={`font-medium ${darkMode ? "text-white" : ""}`}>Custom Instructions</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setShowChat(false)}
                          className={darkMode ? "text-gray-300 hover:text-white" : ""}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Enter specific instructions for processing your document..."
                        className={`min-h-[120px] resize-none mb-3 ${darkMode ? "bg-gray-800 border-gray-600 text-white" : ""}`}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                      />
                      <Button 
                        onClick={handleChatSubmit}
                        className={`w-full ${darkMode ? "bg-quickstudy-indigo hover:bg-quickstudy-indigo/80" : "bg-quickstudy-purple"}`}
                      >
                        Add Instructions
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">What would you like to generate?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generateOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`card-hover-effect border rounded-xl p-4 cursor-pointer transition ${
                      selectedOptions.includes(option.id) 
                        ? darkMode
                          ? 'bg-quickstudy-indigo/20 border-quickstudy-indigo' 
                          : 'bg-quickstudy-purple/5 border-quickstudy-purple'
                        : darkMode
                          ? 'border-gray-600 hover:border-quickstudy-indigo'
                          : 'border-gray-200 hover:border-quickstudy-blue'
                    }`}
                    onClick={() => handleOptionToggle(option.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`font-medium ${darkMode ? "text-white" : ""}`}>{option.label}</h3>
                      <div className={`w-4 h-4 rounded-full border ${
                        selectedOptions.includes(option.id) 
                          ? darkMode
                            ? 'bg-quickstudy-indigo border-quickstudy-indigo' 
                            : 'bg-quickstudy-purple border-quickstudy-purple'
                          : darkMode
                            ? 'border-gray-500'
                            : 'border-gray-300'
                      }`}>
                        {selectedOptions.includes(option.id) && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{option.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right">
                <button 
                  className={`text-sm hover:underline ${darkMode ? "text-quickstudy-indigo" : "text-quickstudy-purple"}`}
                  onClick={() => setSelectedOptions(['summary', 'flashcards', 'mindmap'])}
                >
                  Select All
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleGenerateContent}
                disabled={isLoading || !selectedFile || selectedOptions.length === 0}
                className={`group bg-gradient-main hover:bg-opacity-90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:gap-3 shadow-lg hover:shadow-quickstudy-purple/30 disabled:bg-gray-300 disabled:cursor-not-allowed ${
                  darkMode ? "hover:shadow-quickstudy-indigo/30" : ""
                }`}
              >
                <span>{isLoading ? 'Processing...' : 'Generate Content'}</span>
                {!isLoading && <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Upload;
