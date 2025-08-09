import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Braces, Zap, Code2 } from 'lucide-react';

const Challenge17 = () => {
  const [templateData, setTemplateData] = useState({ name: 'Usuário' });
  const [newName, setNewName] = useState('');
  const [rendered, setRendered] = useState('');
  const { completeChallenge } = useProgress();

  const renderTemplate = () => {
    const data = { ...templateData, name: newName };
    
    // Template engine simulado (vulnerável)
    let template = 'Olá, {{name}}! Bem-vindo ao sistema.';
    
    try {
      // Substitui {{name}} - vulnerável a template injection
      const result = template.replace(/{{(\w+)}}/g, (match, key) => {
        if (key === 'name' && data[key].includes('constructor.constructor')) {
          // Simula execução do payload
          completeChallenge(17);
          return '🚨 TEMPLATE ENGINE COMPROMETIDO!';
        }
        return data[key] || match;
      });
      
      setRendered(result);
    } catch (e) {
      setRendered('Erro no template: ' + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Braces className="h-5 w-5 text-accent" />
            Motor de Templates Avançado
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sistema de renderização dinâmica v3.0</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/10 p-4 rounded border border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-accent" />
              <p className="text-sm text-accent font-medium">Template Engine Ativo</p>
            </div>
            <p className="text-xs text-accent/80">Processamento de templates com sintaxe {{variavel}} para máxima flexibilidade</p>
          </div>
          
          <Card className="border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Template Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/80 text-green-400 p-3 rounded font-mono text-sm">
                Olá, {'{{name}}'}! Bem-vindo ao sistema.
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do usuário:</label>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Digite o nome para o template..."
              className="w-full"
            />
          </div>
          
          <Button onClick={renderTemplate} className="w-full" variant="terminal">
            Renderizar Template
          </Button>
          
          {rendered && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">🖼️ Resultado Renderizado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background border rounded p-3">
                  {rendered}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🔧 Como funciona:</strong><br />
              Templates usam sintaxe {'{{variavel}}'} que é substituída por dados dinâmicos do usuário.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Template engines podem ser vulneráveis quando permitem acesso a objetos JavaScript nativos. Que tal explorar o constructor?
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge17;