
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/logo';
import Footer from '@/components/layout/Footer';
import Flashcard from '@/components/ui/flashcard';
import { ArrowLeft, Book, BookOpen, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";

let summary, flashcards=[], mindmap=[];
let altSummary, altFlashcards, altMindmap;
const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeContent, setActiveContent] = useState('');
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Get the data passed from the Upload page
  const fileName = location.state?.fileName?.name;
  const file = location.state?.fileName ;
  const generatedTypes = location.state?.generatedTypes.join(',') || '';
  console.log("generatedTypes:", generatedTypes);
  fetchResult(file, generatedTypes);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    // Set the initial active tab based on what was generated
    if (generatedTypes && generatedTypes.length > 0) {
      setActiveContent(generatedTypes[0]);
    }
  }, [generatedTypes]);

  // Navigate back to upload page if no data was provided
  useEffect(() => {
    if (!fileName) {
      navigate('/upload');
    }
  }, [fileName, navigate]);

  const handleNextCard = () => {
    setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((currentCardIndex - 1 + flashcards.length) % flashcards.length);
  };

  // Render MindMap node recursively
  const renderMindMapNode = (node: any, level = 0) => {
    return (
      <div key={node.title} className="mb-2" style={{ marginLeft: `${level * 20}px` }}>
        <div className={`font-medium ${level === 0 ? 'text-lg text-quickstudy-purple' : 'text-base'}`}>
          {node.title}
        </div>
        {node.details && <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">{node.details}</p>}
        {node.children && node.children.map((child: any) => renderMindMapNode(child, level + 1))}
      </div>
    );
  };

  const downloadSummary = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fileName || 'summary'}_summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Summary downloaded successfully");
  };

  const downloadFlashcards = () => {
    const content = flashcards.map(card => `Question: ${card.question}\nAnswer: ${card.answer}\n\n`).join('');
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fileName || 'flashcards'}_flashcards.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Flashcards downloaded successfully");
  };

  const downloadMindMap = () => {
    // Convert mindmap to text format for simplicity
    const convertMindMapToText = (nodes: any[], level = 0) => {
      let result = '';
      nodes.forEach(node => {
        result += '  '.repeat(level) + node.title + '\n';
        if (node.details) {
          result += '  '.repeat(level + 1) + '- ' + node.details + '\n';
        }
        if (node.children) {
          result += convertMindMapToText(node.children, level + 1);
        }
      });
      return result;
    };

    const content = convertMindMapToText(mindmap);
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fileName || 'mindmap'}_mindmap.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Mind map downloaded successfully");
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-quickstudy-darkbg text-white' : 'bg-gradient-to-br from-white to-purple-50'}`}>
      <div className="container max-w-4xl mx-auto p-6 flex-1 animate-fade-in">
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 text-quickstudy-text hover:text-quickstudy-purple transition-colors dark:text-white dark:hover:text-quickstudy-blue"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Upload New Material</span>
          </button>
          <div className="flex items-center gap-4">
            <Logo size="md" />
            <button 
              onClick={toggleDarkMode} 
              className="rounded-full p-2 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 md:p-8 transition-all`}>
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 dark:text-white">
              Your Study Material
            </h1>
            <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{fileName || 'Study Material'}</span>
            </div>
          </div>

          <Tabs 
            value={activeContent} 
            onValueChange={setActiveContent}
            className="mb-8"
          >
            <TabsList className="mb-6 grid grid-cols-3 max-w-md mx-auto">
              {generatedTypes && generatedTypes.includes('summary') && (
                <TabsTrigger value="summary" className="dark:data-[state=active]:bg-quickstudy-indigo dark:data-[state=active]:text-white">Summary</TabsTrigger>
              )}
              {generatedTypes && generatedTypes.includes('flashcards') && (
                <TabsTrigger value="flashcards" className="dark:data-[state=active]:bg-quickstudy-indigo dark:data-[state=active]:text-white">Flashcards</TabsTrigger>
              )}
              {generatedTypes && generatedTypes.includes('mindmap') && (
                <TabsTrigger value="mindmap" className="dark:data-[state=active]:bg-quickstudy-indigo dark:data-[state=active]:text-white">Mind Map</TabsTrigger>
              )}
            </TabsList>

            {generatedTypes && generatedTypes.includes('summary') && (
              <TabsContent value="summary">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white">Key Points Summary</h2>
                    <button 
                      onClick={downloadSummary}
                      className="flex items-center gap-2 bg-quickstudy-purple text-white px-3 py-2 rounded-lg hover:bg-quickstudy-purple/90 transition-colors"
                      aria-label="Download summary"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                    {summary}
                  </div>
                </div>
              </TabsContent>
            )}

            {generatedTypes && generatedTypes.includes('flashcards') && (
              <TabsContent value="flashcards">
                <div className="flex flex-col items-center">
                  <Flashcard 
                    question={flashcards[currentCardIndex].question}
                    answer={flashcards[currentCardIndex].answer}
                    className="max-w-md mb-6"
                  />
                  <div className="flex gap-4 items-center mb-6">
                    <button 
                      onClick={handlePrevCard}
                      className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-gray-800 dark:text-white px-4 py-2 rounded-lg transition`}
                    >
                      Previous
                    </button>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Card {currentCardIndex + 1} of {flashcards.length}
                    </div>
                    <button 
                      onClick={handleNextCard}
                      className="bg-quickstudy-purple hover:bg-opacity-90 text-white px-4 py-2 rounded-lg transition"
                    >
                      Next
                    </button>
                  </div>
                  <button 
                    onClick={downloadFlashcards}
                    className="flex items-center gap-2 bg-quickstudy-teal text-white px-4 py-2 rounded-lg hover:bg-quickstudy-teal/90 transition-colors"
                    aria-label="Download flashcards"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download All Flashcards</span>
                  </button>
                </div>
              </TabsContent>
            )}

            {generatedTypes && generatedTypes.includes('mindmap') && (
              <TabsContent value="mindmap">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-xl border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold dark:text-white">Mind Map & Key Connections</h2>
                    <button 
                      onClick={downloadMindMap}
                      className="flex items-center gap-2 bg-quickstudy-blue text-white px-3 py-2 rounded-lg hover:bg-quickstudy-blue/90 transition-colors"
                      aria-label="Download mind map"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                  {mindmap.map(node => renderMindMapNode(node))}
                </div>
              </TabsContent>
            )}
          </Tabs>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/upload')}
              className={`${darkMode ? 'bg-gray-700 border-quickstudy-indigo text-quickstudy-indigo hover:bg-gray-600' : 'bg-white border-quickstudy-purple text-quickstudy-purple hover:bg-quickstudy-purple/5'} border font-semibold px-6 py-3 rounded-full transition`}
            >
              Upload Another Document
            </button>
          </div>
        </div>
      </div>

      <Footer className={darkMode ? 'text-gray-400' : ''} />
    </div>
  );
};

export default Results;
function fetchResult(file: any, generatedTypes: any) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prompt', generatedTypes);

  fetch('http://127.0.0.1:9000/chat-with-attachment', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to process the file');
      }
      const json = response.json();
      // summary= response.json().
      // flashcards=
      // mindmap;
      console.log('Response:', json);
      return json;
    })
    .then(data => {
      console.log('Response:', data);
      summary = data['response']?.summary || null;
      altSummary = data['response']?.['alt-summary'] || null;
      flashcards = data['response']?.flashcards || null;
      altFlashcards = data['response']?.['alt-flashcards'] || null;
      mindmap = typeof data['response']?.mindmap === 'string' ? JSON.parse(data['response']?.mindmap) : data['response']?.mindmap || null; altMindmap = data['response']?.['alt-mindmap'] || null;
      toast.success('File processed successfully');
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error('An error occurred while processing the file');
    })
    .finally(() => {
    });
}

