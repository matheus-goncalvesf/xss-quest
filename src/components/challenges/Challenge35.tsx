import { useState, useEffect, useRef } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'support';
  content: string;
  timestamp: string;
}

const Challenge35 = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'support',
      content: 'Olá! Como posso ajudá-lo hoje?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { completeChallenge } = useProgress();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Verifica se contém XSS
    if (message.includes('<script>') && message.includes('alert')) {
      setTimeout(() => {
        completeChallenge(35);
      }, 500);
    }
    
    // Simula resposta do suporte
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        'Entendi sua mensagem. Posso ajudar com mais alguma coisa?',
        'Obrigado pelo contato. Nossa equipe analisará sua solicitação.',
        'Essa é uma questão interessante. Vou encaminhar para o setor responsável.',
        'Agradeço o feedback. É importante para melhorarmos nosso serviço.'
      ];
      
      const supportResponse: Message = {
        id: messages.length + 2,
        sender: 'support',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, supportResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChallengeLayout challengeId={35}>
      <div className="max-w-2xl mx-auto">
        <Card className="border-primary/30 bg-primary/5 h-[600px] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Chat de Suporte Técnico
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Nossa equipe está online para ajudá-lo
            </p>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground'
                  }`}>
                    {msg.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`max-w-[70%] ${
                    msg.sender === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      {/* ⚠️ Vulnerabilidade: HTML não sanitizado */}
                      <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-accent text-accent-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua mensagem... (HTML é suportado para formatação)"
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted/30 rounded">
          💡 <strong>Dica:</strong> O chat suporta HTML para formatação de mensagens. Experimente usar tags HTML para destacar sua mensagem!
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge35;