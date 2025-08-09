import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Cog, Play, Globe } from 'lucide-react';

const Challenge27 = () => {
  const [swCode, setSwCode] = useState('');
  const [swStatus, setSwStatus] = useState('Not registered');
  const [intercepted, setIntercepted] = useState('');
  const { completeChallenge } = useProgress();

  const registerServiceWorker = async () => {
    try {
      // Simula registro de Service Worker malicioso
      const code = swCode || defaultServiceWorker;
      
      setSwStatus('Registering...');
      
      // Verifica se é um SW malicioso
      if (code.includes('respondWith') && code.includes('script') && code.includes('alert')) {
        setTimeout(() => {
          setSwStatus('🚨 Malicious SW Registered!');
          setIntercepted('Service Worker intercepting all requests and injecting malicious content');
          completeChallenge(27);
        }, 1000);
      } else {
        setTimeout(() => {
          setSwStatus('Service Worker registered');
          setIntercepted('Service Worker active - intercepting requests');
        }, 1000);
      }
      
    } catch (error) {
      setSwStatus('Registration failed: ' + error);
    }
  };

  const defaultServiceWorker = `// Service Worker básico
self.addEventListener('install', event => {
  console.log('SW installed');
});

self.addEventListener('fetch', event => {
  console.log('Intercepting:', event.request.url);
});`;

  const insertMaliciousExample = () => {
    const maliciousSW = `// Service Worker malicioso
self.addEventListener('fetch', event => {
  // Intercepta todas as requisições
  event.respondWith(
    new Response(
      '<script>alert("Service Worker XSS!")</script>',
      {
        headers: { 'Content-Type': 'text/html' }
      }
    )
  );
});`;
    setSwCode(maliciousSW);
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5 text-primary" />
            Service Worker Manager
          </CardTitle>
          <p className="text-sm text-muted-foreground">Gerenciamento avançado de Service Workers</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-primary/10 p-4 rounded border border-primary/30">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-4 w-4 text-primary" />
              <p className="text-sm text-primary font-medium">Service Worker API</p>
            </div>
            <p className="text-xs text-primary/80">Controle total sobre requisições de rede e cache offline</p>
          </div>
          
          <Card className="border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">📊 Status do Service Worker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/80 text-green-400 p-3 rounded font-mono text-sm">
                Status: {swStatus}<br />
                {intercepted && (
                  <>
                    Intercepting: {intercepted}<br />
                    Scope: / (all requests)
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Código do Service Worker:</label>
            <Textarea
              value={swCode}
              onChange={(e) => setSwCode(e.target.value)}
              placeholder={defaultServiceWorker}
              className="w-full font-mono text-sm"
              rows={10}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={registerServiceWorker} className="flex-1 flex items-center gap-2">
              <Play className="h-4 w-4" />
              Registrar Service Worker
            </Button>
            <Button onClick={insertMaliciousExample} variant="outline">
              🎯 Exploit
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>⚙️ Sobre Service Workers:</strong><br />
              Scripts que rodam em background, interceptando e modificando requisições de rede. Podem ser explorados para XSS persistente.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Um SW malicioso pode interceptar todas as requisições e injetar JavaScript em qualquer response...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge27;