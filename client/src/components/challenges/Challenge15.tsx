import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Layers, Zap } from 'lucide-react';

const Challenge15 = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [processedSteps, setProcessedSteps] = useState<string[]>([]);
  const { completeChallenge } = useProgress();

  const processInput = () => {
    const steps: string[] = [];
    let processed = input;
    
    // Primeira decodificação URL
    steps.push(`1. Input original: ${processed}`);
    processed = decodeURIComponent(processed);
    steps.push(`2. Primeira decodificação: ${processed}`);
    
    // Segunda decodificação URL (vulnerabilidade!)
    try {
      processed = decodeURIComponent(processed);
      steps.push(`3. Segunda decodificação: ${processed}`);
    } catch (e) {
      steps.push(`3. Segunda decodificação: [ERRO] ${e}`);
    }
    
    setProcessedSteps(steps);
    
    // Verifica se conseguiu bypass com double encoding
    if (processed.includes('<script>') && processed.includes('alert')) {
      completeChallenge(15);
      setResult('🚨 SISTEMA COMPROMETIDO! Double encoding bypass bem-sucedido!');
    } else if (input.includes('script')) {
      setResult('🚫 BLOQUEADO: Conteúdo malicioso detectado na primeira camada');
    } else {
      setResult(`✅ Processamento concluído: ${processed}`);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Sistema de Sanitização Multicamadas
          </CardTitle>
          <p className="text-sm text-muted-foreground">Processamento avançado com dupla decodificação</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 p-4 rounded border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-primary" />
              <p className="text-sm text-primary font-medium">Proteção Multicamadas Ativa</p>
            </div>
            <p className="text-xs text-primary/80">Sistema processa dados através de múltiplas camadas de decodificação para máxima compatibilidade</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Entrada de dados:</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite dados para processamento..."
              className="w-full font-mono text-sm"
            />
          </div>
          
          <Button onClick={processInput} className="w-full" variant="terminal">
            <Zap className="h-4 w-4 mr-2" />
            Processar Dados
          </Button>
          
          {processedSteps.length > 0 && (
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-sm">🔄 Pipeline de Processamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {processedSteps.map((step, index) => (
                    <div key={index} className="text-xs font-mono bg-background border rounded p-2">
                      {step}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {result && (
            <Card className={`border-${result.includes('🚨') ? 'destructive' : result.includes('🚫') ? 'warning' : 'success'}/50 bg-${result.includes('🚨') ? 'destructive' : result.includes('🚫') ? 'warning' : 'success'}/5`}>
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
              <strong>🧬 Como funciona:</strong>
              <div className="mt-1">
                1. Sistema recebe entrada<br />
                2. Aplica primeira decodificação URL<br />
                3. Aplica segunda decodificação URL<br />
                4. Verifica conteúdo malicioso apenas na primeira etapa
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> E se você codificar seu payload duas vezes? O sistema decodifica em etapas...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge15;