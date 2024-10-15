import { IconCopy, IconCheck, IconArrowsDiagonalMinimize } from '@tabler/icons-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

 
 export default function FullScreenCode({ copied, handleCoppy, language, formattedCode, handleIsfullScreen }: { copied: boolean, handleCoppy: any, language: string, formattedCode: string, handleIsfullScreen: any }) {

    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';  // Prevenir scroll del body
    }
    return (
      <section className="fixed inset-0 animate-fade-in-up animate-duration-150 w-screen h-screen bg-gray-800 z-50 flex justify-center items-center">
        <div className="w-full h-full overflow-auto bg-gray-900 p-2">
          <div className="w-full flex justify-between items-center bg-gray-900 p-2">

          <button className={`transition-all text-white px-4 ${copied ? "bg-green-500" : ""} py-2 rounded-lg`}onClick={handleCoppy}>{copied ? <IconCheck /> : <IconCopy />}</button>
            <button onClick={handleIsfullScreen} className='hover:scale-110 transition-all cursor-zoom-out'><IconArrowsDiagonalMinimize /></button>
          </div>
  
          <SyntaxHighlighter language={language} wrapLines={true} style={nightOwl}>
            {formattedCode}
          </SyntaxHighlighter>
        </div>
      </section>
    );
  }
 