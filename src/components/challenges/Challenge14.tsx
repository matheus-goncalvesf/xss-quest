import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Monitor, ExternalLink, RefreshCw } from 'lucide-react';

const Challenge14 = () => {
  const [iframeUrl, setIframeUrl] = useState('https://example.com');
  const [customUrl, setCustomUrl] = useState('');
  const { completeChallenge } = useProgress();

  useEffect(() => {
    // Lê URL do parâmetro
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('url');
    if (url) {
      setIframeUrl(url);
      
      // Verifica se é data URL com XSS
      if (url.startsWith('data:text/html,') && url.includes('script') && url.includes('alert')) {
        setTimeout(() => {
          completeChallenge(14);
        }, 500);
      }
    }
  }, []);

  const loadCustomUrl = () => {
    if (customUrl) {
      setIframeUrl(customUrl);
      
      // Atualiza URL da página
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('url', customUrl);
      window.history.pushState({}, '', newUrl.toString());
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-accent" />
            Visualizador Web Universal
          </CardTitle>
          <p className="text-sm text-muted-foreground">Carregue qualquer site em um iframe seguro</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/10 p-4 rounded border border-accent/30">
            <p className="text-sm text-accent mb-2">🖥️ Navegação Protegida</p>
            <p className="text-xs text-accent/80">Visualize sites externos com segurança usando nossa tecnologia de sandbox</p>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Digite uma URL para carregar..."
              className="flex-1"
            />
            <Button onClick={loadCustomUrl} variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Carregar
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            URL atual: <code className="bg-muted px-2 py-1 rounded text-xs">{iframeUrl}</code>
          </div>
          
          <Card className="border-primary/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">🌐 Conteúdo Carregado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded bg-background">
                <iframe
                  src={iframeUrl}
                  className="w-full h-64 rounded"
                  title="Visualizador Web"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🔗 Parâmetros suportados:</strong>
              <div className="mt-1 font-mono text-xs">
                ?url=https://example.com<br />
                ?url=data:text/html,&lt;h1&gt;Hello&lt;/h1&gt;
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Este sistema aceita qualquer URL, incluindo data URLs. Você pode criar HTML inline usando o esquema data:...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge14;