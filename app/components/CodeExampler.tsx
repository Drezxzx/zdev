"use client";
import {IconArrowsDiagonal2, IconCopy, IconCheck} from "@tabler/icons-react";
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import FullScreenCode from './FullScreenCode';

export default function CodeExample({ language, codeString }: { language: string; codeString: string }) {
 
  const [copied, setCopied] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(true);
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

    const body = document.querySelector('body');
    if (body) { 
      body.style.overflow = 'auto';
    }
  const overflow = isBlocked ? "overflow-hidden cursor-pointer" : "overflow-auto cursor-text"
    return (
      <div onClick={()=>{setIsBlocked(!isBlocked)}} className={`max-w-2xl ${overflow}  z-50 max-h-[80vh] rounded-lg bg-gray-800 p-2 relative`}>
        <div className='w-full flex justify-between items-center'>
          <button className={`transition-all text-white px-4 ${copied ? "bg-green-500" : ""} py-2 rounded-lg`}onClick={handleCoppy}>{copied ? <IconCheck /> : <IconCopy />}</button>
          <button onClick={handleIsfullScreen} className="hover:scale-110 transition-all cursor-zoom-in"><IconArrowsDiagonal2 /></button>
        </div>
  
        <SyntaxHighlighter language={language} wrapLines={true} style={nightOwl}>
          {formattedCode}
        </SyntaxHighlighter>
      
        {isFullScreen &&<FullScreenCode copied={copied} handleCoppy={handleCoppy} language={language} formattedCode={formattedCode} handleIsfullScreen={handleIsfullScreen} />}
      </div>
    
      
  );
  
    

 
   
}
