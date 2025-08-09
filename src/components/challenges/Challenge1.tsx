import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Challenge1 = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { completeChallenge } = useProgress();

  const handleSubmit = () => {
    setSubmitted(true);
    
    // Verifica se contém script para marcar como completo
    if (name.toLowerCase().includes('<script>') && name.toLowerCase().includes('alert')) {
      setTimeout(() => {
        completeChallenge(1);
      }, 1000);
    }
  };

  return (
    <ChallengeLayout challengeId={1}>
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center terminal-glow">
              Sistema de Boas-vindas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              Digite seu nome para receber uma mensagem personalizada!
            </p>
            
            <div className="space-y-4">
              <Input
                placeholder="Digite seu nome aqui..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center"
              />
              
              <Button 
                onClick={handleSubmit}
                className="w-full"
                variant="terminal"
              >
                Enviar Saudação
              </Button>
            </div>

            {submitted && (
              <Card className="mt-6 border-accent/50 bg-accent/5">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      Bem-vindo, <span dangerouslySetInnerHTML={{ __html: name }} />!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Esperamos que você aproveite nosso sistema seguro!
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 text-warning">🎯 Objetivo</h4>
            <p className="text-sm">
              Este é um sistema básico que exibe seu nome de volta. Mas será que está realmente seguro?
              Tente inserir algo que não deveria estar em um nome...
            </p>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge1;