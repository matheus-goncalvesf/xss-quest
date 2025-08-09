import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge41: React.FC = () => {
  const [encodedText, setEncodedText] = useState('');
  const [decodedResult, setDecodedResult] = useState('');
  const [autoExecute, setAutoExecute] = useState(true);

  const decodeBase64 = () => {
    try {
      const decoded = atob(encodedText);
      setDecodedResult(decoded);
      
      // Auto-executar se for JavaScript (VULNERABILIDADE)
      if (autoExecute && (decoded.includes('alert') || decoded.includes('script') || decoded.includes('function'))) {
        // Simular execução - em um cenário real isso seria perigoso
        eval(decoded);
      }
    } catch (error) {
      setDecodedResult('Erro: Não é um Base64 válido');
    }
  };

  const samples = [
    {
      name: 'Texto simples',
      encoded: btoa('Olá mundo!')
    },
    {
      name: 'HTML básico',
      encoded: btoa('<h1>Título</h1>')
    },
    {
      name: 'JavaScript',
      encoded: btoa('alert("Hello from Base64!")')
    }
  ];

  return (
    <ChallengeLayout challengeId={41}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🔓 Base64 Decoder</h2>
          <p className="text-muted-foreground mb-4">
            Decodifique strings Base64 e veja o resultado. 
            O sistema automaticamente executa código JavaScript detectado para sua conveniência.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">String Base64:</label>
              <input
                type="text"
                value={encodedText}
                onChange={(e) => setEncodedText(e.target.value)}
                className="w-full p-3 border rounded-md font-mono"
                placeholder="Q29s9XF1ZSBzdHJpbmcgQmFzZTY0IGFxdWku"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={decodeBase64}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                Decodificar
              </button>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoExecute}
                  onChange={(e) => setAutoExecute(e.target.checked)}
                />
                <span className="text-sm">Auto-executar JavaScript</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Resultado Decodificado:</label>
              <div className="w-full p-3 border rounded-md bg-muted min-h-20">
                <div dangerouslySetInnerHTML={{ __html: decodedResult || 'Nenhum resultado ainda...' }} />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">📋 Exemplos para testar:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {samples.map((sample, index) => (
                <div key={index} className="p-3 bg-accent/10 border border-accent/30 rounded">
                  <h4 className="text-sm font-medium">{sample.name}</h4>
                  <p className="text-xs text-muted-foreground font-mono mt-1 break-all">
                    {sample.encoded.substring(0, 30)}...
                  </p>
                  <button
                    onClick={() => setEncodedText(sample.encoded)}
                    className="mt-2 px-2 py-1 bg-accent text-accent-foreground text-xs rounded hover:bg-accent/80"
                  >
                    Usar
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded">
            <p className="text-sm text-warning">
              ⚠️ <strong>Atenção:</strong> Este decodificador executa automaticamente código JavaScript detectado!
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge41;