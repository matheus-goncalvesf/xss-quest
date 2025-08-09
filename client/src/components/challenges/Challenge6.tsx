import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, Shield } from 'lucide-react';

const Challenge6 = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [blocked, setBlocked] = useState(false);
  const { completeChallenge } = useProgress();

  const handleSubmit = () => {
    // Filtro ingênuo que só bloqueia a palavra "script"
    if (input.toLowerCase().includes('script')) {
      setBlocked(true);
      setResult('❌ Entrada bloqueada: conteúdo malicioso detectado!');
      return;
    }

    setBlocked(false);
    
    // Simula inserção no DOM (vulnerável a outros métodos)
    if (input.includes('onerror') && input.includes('alert')) {
      completeChallenge(6);
      setResult('🚨 XSS EXECUTADO! Você conseguiu bypassar o filtro!');
    } else {
      setResult(`Entrada processada: ${input}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" />
            Sistema de Comentários Protegido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded border border-accent/20">
            <p className="text-sm text-muted-foreground mb-2">🛡️ Sistema de Segurança Ativo</p>
            <p className="text-xs">Filtrando conteúdo malicioso...</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Seu comentário:</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite seu comentário aqui..."
              className="w-full"
            />
          </div>
          
          <Button onClick={handleSubmit} className="w-full">
            Publicar Comentário
          </Button>
          
          {result && (
            <Card className={`mt-4 ${blocked ? 'border-destructive/50 bg-destructive/5' : 'border-primary/50 bg-primary/5'}`}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className={`h-4 w-4 mt-0.5 ${blocked ? 'text-destructive' : 'text-primary'}`} />
                  <div>
                    <p className="text-sm font-medium">Resultado:</p>
                    <div 
                      className="text-sm mt-1"
                      dangerouslySetInnerHTML={{ __html: result }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> Este sistema bloqueia a palavra "script", mas existem outras formas de executar JavaScript em HTML...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge6;