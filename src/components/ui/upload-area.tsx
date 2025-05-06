
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, FileText, Upload, Image, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UploadAreaProps {
  onFileSelected: (file: File) => void;
}

const UploadArea = ({ onFileSelected }: UploadAreaProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const allowedTypes = ['.txt', '.pdf', '.ppt', '.pptx'];
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      
      if (allowedTypes.includes(fileExtension)) {
        onFileSelected(file);
        toast.success(`File "${file.name}" uploaded successfully`);
      } else {
        toast.error('Please upload a .txt, .pdf, .ppt, or .pptx file');
      }
    }
  }, [onFileSelected]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const getFileIcon = (extension: string) => {
    switch (extension) {
      case '.txt':
        return <FileText className="w-10 h-10 text-blue-500" />;
      case '.pdf':
        return <FileText className="w-10 h-10 text-red-500" />; // Using FileText instead of FilePdf
      case '.ppt':
      case '.pptx':
        return <File className="w-10 h-10 text-orange-500" />;
      default:
        return <File className="w-10 h-10 text-gray-500" />;
    }
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer",
        isDragActive ? 
          "border-quickstudy-indigo bg-indigo-50 dark:border-quickstudy-indigo dark:bg-indigo-900/20" : 
          "border-gray-300 hover:border-quickstudy-blue dark:border-gray-700 dark:hover:border-quickstudy-indigo",
        "bg-white dark:bg-gray-800/50 backdrop-blur-sm"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-2",
          isDragActive ? 
            "bg-indigo-100 dark:bg-indigo-900/30 animate-bounce-subtle" : 
            "bg-gray-50 dark:bg-gray-700"
        )}>
          <Upload className={cn(
            "w-8 h-8 transition-all",
            isDragActive ? 
              "text-quickstudy-indigo" : 
              "text-gray-400 dark:text-gray-300"
          )} />
        </div>
        
        <div className="max-w-xs">
          <p className="text-lg font-medium mb-1 dark:text-white">
            {isDragActive ? 'Drop your file here' : 'Drag & drop your study material'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supported formats: .txt, .pdf, .ppt, .pptx
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-2">
          {['.txt', '.pdf', '.pptx', '.ppt'].map((ext) => (
            <div key={ext} className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              {getFileIcon(ext)}
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">{ext}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <button 
            type="button" 
            className="bg-gradient-main hover:from-quickstudy-indigo hover:to-quickstudy-blue text-white px-5 py-2 rounded-full hover:shadow-lg transition"
          >
            Browse Files
          </button>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
          <Info className="w-3 h-3" />
          <span>Files are processed securely and not stored permanently</span>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
