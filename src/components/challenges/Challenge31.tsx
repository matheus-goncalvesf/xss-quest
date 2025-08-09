import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Equal } from 'lucide-react';

const Challenge31 = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const { completeChallenge } = useProgress();

  const calculate = () => {
    try {
      // ⚠️ Vulnerabilidade: usando eval() diretamente
      const calculationResult = eval(expression);
      const calculation = `${expression} = ${calculationResult}`;
      
      setResult(calculationResult.toString());
      setHistory(prev => [...prev, calculation].slice(-5));
      
      // Verifica se executou JavaScript malicioso
      if (expression.includes('alert') && !expression.match(/^\d+[\+\-\*\/\d\s]*$/)) {
        setTimeout(() => {
          completeChallenge(31);
        }, 100);
      }
    } catch (error) {
      setResult('Erro na expressão');
    }
  };

  const addToExpression = (value: string) => {
    setExpression(prev => prev + value);
  };

  const clearExpression = () => {
    setExpression('');
    setResult('');
  };

  return (
    <ChallengeLayout challengeId={31}>
      <div className="max-w-md mx-auto">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Calculadora Avançada
            </CardTitle>
            <p className="text-sm text-muted-foreground">Calculadora com suporte a expressões complexas</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Digite sua expressão matemática..."
                className="text-center font-mono"
              />
              
              {result && (
                <div className="text-center p-3 bg-muted rounded border">
                  <div className="flex items-center justify-center gap-2">
                    <Equal className="h-4 w-4" />
                    <span className="text-lg font-bold">{result}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['7', '8', '9', '/'].map(btn => (
                <Button key={btn} variant="outline" onClick={() => addToExpression(btn)}>
                  {btn}
                </Button>
              ))}
              {['4', '5', '6', '*'].map(btn => (
                <Button key={btn} variant="outline" onClick={() => addToExpression(btn)}>
                  {btn}
                </Button>
              ))}
              {['1', '2', '3', '-'].map(btn => (
                <Button key={btn} variant="outline" onClick={() => addToExpression(btn)}>
                  {btn}
                </Button>
              ))}
              {['0', '.', 'C', '+'].map(btn => (
                <Button 
                  key={btn} 
                  variant={btn === 'C' ? 'destructive' : 'outline'} 
                  onClick={() => btn === 'C' ? clearExpression() : addToExpression(btn)}
                >
                  {btn}
                </Button>
              ))}
            </div>

            <Button onClick={calculate} className="w-full" variant="terminal">
              Calcular
            </Button>

            {history.length > 0 && (
              <Card className="border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Histórico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-xs font-mono">
                    {history.map((calc, index) => (
                      <div key={index} className="text-muted-foreground">
                        {calc}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Esta calculadora usa eval() para processar expressões. Será que aceita mais que matemática?
            </div>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge31;