import React, { useState, useEffect } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge40: React.FC = () => {
  const [cookies, setCookies] = useState<{[key: string]: string}>({});
  const [newCookieName, setNewCookieName] = useState('');
  const [newCookieValue, setNewCookieValue] = useState('');

  useEffect(() => {
    // Simular leitura de cookies do navegador
    const simulatedCookies = {
      username: 'user123',
      theme: 'dark',
      session: 'abc123def456'
    };
    setCookies(simulatedCookies);
  }, []);

  const updateCookie = () => {
    if (newCookieName && newCookieValue) {
      setCookies(prev => ({
        ...prev,
        [newCookieName]: newCookieValue
      }));
      setNewCookieName('');
      setNewCookieValue('');
    }
  };

  const deleteCookie = (name: string) => {
    setCookies(prev => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  return (
    <ChallengeLayout challengeId={40}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🍪 Cookie Manager</h2>
          <p className="text-muted-foreground mb-4">
            Gerencie os cookies do seu navegador. Os valores são exibidos diretamente na página
            para facilitar o debug.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Cookies Atuais:</h3>
              <div className="space-y-2">
                {Object.entries(cookies).map(([name, value]) => (
                  <div key={name} className="flex items-center justify-between p-3 bg-muted rounded border">
                    <div className="flex-1">
                      <div className="font-mono text-sm">
                        <strong>{name}:</strong> <span dangerouslySetInnerHTML={{ __html: value }} />
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCookie(name)}
                      className="ml-2 px-2 py-1 bg-destructive text-destructive-foreground rounded text-xs hover:bg-destructive/80"
                    >
                      Deletar
                    </button>
                  </div>
                ))}
                {Object.keys(cookies).length === 0 && (
                  <p className="text-muted-foreground text-sm">Nenhum cookie encontrado</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Adicionar/Editar Cookie:</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome:</label>
                  <input
                    type="text"
                    value={newCookieName}
                    onChange={(e) => setNewCookieName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="nome_do_cookie"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Valor:</label>
                  <input
                    type="text"
                    value={newCookieValue}
                    onChange={(e) => setNewCookieValue(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="valor_do_cookie"
                  />
                </div>
                
                <button
                  onClick={updateCookie}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80"
                >
                  Definir Cookie
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-warning/10 border border-warning/30 rounded">
            <h4 className="font-medium mb-2">👤 Bem-vindo, {cookies.username ? <span dangerouslySetInnerHTML={{ __html: cookies.username }} /> : 'Visitante'}!</h4>
            <p className="text-sm text-muted-foreground">
              Tema atual: {cookies.theme || 'padrão'} | Sessão: {cookies.session || 'não definida'}
            </p>
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded">
            <p className="text-sm">
              💡 <strong>Dica:</strong> Esta página lê cookies e os exibe diretamente. Use as DevTools para modificar cookies...
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge40;