import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Code, Terminal } from 'lucide-react';

const Challenge7 = () => {
  const [username, setUsername] = useState('');
  const [displayContent, setDisplayContent] = useState('');
  const { completeChallenge } = useProgress();

  const updateProfile = () => {
    // Simula manipulação DOM insegura
    const content = `Bem-vindo, ${username}!`;
    setDisplayContent(content);
    
    // Verifica se conseguiu executar XSS
    if (username.includes('onerror') && username.includes('alert')) {
      setTimeout(() => {
        completeChallenge(7);
      }, 100);
    }
  };

  useEffect(() => {
    // Simula innerHTML inseguro no DOM
    const element = document.getElementById('profile-display');
    if (element && displayContent) {
      element.innerHTML = displayContent;
    }
  }, [displayContent]);

  return (
    <div className="space-y-6">
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-warning" />
            Perfil Dinâmico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded border">
            <p className="text-sm text-muted-foreground mb-2">🔧 Sistema de Perfil Avançado</p>
            <p className="text-xs">Usando manipulação DOM dinâmica para melhor performance...</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome de usuário:</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full"
            />
          </div>
          
          <Button onClick={updateProfile} className="w-full" variant="terminal">
            Atualizar Perfil
          </Button>
          
          {displayContent && (
            <Card className="mt-4 border-primary/50 bg-primary/5">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <Code className="h-4 w-4 mt-0.5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Perfil Atual:</p>
                    <div 
                      id="profile-display"
                      className="text-sm mt-1 p-2 bg-background rounded border"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> Este sistema usa innerHTML para inserir o nome diretamente no DOM. Analise o código JavaScript da página...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge7;