import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Triangle, Zap, Code } from 'lucide-react';

const Challenge21 = () => {
  const [userData, setUserData] = useState({ name: 'Usuário', role: 'user' });
  const [newName, setNewName] = useState('');
  const [expression, setExpression] = useState('');
  const { completeChallenge } = useProgress();

  const updateUser = () => {
    setUserData(prev => ({ ...prev, name: newName }));
    
    // Verifica se é uma Angular expression maliciosa
    if (newName.includes('constructor.constructor') && newName.includes('alert')) {
      setTimeout(() => {
        completeChallenge(21);
      }, 300);
    }
  };

  const evaluateExpression = () => {
    try {
      // Simula avaliação de Angular expression (vulnerável)
      if (expression.includes('constructor.constructor')) {
        completeChallenge(21);
        return '🚨 ANGULAR TEMPLATE COMPROMETIDO!';
      }
      
      // Simulação básica de algumas expressões Angular
      if (expression === '1+1') return '2';
      if (expression === 'userData.name') return userData.name;
      if (expression === 'userData.role') return userData.role;
      
      return 'Expressão avaliada';
    } catch (e) {
      return 'Erro na expressão';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Triangle className="h-5 w-5 text-destructive" />
            Angular Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">Framework moderno para aplicações web dinâmicas</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">Angular Framework v15+</p>
            </div>
            <p className="text-xs text-destructive/80">Template binding bidirecional com expressões dinâmicas</p>
          </div>
          
          <Card className="border-muted bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">👤 Perfil do Usuário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <strong>Nome:</strong> <span>{`{{userData.name}}`}</span> → {userData.name}
              </div>
              <div className="text-sm">
                <strong>Função:</strong> <span>{`{{userData.role}}`}</span> → {userData.role}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Atualizar nome:</label>
                <div className="flex gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Novo nome..."
                    className="flex-1"
                  />
                  <Button onClick={updateUser}>
                    Salvar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code className="h-4 w-4" />
                Console de Expressões
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  placeholder="Digite uma expressão Angular..."
                  className="flex-1 font-mono text-sm"
                />
                <Button onClick={() => setExpression(evaluateExpression())}>
                  Avaliar
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <strong>Exemplos:</strong> userData.name | userData.role | 1+1
              </div>
            </CardContent>
          </Card>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🅰️ Sobre Angular:</strong><br />
              Framework que usa template expressions {'{{}}'} para binding de dados. Versões antigas podem ser vulneráveis a template injection.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Em Angular antigo, expressões podem acessar objetos JavaScript nativos. Tente explorar o constructor...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge21;