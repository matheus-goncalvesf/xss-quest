import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Database, Code2 } from 'lucide-react';

const Challenge9 = () => {
  const [userData, setUserData] = useState({
    name: 'Usuário',
    preferences: '{}'
  });
  const [newName, setNewName] = useState('');
  const { completeChallenge } = useProgress();

  const updateUser = () => {
    setUserData({
      ...userData,
      name: newName
    });
    
    // Verifica se conseguiu escape do contexto JSON
    if (newName.includes('</script>') && newName.includes('<script>')) {
      setTimeout(() => {
        completeChallenge(9);
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Dashboard de Usuário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded border">
            <p className="text-sm text-muted-foreground mb-2">⚡ Powered by Real-time Data</p>
            <p className="text-xs">Sistema integrado com JSON dinâmico para performance otimizada</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Atualizar nome:</label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Digite seu novo nome..."
            />
          </div>
          
          <Button onClick={updateUser} className="w-full" variant="terminal">
            Salvar Alterações
          </Button>
          
          <Card className="mt-4 border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Dados do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/80 p-3 rounded text-green-400 font-mono text-xs">
                <script 
                  dangerouslySetInnerHTML={{
                    __html: `
                      var userData = {
                        "name": "${userData.name}",
                        "id": 123,
                        "preferences": ${userData.preferences}
                      };
                      console.log("User loaded:", userData.name);
                    `
                  }}
                />
                <pre>{`var userData = {
  "name": "${userData.name}",
  "id": 123,
  "preferences": ${userData.preferences}
};
console.log("User loaded:", userData.name);`}</pre>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> Observe como seus dados são inseridos no JavaScript. O que acontece se você "escapar" do contexto JSON?
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge9;