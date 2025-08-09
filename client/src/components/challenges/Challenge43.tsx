import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge43: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const performSearch = () => {
    // Simular busca em API que retorna JSONP
    const jsonpCallback = `callback_${Date.now()}`;
    
    // Simular resposta JSONP vulnerável
    const mockResponse = `${jsonpCallback}([
      {"id": 1, "title": "Resultado para: ${searchTerm}", "description": "Primeira entrada encontrada"},
      {"id": 2, "title": "Outro resultado", "description": "Segunda entrada relacionada"}
    ])`;
    
    try {
      // Simular execução do JSONP
      const callbackRegex = new RegExp(`${jsonpCallback}\\((.+)\\)`, 's');
      const match = mockResponse.match(callbackRegex);
      
      if (match) {
        const data = JSON.parse(match[1]);
        setResults(data);
      }
    } catch (error) {
      // Se houver erro na execução, mostrar a resposta raw
      setResults([{
        id: 'raw',
        title: 'Resposta JSONP Raw',
        description: mockResponse
      }]);
    }
  };

  return (
    <ChallengeLayout challengeId={43}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🌐 JSONP Search API</h2>
          <p className="text-muted-foreground mb-4">
            API de busca que utiliza JSONP para contornar restrições de CORS.
            O callback é gerado dinamicamente baseado no timestamp.
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 p-3 border rounded-md"
                placeholder="Digite seu termo de busca..."
              />
              <button
                onClick={performSearch}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                Buscar
              </button>
            </div>
            
            <div className="bg-accent/10 p-3 rounded border">
              <p className="text-sm font-mono">
                <strong>Endpoint:</strong> /api/search?q={searchTerm}&callback=callback_{'{timestamp}'}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">📋 Resultados da Busca:</h3>
              <div className="space-y-2">
                {results.map((result) => (
                  <div key={result.id} className="p-3 bg-muted rounded border">
                    <h4 className="font-medium" dangerouslySetInnerHTML={{ __html: result.title }} />
                    <p className="text-sm text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: result.description }} />
                  </div>
                ))}
                {results.length === 0 && (
                  <p className="text-muted-foreground text-sm">Faça uma busca para ver os resultados</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">🔍 Como funciona JSONP:</h3>
            <div className="p-3 bg-warning/10 border border-warning/30 rounded">
              <ol className="text-sm space-y-1">
                <li>1. Cliente solicita script dinâmico via URL</li>
                <li>2. Servidor retorna JavaScript executável</li>
                <li>3. Callback especificado é executado com os dados</li>
                <li>4. Dados ficam disponíveis no contexto da página</li>
              </ol>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded">
            <p className="text-sm">
              💡 <strong>Dica:</strong> E se você pudesse controlar o nome do callback JSONP?
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge43;