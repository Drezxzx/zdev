"use client";

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import FullScreenCode from './FullScreenCode';

export default function CodeExample({ language, codeString }: { language: string; codeString: string }) {
 
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const formattedCode = codeString.replace(/\\n/g, '\n'); 
  
  const handleCoppy = () => {
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };


  const handleIsfullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Verificar si es modo fullscreen y ajustar el overflow del body
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'auto';
    }
    return (
      <div className="max-w-2xl z-50 overflow-auto rounded-lg bg-gray-800 p-2 relative">
        <div className='w-full flex justify-between items-center'>
          <button className={`bbg-blue-500 text-white px-4 ${copied ? "bg-green-500" : "bg-blue-500"} py-2 rounded-lg`}onClick={handleCoppy}>copy</button>
          <button onClick={handleIsfullScreen} className=''>🔎</button>
        </div>
  
        <SyntaxHighlighter language={language} wrapLines={true} style={atomDark}>
          {formattedCode}
        </SyntaxHighlighter>
      
        {isFullScreen &&<FullScreenCode copied={copied} handleCoppy={handleCoppy} language={language} formattedCode={formattedCode} handleIsfullScreen={handleIsfullScreen} />}
      </div>
    
      
  );
  
    

 
   
}
