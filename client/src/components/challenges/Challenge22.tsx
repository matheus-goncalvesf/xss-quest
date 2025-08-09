import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, Globe, Code2 } from 'lucide-react';

const Challenge22 = () => {
  const [callbackParam, setCallbackParam] = useState('handleData');
  const [jsonpData, setJsonpData] = useState('');
  const { completeChallenge } = useProgress();

  useEffect(() => {
    // Lê parâmetro callback da URL
    const urlParams = new URLSearchParams(window.location.search);
    const callback = urlParams.get('callback');
    if (callback) {
      setCallbackParam(callback);
      
      // Verifica se é um payload malicioso
      if (callback.includes('alert') && callback.includes('XSS')) {
        setTimeout(() => {
          completeChallenge(22);
        }, 500);
      }
    }
  }, []);

  const loadJsonpData = () => {
    // Simula resposta JSONP
    const data = {
      users: [
        { id: 1, name: 'João Silva', email: 'joao@email.com' },
        { id: 2, name: 'Maria Santos', email: 'maria@email.com' }
      ]
    };
    
    // JSONP response (vulnerável)
    const jsonpResponse = `${callbackParam}(${JSON.stringify(data)});`;
    setJsonpData(jsonpResponse);
    
    // Simula execução do callback
    try {
      if (callbackParam.includes('alert')) {
        // Se o callback contém alert, vai executar
        eval(jsonpResponse);
      }
    } catch (e) {
      console.log('Callback execution failed:', e);
    }
  };

  const updateUrl = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('callback', callbackParam);
    window.history.pushState({}, '', newUrl.toString());
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            API JSONP Externa
          </CardTitle>
          <p className="text-sm text-muted-foreground">Endpoint para integração cross-domain via JSONP</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 p-4 rounded border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <p className="text-sm text-primary font-medium">JSONP Cross-Domain API</p>
            </div>
            <p className="text-xs text-primary/80">Suporte a callback customizado para contornar limitações CORS</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Callback function:</label>
            <div className="flex gap-2">
              <Input
                value={callbackParam}
                onChange={(e) => setCallbackParam(e.target.value)}
                placeholder="Nome da função callback..."
                className="flex-1 font-mono"
              />
              <Button onClick={updateUrl} variant="outline">
                Atualizar URL
              </Button>
            </div>
          </div>
          
          <Button onClick={loadJsonpData} className="w-full" variant="terminal">
            Carregar Dados via JSONP
          </Button>
          
          <Card className="border-muted bg-black/80 text-green-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Endpoint JSONP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-xs space-y-1">
                <div>GET /api/users</div>
                <div>?callback={callbackParam}</div>
                <div className="text-primary/60 mt-2">
                  Exemplo: ?callback=alert('JSONP XSS');//
                </div>
              </div>
            </CardContent>
          </Card>
          
          {jsonpData && (
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">📡 Resposta JSONP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background border rounded p-3 text-sm font-mono overflow-auto">
                  {jsonpData}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🔗 Sobre JSONP:</strong><br />
              JSON with Padding permite requisições cross-domain envolvendo dados em uma chamada de função JavaScript.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> O parâmetro callback é inserido diretamente na resposta e executado. Que tal modificar a URL?
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge22;