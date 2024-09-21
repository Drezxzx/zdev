import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

 
 export default function FullScreenCode({ copied, handleCoppy, language, formattedCode, handleIsfullScreen }: { copied: boolean, handleCoppy: any, language: string, formattedCode: string, handleIsfullScreen: any }) {

    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';  // Prevenir scroll del body
    }
    return (
      <section className="fixed inset-0 w-screen h-screen bg-gray-800 z-50 flex justify-center items-center">
        <div className="w-full h-full overflow-auto bg-gray-900 p-2">
          <div className="w-full flex justify-between items-center bg-gray-900 p-2">

            <button onClick={handleCoppy} className={`bbg-blue-500 text-white px-4 py-2 rounded-lg' onClick={handleCoppy}> ${copied ? "bg-green-500" : "bg-blue-500"}`}>copy</button>
            <button onClick={handleIsfullScreen} className=''>🔎</button>
          </div>
  
          <SyntaxHighlighter language={language} wrapLines={true} style={atomDark}>
            {formattedCode}
          </SyntaxHighlighter>
        </div>
      </section>
    );
  }
 