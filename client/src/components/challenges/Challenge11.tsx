import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const Challenge11 = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(false);
  const { completeChallenge } = useProgress();

  // Simula cookie de sessão
  document.cookie = "sessionToken=abc123; path=/";
  document.cookie = "userRole=admin; path=/";

  const handleLogin = () => {
    setLoginAttempt(true);
    
    // Verifica se conseguiu acessar cookies
    if (credentials.username.includes('document.cookie') && credentials.username.includes('alert')) {
      setTimeout(() => {
        completeChallenge(11);
      }, 100);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            SecureBank Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">Acesso restrito ao sistema</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Usuário:
            </label>
            <Input
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Digite seu usuário"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Senha:</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Digite sua senha"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          
          <Button onClick={handleLogin} className="w-full">
            Entrar
          </Button>
          
          {loginAttempt && (
            <Card className="border-warning/50 bg-warning/5">
              <CardContent className="pt-4">
                <p className="text-sm font-medium mb-2">Dados de Login:</p>
                <div className="bg-black/80 p-3 rounded text-green-400 font-mono text-xs">
                  <div>Usuário: <span dangerouslySetInnerHTML={{ __html: credentials.username }} /></div>
                  <div>Status: Verificando credenciais...</div>
                  <div>Sessão: Carregando dados do usuário...</div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-center text-xs text-muted-foreground">
            <div>Esqueceu sua senha? <span className="text-primary cursor-pointer">Recuperar</span></div>
            <div className="mt-2">Não tem conta? <span className="text-primary cursor-pointer">Cadastre-se</span></div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> Este é um sistema bancário que armazena informações sensíveis em cookies. Será que você consegue acessá-las?
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge11;