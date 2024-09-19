import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeExample({ language, codeString }: { language: string; codeString: string }) {
  // Asegúrate de que los saltos de línea se representen correctamente
  const formattedCode = codeString.replace(/\\n/g, '\n'); // Para manejar saltos de línea representados

  return (
    <div className="max-w-2xl overflow-auto rounded-lg bg-gray-800 p-4">
      <SyntaxHighlighter language={language} wrapLines={true} style={atomDark}>
        {formattedCode}
      </SyntaxHighlighter>
    </div>
  );
}
