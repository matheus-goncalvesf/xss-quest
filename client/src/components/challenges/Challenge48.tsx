import React, { useState, useEffect } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge48: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simular conexão WebSocket
    setIsConnected(true);
    
    // Adicionar algumas mensagens iniciais
    setMessages([
      { id: 1, user: 'Sistema', text: 'Bem-vindo ao chat!', timestamp: new Date().toLocaleTimeString() },
      { id: 2, user: 'Admin', text: 'Chat monitorado 24/7', timestamp: new Date().toLocaleTimeString() }
    ]);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      user: 'Você',
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simular resposta automática após alguns tipos de mensagem
    setTimeout(() => {
      if (message.toLowerCase().includes('admin') || message.toLowerCase().includes('help')) {
        const botResponse = {
          id: Date.now() + 1,
          user: 'Bot',
          text: `Processando: "${message}" - Como posso ajudar?`,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, botResponse]);
      }
    }, 1000);
    
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChallengeLayout challengeId={48}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">💬 WebSocket Chat</h2>
          <p className="text-muted-foreground mb-4">
            Chat em tempo real usando WebSockets. Mensagens são transmitidas instantaneamente
            para todos os usuários conectados.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success' : 'bg-destructive'}`}></div>
              <span className="text-sm">
                {isConnected ? 'Conectado ao servidor' : 'Desconectado'}
              </span>
            </div>
            
            <div className="border rounded-lg h-80 overflow-y-auto bg-background">
              <div className="p-4 space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{msg.user}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div 
                      className="mt-1 p-2 bg-muted rounded text-sm"
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 p-3 border rounded-md resize-none"
                placeholder="Digite sua mensagem..."
                rows={2}
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || !isConnected}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">🔧 Funcionalidades do Chat:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-success/10 border border-success/30 rounded">
                <p className="text-sm">✅ Mensagens em tempo real</p>
              </div>
              <div className="p-3 bg-success/10 border border-success/30 rounded">
                <p className="text-sm">✅ Suporte a HTML/formatação</p>
              </div>
              <div className="p-3 bg-success/10 border border-success/30 rounded">
                <p className="text-sm">✅ Resposta automática do bot</p>
              </div>
              <div className="p-3 bg-success/10 border border-success/30 rounded">
                <p className="text-sm">✅ Histórico persistente</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded">
            <p className="text-sm text-warning">
              💡 <strong>Dica:</strong> WebSockets processam mensagens em tempo real. E se você enviasse HTML ou JavaScript?
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge48;