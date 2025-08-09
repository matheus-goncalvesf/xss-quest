import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight, Globe } from 'lucide-react';

const Challenge12 = () => {
  const [redirectUrl, setRedirectUrl] = useState('https://example.com');
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { completeChallenge } = useProgress();

  useEffect(() => {
    // Lê parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    if (redirect) {
      setRedirectUrl(redirect);
      
      // Verifica se é um payload JavaScript
      if (redirect.startsWith('javascript:') && redirect.includes('alert')) {
        completeChallenge(12);
      }
    }
  }, []);

  const startRedirect = () => {
    setIsRedirecting(true);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Executa o redirecionamento (vulnerável)
          if (redirectUrl.startsWith('javascript:')) {
            eval(redirectUrl.replace('javascript:', ''));
          } else {
            window.location.href = redirectUrl;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Globe className="h-5 w-5 text-accent" />
            Redirecionamento Seguro
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sistema de redirecionamento confiável</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/10 p-4 rounded border border-accent/30">
            <p className="text-sm text-accent mb-2">🔄 Redirecionamento Automático</p>
            <p className="text-xs text-accent/80">Você será redirecionado para um site externo em breve...</p>
          </div>
          
          <Card className="border-muted">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Destino:</p>
                  <p className="text-xs font-mono bg-muted/50 p-2 rounded mt-1 break-all">
                    {redirectUrl}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {!isRedirecting ? (
            <Button onClick={startRedirect} className="w-full" variant="terminal">
              <ArrowRight className="h-4 w-4 mr-2" />
              Continuar para o site
            </Button>
          ) : (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">{countdown}</div>
                <p className="text-sm">Redirecionando em {countdown} segundo{countdown !== 1 ? 's' : ''}...</p>
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🔗 URL atual:</strong>
              <div className="font-mono text-xs mt-1 break-all">{window.location.href}</div>
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Observe o parâmetro "redirect" na URL. Será que você pode modificá-lo para algo mais interessante?
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge12;