import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Wifi, MessageSquare, Send } from 'lucide-react';

const Challenge18 = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const { completeChallenge } = useProgress();

  useEffect(() => {
    // Simula conexão WebSocket
    setConnected(true);
    setMessages(['🤖 Sistema: Conexão WebSocket estabelecida']);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Simula envio via WebSocket
    const newMessage = `Você: ${message}`;
    setMessages(prev => [...prev, newMessage]);
    
    // Verifica se é um payload XSS
    if (message.includes('script') && message.includes('alert')) {
      setTimeout(() => {
        completeChallenge(18);
        setMessages(prev => [...prev, '🚨 SISTEMA COMPROMETIDO via WebSocket!']);
      }, 500);
    } else {
      // Simula resposta do servidor
      setTimeout(() => {
        setMessages(prev => [...prev, '🤖 Sistema: Mensagem recebida e processada']);
      }, 300);
    }
    
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            Chat em Tempo Real
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sistema de mensagens instantâneas via WebSocket</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 p-4 rounded border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-success' : 'bg-destructive'}`} />
              <p className="text-sm text-primary font-medium">
                Status: {connected ? 'Conectado' : 'Desconectado'}
              </p>
            </div>
            <p className="text-xs text-primary/80">WebSocket ativo para comunicação bidirecional</p>
          </div>
          
          <Card className="border-muted max-h-64 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Mensagens
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-48 overflow-y-auto space-y-2">
              {messages.map((msg, index) => (
                <div 
                  key={index}
                  className="text-sm p-2 rounded bg-muted/50"
                  dangerouslySetInnerHTML={{ __html: msg }}
                />
              ))}
            </CardContent>
          </Card>
          
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={!connected}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🔄 Sobre WebSocket:</strong><br />
              Protocolo de comunicação bidirecional que permite troca de mensagens em tempo real entre cliente e servidor.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> As mensagens são exibidas diretamente no chat. Será que o sistema sanitiza o conteúdo antes de mostrar?
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge18;