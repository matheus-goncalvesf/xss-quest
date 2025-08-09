import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge45: React.FC = () => {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchContent = async () => {
    setLoading(true);
    
    // Simular proxy/fetch vulnerável
    try {
      // Simular diferentes tipos de resposta baseado na URL
      let mockContent = '';
      
      if (url.includes('localhost') || url.includes('127.0.0.1')) {
        mockContent = `
          <h2>🏠 Localhost Detected</h2>
          <p>Acessando serviços internos...</p>
          <div>Admin Panel: <a href="/admin">Acesso Administrativo</a></div>
          <div>Internal API: <a href="/internal/api">API Interna</a></div>
        `;
      } else if (url.includes('admin') || url.includes('internal')) {
        mockContent = `
          <h2>⚠️ Área Restrita</h2>
          <p>Você acessou uma área interna do sistema!</p>
          <div>Database Config: host=localhost, user=admin, pass=123456</div>
          <div>API Keys: sk-1234567890abcdef</div>
        `;
      } else if (url.includes('file://')) {
        mockContent = `
          <h2>📁 File System Access</h2>
          <p>Lendo arquivo local...</p>
          <pre>/etc/passwd:
root:x:0:0:root:/root:/bin/bash
admin:x:1000:1000::/home/admin:/bin/bash
          </pre>
        `;
      } else {
        mockContent = `
          <h2>🌐 External Content</h2>
          <p>Conteúdo de: ${url}</p>
          <p>Esta é uma resposta simulada de um site externo.</p>
        `;
      }
      
      setContent(mockContent);
    } catch (error) {
      setContent(`Erro ao buscar: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    'https://example.com',
    'http://localhost:8080/admin',
    'http://127.0.0.1/internal/config',
    'file:///etc/passwd',
    'gopher://internal.local'
  ];

  return (
    <ChallengeLayout challengeId={45}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🌐 URL Fetcher Proxy</h2>
          <p className="text-muted-foreground mb-4">
            Proxy que permite buscar conteúdo de qualquer URL.
            Útil para contornar restrições de CORS e acessar recursos externos.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">URL para buscar:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 p-3 border rounded-md"
                  placeholder="https://example.com ou qualquer URL..."
                />
                <button
                  onClick={fetchContent}
                  disabled={loading || !url}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 disabled:opacity-50"
                >
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">📋 URLs de exemplo:</h3>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setUrl(example)}
                    className="px-3 py-1 text-sm bg-accent text-accent-foreground rounded hover:bg-accent/80"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">📄 Conteúdo Retornado:</h3>
              <div className="bg-muted p-4 rounded-md min-h-40 max-h-60 overflow-auto">
                {loading ? (
                  <p className="text-muted-foreground">🔄 Buscando conteúdo...</p>
                ) : content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p className="text-muted-foreground">Nenhum conteúdo carregado ainda</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">🔧 Protocolos Suportados:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-success/10 border border-success/30 rounded text-center">
                <span className="text-success">✅ HTTP</span>
              </div>
              <div className="p-2 bg-success/10 border border-success/30 rounded text-center">
                <span className="text-success">✅ HTTPS</span>
              </div>
              <div className="p-2 bg-success/10 border border-success/30 rounded text-center">
                <span className="text-success">✅ FILE</span>
              </div>
              <div className="p-2 bg-success/10 border border-success/30 rounded text-center">
                <span className="text-success">✅ GOPHER</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded">
            <p className="text-sm text-destructive">
              ⚠️ <strong>SSRF Risk:</strong> Este proxy pode acessar recursos internos da rede!
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge45;