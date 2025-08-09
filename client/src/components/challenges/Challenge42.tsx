import React, { useState, useEffect } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge42: React.FC = () => {
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simular CSP que permite apenas scripts inline com nonce
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = "script-src 'nonce-abc123' 'unsafe-inline'; object-src 'none';";
    document.head.appendChild(cspMeta);
    
    return () => {
      document.head.removeChild(cspMeta);
    };
  }, []);

  const submitMessage = () => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    setLogs(prev => [...prev, logEntry]);
    setMessage('');
  };

  return (
    <ChallengeLayout challengeId={42}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🛡️ CSP Protected App</h2>
          <p className="text-muted-foreground mb-4">
            Esta aplicação possui Content Security Policy (CSP) configurada.
            Apenas scripts com nonce específico são permitidos.
          </p>
          
          <div className="mb-4 p-3 bg-accent/10 border border-accent/30 rounded">
            <p className="text-sm font-mono">
              <strong>CSP:</strong> script-src 'nonce-abc123' 'unsafe-inline'; object-src 'none';
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enviar mensagem ao log:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 p-3 border rounded-md"
                  placeholder="Digite sua mensagem..."
                />
                <button
                  onClick={submitMessage}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
                >
                  Enviar
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">📝 Log de Mensagens:</h3>
              <div className="bg-muted p-4 rounded-md h-40 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="mb-1 font-mono text-sm" dangerouslySetInnerHTML={{ __html: log }} />
                ))}
                {logs.length === 0 && (
                  <p className="text-muted-foreground text-sm">Nenhuma mensagem ainda...</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">🔧 Scripts permitidos:</h3>
            <div className="space-y-2">
              <div className="p-3 bg-success/10 border border-success/30 rounded">
                <p className="text-sm">✅ Scripts com nonce 'abc123' são permitidos</p>
                <code className="text-xs">&lt;script nonce="abc123"&gt;alert('CSP OK')&lt;/script&gt;</code>
              </div>
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded">
                <p className="text-sm">❌ Scripts sem nonce são bloqueados</p>
                <code className="text-xs">&lt;script&gt;alert('Bloqueado')&lt;/script&gt;</code>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded">
            <p className="text-sm text-warning">
              💡 <strong>Dica:</strong> CSP pode ser bypassado se você conhecer o nonce correto...
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge42;