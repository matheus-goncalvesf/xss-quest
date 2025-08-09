import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, AlertTriangle, Code } from 'lucide-react';

const Challenge16 = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const { completeChallenge } = useProgress();

  // CSP simples com nonce
  const nonce = 'random123';

  const handleSubmit = () => {
    // Verifica se conseguiu usar o nonce correto
    if (input.includes(`nonce='${nonce}'`) && input.includes('alert')) {
      completeChallenge(16);
      setResult('🚨 CSP BYPASSADO! Você explorou o nonce corretamente!');
    } else if (input.includes('script')) {
      setResult('🛡️ BLOQUEADO pelo Content Security Policy');
    } else {
      setResult(`Entrada processada: ${input}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-destructive" />
            Sistema Protegido por CSP
          </CardTitle>
          <p className="text-sm text-muted-foreground">Enterprise Security Level: Maximum</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">CSP Ativo</p>
            </div>
            <p className="text-xs text-destructive/80">Content Security Policy impedindo execução de scripts inline</p>
          </div>
          
          <Card className="border-muted bg-black/80 text-green-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code className="h-4 w-4" />
                Política de Segurança Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs font-mono overflow-x-auto">
{`Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'nonce-${nonce}'; 
  object-src 'none';`}
              </pre>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Testar conteúdo:</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite conteúdo para teste..."
              className="w-full font-mono"
            />
          </div>
          
          <Button onClick={handleSubmit} className="w-full" variant="terminal">
            Executar Teste
          </Button>
          
          {result && (
            <Card className={`border-${result.includes('🚨') ? 'destructive' : result.includes('🛡️') ? 'warning' : 'success'}/50 bg-${result.includes('🚨') ? 'destructive' : result.includes('🛡️') ? 'warning' : 'success'}/5`}>
              <CardContent className="pt-4">
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🔐 Sobre CSP:</strong><br />
              Content Security Policy é uma camada de segurança que previne XSS bloqueando execução de scripts não autorizados.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Observe o nonce na política CSP. Scripts com esse nonce específico podem ser executados...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge16;