import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge37: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = () => {
    // Regex fraco que bloqueia apenas <script> exato
    const blockRegex = /^<script>/i;
    
    if (blockRegex.test(input.trim())) {
      setIsBlocked(true);
      setOutput('⚠️ Conteúdo bloqueado pelo filtro de segurança!');
    } else {
      setIsBlocked(false);
      setOutput(`Processado: ${input}`);
    }
  };

  return (
    <ChallengeLayout challengeId={37}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🔒 Sistema com Filtro Regex</h2>
          <p className="text-muted-foreground mb-4">
            Este sistema usa regex para bloquear conteúdo malicioso.
            Tente inserir diferentes tipos de entrada para testar a proteção.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Digite seu conteúdo:</label>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="Digite algo aqui..."
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
            >
              Processar Entrada
            </button>
            
            <div className={`p-4 rounded-md ${isBlocked ? 'bg-destructive/10 border border-destructive/30' : 'bg-success/10 border border-success/30'}`}>
              <p className={isBlocked ? 'text-destructive' : 'text-success'}>
                {output || 'Nenhuma saída ainda...'}
              </p>
              {!isBlocked && input && (
                <div 
                  className="mt-2 p-2 bg-background rounded border"
                  dangerouslySetInnerHTML={{ __html: input }}
                />
              )}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded">
            <p className="text-sm">
              🔍 <strong>Regex usado:</strong> <code>/^&lt;script&gt;/i</code>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Este filtro verifica apenas o início da string...
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge37;