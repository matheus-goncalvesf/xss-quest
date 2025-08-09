import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GitBranch, Play, AlertTriangle } from 'lucide-react';

const Challenge29 = () => {
  const [objectKey, setObjectKey] = useState('');
  const [objectValue, setObjectValue] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [executed, setExecuted] = useState('');
  const [polluted, setPolluted] = useState(false);
  const { completeChallenge } = useProgress();

  const pollutePrototype = () => {
    try {
      // Simula pollution do prototype
      if (objectKey && objectValue) {
        // ⚠️ Apenas para demonstração - não faça isso em produção!
        (Object.prototype as any)[objectKey] = objectValue;
        setPolluted(true);
        
        setExecuted(`Object.prototype.${objectKey} = "${objectValue}"\n✅ Prototype pollution realizada!`);
        
        // Verifica se é uma pollution que leva a XSS
        if (objectKey === 'innerHTML' && objectValue.includes('script')) {
          setTimeout(() => {
            completeChallenge(29);
            setExecuted(prev => prev + '\n🚨 XSS via Prototype Pollution detectado!');
          }, 500);
        }
      }
    } catch (error) {
      setExecuted('Erro: ' + error);
    }
  };

  const executeCode = () => {
    try {
      // Simula execução de código que pode ser afetado pela pollution
      let result = '';
      
      if (jsCode.includes('innerHTML')) {
        result = 'Código executado - propriedade innerHTML acessada\n';
        
        // Se o prototype foi poluído com innerHTML malicioso
        if (polluted && (Object.prototype as any).innerHTML) {
          result += `Valor encontrado no prototype: ${(Object.prototype as any).innerHTML}\n`;
          result += '🚨 Prototype pollution explorada!';
        }
      } else {
        result = 'Código executado normalmente';
      }
      
      setExecuted(result);
    } catch (error) {
      setExecuted('Erro na execução: ' + error);
    }
  };

  const resetPrototype = () => {
    // Limpa a pollution (apenas para demonstração)
    if (objectKey && (Object.prototype as any)[objectKey]) {
      delete (Object.prototype as any)[objectKey];
    }
    setPolluted(false);
    setExecuted('Prototype limpo');
  };

  const insertExamplePollution = () => {
    setObjectKey('innerHTML');
    setObjectValue('<script>alert("Prototype Pollution XSS")</script>');
  };

  const insertExampleCode = () => {
    setJsCode(`// Código que acessa propriedades de objetos
const element = {};
if (element.innerHTML) {
  document.body.innerHTML = element.innerHTML;
}`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-destructive" />
            Laboratório de Prototype Pollution
          </CardTitle>
          <p className="text-sm text-muted-foreground">Exploração avançada de poluição de prototypes</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">JavaScript Prototype Chain</p>
            </div>
            <p className="text-xs text-destructive/80">Ambiente para modificar Object.prototype e observar impactos globais</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">🔧 Pollution do Prototype</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Propriedade:</label>
                  <Input
                    value={objectKey}
                    onChange={(e) => setObjectKey(e.target.value)}
                    placeholder="innerHTML"
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium">Valor:</label>
                  <Input
                    value={objectValue}
                    onChange={(e) => setObjectValue(e.target.value)}
                    placeholder="<script>alert(1)</script>"
                    className="text-sm font-mono"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={pollutePrototype} size="sm" className="flex-1">
                    Poluir
                  </Button>
                  <Button onClick={insertExamplePollution} size="sm" variant="outline">
                    Ex.
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">⚡ Execução de Código</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Código JavaScript:</label>
                  <Textarea
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    placeholder="const obj = {}; console.log(obj.innerHTML);"
                    className="text-xs font-mono"
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={executeCode} size="sm" className="flex-1" variant="terminal">
                    <Play className="h-3 w-3 mr-1" />
                    Executar
                  </Button>
                  <Button onClick={insertExampleCode} size="sm" variant="outline">
                    Ex.
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="border-accent/50 bg-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">📊 Status do Prototype</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/80 text-green-400 p-3 rounded font-mono text-xs">
                Pollution Status: {polluted ? '🔴 ACTIVE' : '🟢 CLEAN'}<br />
                {polluted && objectKey && (
                  <>Object.prototype.{objectKey} = "{objectValue}"</>
                )}
              </div>
            </CardContent>
          </Card>
          
          {executed && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">🖥️ Resultado da Execução</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background border rounded p-3 text-sm font-mono whitespace-pre-line">
                  {executed}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="flex gap-2">
            <Button onClick={resetPrototype} variant="outline" className="flex-1">
              Resetar Prototype
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🧬 Sobre Prototype Pollution:</strong><br />
              Modificação maliciosa de Object.prototype que afeta todos os objetos JavaScript, podendo levar a XSS quando propriedades como innerHTML são poluídas.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Pollua Object.prototype.innerHTML e depois execute código que acesse essa propriedade em objetos vazios...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge29;