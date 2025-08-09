import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

const Challenge10 = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [blocked, setBlocked] = useState(false);
  const { completeChallenge } = useProgress();

  const handleSubmit = () => {
    // Filtro case-sensitive que só bloqueia "script" em minúsculas
    if (input.includes('script')) {
      setBlocked(true);
      setResult('🚫 BLOQUEADO: Tentativa de injeção detectada (script)');
      return;
    }

    setBlocked(false);
    
    // Aceita se usa maiúsculas
    if (input.toUpperCase().includes('SCRIPT') && input.includes('alert')) {
      completeChallenge(10);
      setResult('🚨 SISTEMA COMPROMETIDO! Filtro bypassado com sucesso!');
    } else {
      setResult(`Entrada válida processada: ${input}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-success/30 bg-success/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-success" />
            Sistema de Validação Melhorado v2.0
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-success/10 p-4 rounded border border-success/30">
            <p className="text-sm text-success mb-2">🔒 Segurança Avançada Ativada</p>
            <p className="text-xs text-success/80">Novo sistema de detecção implementado. Agora bloqueamos tentativas de "script"!</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Testar entrada:</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite algo para testar..."
              className="w-full"
            />
          </div>
          
          <Button onClick={handleSubmit} className="w-full">
            Validar Entrada
          </Button>
          
          {result && (
            <Card className={`mt-4 ${blocked ? 'border-destructive/50 bg-destructive/5' : 'border-primary/50 bg-primary/5'}`}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${blocked ? 'text-destructive' : 'text-primary'}`} />
                  <div>
                    <p className="text-sm font-medium">Resultado da Validação:</p>
                    <div 
                      className="text-sm mt-1"
                      dangerouslySetInnerHTML={{ __html: result }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="bg-muted/30 p-3 rounded text-xs">
            <div className="mb-2"><strong>📋 Log do Sistema:</strong></div>
            <div className="font-mono text-xs space-y-1">
              <div>• Filtro carregado: blacklist = ["script"]</div>
              <div>• Método de detecção: string.includes()</div>
              <div>• Case sensitivity: ENABLED</div>
              <div>• Status: ✅ ATIVO</div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> Este filtro verifica exatamente a palavra "script". Será que HTML é case-sensitive como o JavaScript?
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge10;