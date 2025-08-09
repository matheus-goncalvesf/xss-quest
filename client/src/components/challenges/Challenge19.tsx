import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, ExternalLink, Globe } from 'lucide-react';

const Challenge19 = () => {
  const [receivedMessage, setReceivedMessage] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const { completeChallenge } = useProgress();

  useEffect(() => {
    // Listener para postMessage (vulnerável - sem validação de origem)
    const handleMessage = (event: MessageEvent) => {
      // ❌ Sem validação de origem - vulnerabilidade!
      setReceivedMessage(event.data);
      
      // Verifica se é um payload XSS
      if (event.data.includes('script') && event.data.includes('alert')) {
        setTimeout(() => {
          completeChallenge(19);
        }, 300);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const sendMessage = () => {
    // Simula envio de postMessage
    window.postMessage(customMessage, '*');
  };

  const createMaliciousIframe = () => {
    // Cria iframe que enviará uma mensagem maliciosa
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'data:text/html,<script>parent.postMessage("<script>alert(1)</script>", "*")</script>';
    document.body.appendChild(iframe);
    
    // Remove iframe após 2 segundos
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-warning" />
            Sistema de Comunicação Inter-Frame
          </CardTitle>
          <p className="text-sm text-muted-foreground">API postMessage para comunicação segura entre origens</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning/10 p-4 rounded border border-warning/30">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-warning" />
              <p className="text-sm text-warning font-medium">Comunicação Cross-Origin Ativa</p>
            </div>
            <p className="text-xs text-warning/80">Sistema escuta mensagens de qualquer origem para máxima compatibilidade</p>
          </div>
          
          <Card className="border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">📨 Última Mensagem Recebida</CardTitle>
            </CardHeader>
            <CardContent>
              {receivedMessage ? (
                <div 
                  className="bg-background border rounded p-3 text-sm"
                  dangerouslySetInnerHTML={{ __html: receivedMessage }}
                />
              ) : (
                <p className="text-muted-foreground text-sm">Nenhuma mensagem recebida ainda</p>
              )}
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Enviar mensagem:</label>
            <div className="flex gap-2">
              <Input
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Digite uma mensagem para testar..."
                className="flex-1"
              />
              <Button onClick={sendMessage}>
                Enviar
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">🧪 Simulação de Ataque</p>
            <p className="text-xs text-muted-foreground mb-3">
              Simule um iframe malicioso enviando mensagem para esta página:
            </p>
            <Button 
              onClick={createMaliciousIframe} 
              variant="outline" 
              className="w-full flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Criar Iframe Malicioso
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🔗 Sobre postMessage:</strong><br />
              API que permite comunicação segura entre windows/frames de diferentes origens, mas requer validação adequada.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Este sistema não valida a origem das mensagens. Qualquer iframe pode enviar dados maliciosos...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge19;