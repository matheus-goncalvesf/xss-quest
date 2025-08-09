import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, AlertTriangle, Zap } from 'lucide-react';

const Challenge25 = () => {
  const [input, setInput] = useState('');
  const [wafLog, setWafLog] = useState<string[]>([]);
  const [result, setResult] = useState('');
  const [blocked, setBlocked] = useState(false);
  const { completeChallenge } = useProgress();

  const wafRules = [
    'script',
    'alert',
    'javascript:',
    'onload',
    'onerror',
    'eval',
    'document.cookie'
  ];

  const checkWAF = (payload: string) => {
    const logs: string[] = [];
    const lowerPayload = payload.toLowerCase();
    
    // Verifica regras básicas do WAF
    for (const rule of wafRules) {
      if (lowerPayload.includes(rule)) {
        logs.push(`🚫 Regra violada: "${rule}" detectado`);
        return { blocked: true, logs };
      }
    }
    
    // Verifica obfuscação avançada que bypassa WAF
    if (payload.includes('String.fromCharCode') || 
        payload.includes('oneRRor') || 
        payload.includes('eval(') && !lowerPayload.includes('eval')) {
      logs.push(`✅ Bypass detectado: Obfuscação avançada`);
      return { blocked: false, logs, bypass: true };
    }
    
    logs.push(`✅ Payload passou por todas as regras`);
    return { blocked: false, logs };
  };

  const handleSubmit = () => {
    const wafResult = checkWAF(input);
    setWafLog(wafResult.logs);
    
    if (wafResult.blocked) {
      setBlocked(true);
      setResult('🛡️ WAF BLOCKED: Tentativa de ataque detectada e bloqueada');
    } else if (wafResult.bypass) {
      setBlocked(false);
      completeChallenge(25);
      setResult('🚨 WAF BYPASSADO! Obfuscação avançada bem-sucedida!');
    } else {
      setBlocked(false);
      setResult(`Entrada processada: ${input}`);
    }
  };

  const insertBypassExample = () => {
    setInput(`<img src=x oneRRor=eval(String.fromCharCode(97,108,101,114,116,40,49,41))>`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-destructive" />
            Sistema Protegido por WAF
          </CardTitle>
          <p className="text-sm text-muted-foreground">Web Application Firewall Enterprise v2.0</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">WAF Protection Active</p>
            </div>
            <p className="text-xs text-destructive/80">Sistema de detecção avançado bloqueando tentativas de exploração</p>
          </div>
          
          <Card className="border-muted bg-black/80 text-green-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">🔒 Regras do WAF Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-xs space-y-1">
                {wafRules.map((rule, index) => (
                  <div key={index}>• Bloquear: "{rule}"</div>
                ))}
                <div className="text-primary/60 mt-2">
                  + Análise heurística de padrões maliciosos
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Entrada para teste:</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite entrada para análise do WAF..."
              className="w-full font-mono"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1" variant="terminal">
              <Zap className="h-4 w-4 mr-2" />
              Submeter ao WAF
            </Button>
            <Button onClick={insertBypassExample} variant="outline">
              🧪 Bypass
            </Button>
          </div>
          
          {wafLog.length > 0 && (
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">📊 Log do WAF</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {wafLog.map((log, index) => (
                    <div key={index} className="text-xs font-mono bg-background border rounded p-2">
                      {log}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {result && (
            <Card className={`border-${blocked ? 'warning' : result.includes('🚨') ? 'destructive' : 'success'}/50 bg-${blocked ? 'warning' : result.includes('🚨') ? 'destructive' : 'success'}/5`}>
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
              <strong>🛡️ Sobre WAF:</strong><br />
              Web Application Firewalls analisam requisições HTTP e bloqueiam padrões maliciosos conhecidos.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> WAFs podem ser bypassados com encoding, obfuscação, ou variações nas palavras-chave...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge25;