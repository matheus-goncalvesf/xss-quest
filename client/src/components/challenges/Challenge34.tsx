import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, Copy, ExternalLink } from 'lucide-react';

const Challenge34 = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urlHistory, setUrlHistory] = useState([
    { original: 'https://example.com/very/long/path/to/resource', short: 'short.ly/abc123' },
    { original: 'https://github.com/user/repository', short: 'short.ly/def456' }
  ]);
  const { completeChallenge } = useProgress();

  const shortenUrl = () => {
    if (!originalUrl.trim()) return;
    
    // Gera URL encurtada
    const shortCode = Math.random().toString(36).substring(2, 8);
    const newShortUrl = `short.ly/${shortCode}`;
    
    setShortUrl(newShortUrl);
    setUrlHistory([{ original: originalUrl, short: newShortUrl }, ...urlHistory.slice(0, 4)]);
    
    // Verifica se é javascript: URL
    if (originalUrl.toLowerCase().startsWith('javascript:') && originalUrl.includes('alert')) {
      setTimeout(() => {
        completeChallenge(34);
      }, 500);
    }
  };

  const testShortUrl = () => {
    // Simula clique no link encurtado
    if (originalUrl.toLowerCase().startsWith('javascript:')) {
      // ⚠️ Vulnerabilidade: executa javascript: URLs
      try {
        eval(originalUrl.substring(11)); // Remove 'javascript:'
      } catch (e) {
        console.error('Erro ao executar JavaScript:', e);
      }
    } else {
      window.open(originalUrl, '_blank');
    }
  };

  return (
    <ChallengeLayout challengeId={34}>
      <div className="max-w-2xl mx-auto">
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Link className="h-5 w-5 text-warning" />
              Encurtador de URLs
            </CardTitle>
            <p className="text-sm text-muted-foreground">Transforme URLs longas em links curtos e fáceis de compartilhar</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">URL para encurtar:</label>
              <Input
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://exemplo.com/url/muito/longa/para/encurtar"
                className="w-full"
              />
            </div>
            
            <Button onClick={shortenUrl} className="w-full" variant="terminal">
              Encurtar URL
            </Button>
            
            {shortUrl && (
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">URL Encurtada:</p>
                      <div className="flex items-center gap-2 p-3 bg-background border rounded">
                        <span className="flex-1 font-mono text-sm">{shortUrl}</span>
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">URL Original:</p>
                      <div className="p-3 bg-background border rounded">
                        {/* ⚠️ Vulnerabilidade: URL original exibida sem sanitização */}
                        <span className="text-sm font-mono break-all">{originalUrl}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={testShortUrl} 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Testar Link Encurtado
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {urlHistory.length > 0 && (
              <Card className="border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Histórico de URLs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {urlHistory.map((item, index) => (
                      <div key={index} className="text-xs p-2 bg-muted/50 rounded">
                        <div className="font-mono text-primary">{item.short}</div>
                        <div className="text-muted-foreground truncate">{item.original}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> O sistema aceita qualquer URL válida, incluindo protocolos especiais como javascript:. Que tal testar?
            </div>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge34;