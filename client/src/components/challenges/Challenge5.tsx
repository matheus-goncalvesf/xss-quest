import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Heart, Share2, Calendar } from 'lucide-react';

const Challenge5 = () => {
  const [searchParams] = useSearchParams();
  const { completeChallenge } = useProgress();

  const message = searchParams.get('message') || 'Bem-vindo ao nosso sistema!';
  const theme = searchParams.get('theme') || 'default';
  const user = searchParams.get('user') || 'Visitante';

  useEffect(() => {
    // Verifica XSS na URL
    if (message.toLowerCase().includes('<script>') && message.toLowerCase().includes('alert')) {
      setTimeout(() => {
        completeChallenge(5);
      }, 1000);
    }
  }, [message, completeChallenge]);

  const themeColors = {
    default: 'border-primary/30 bg-primary/5',
    dark: 'border-accent/30 bg-accent/10',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5'
  };

  return (
    <ChallengeLayout challengeId={5}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="terminal-glow text-center">
              Sistema de Notificações Personalizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Main Message Display */}
            <Card className={`mb-6 ${themeColors[theme as keyof typeof themeColors] || themeColors.default}`}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 terminal-glow">
                    Olá, {user}!
                  </h2>
                  <div 
                    className="text-lg mb-4"
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                  <Badge variant="outline">
                    Tema: {theme}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Social Feed Mockup */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Feed de Atualizações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { 
                        content: "Nova funcionalidade de temas personalizada foi lançada! 🎨", 
                        author: "Sistema",
                        time: "há 2 horas"
                      },
                      { 
                        content: "Implementamos melhorias de segurança no sistema.", 
                        author: "Admin",
                        time: "há 1 dia"
                      },
                      { 
                        content: "Bem-vindos novos usuários! Esperamos que gostem da plataforma.", 
                        author: "Comunidade",
                        time: "há 2 dias"
                      }
                    ].map((post, index) => (
                      <Card key={index} className="p-4 border-l-4 border-l-primary/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm mb-2">{post.content}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Por {post.author}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-primary">
                            <Heart className="h-3 w-3" />
                            {Math.floor(Math.random() * 50)}
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary">
                            <MessageCircle className="h-3 w-3" />
                            {Math.floor(Math.random() * 20)}
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary">
                            <Share2 className="h-3 w-3" />
                            Compartilhar
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Exemplos de URLs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-semibold mb-2">Experimente estes parâmetros na URL:</p>
                    <div className="space-y-2 font-mono text-xs bg-muted p-3 rounded">
                      <div>?message=Olá mundo!</div>
                      <div>?user=João&message=Bem-vindo!</div>
                      <div>?theme=success&message=Sucesso!</div>
                      <div>?theme=warning&message=Atenção!</div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="font-semibold mb-2">Parâmetros disponíveis:</p>
                    <ul className="space-y-1 text-xs">
                      <li><code>message</code> - Mensagem personalizada</li>
                      <li><code>user</code> - Nome do usuário</li>
                      <li><code>theme</code> - Tema visual (default, dark, success, warning)</li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 p-3 rounded text-xs">
                    <p className="font-semibold mb-1">💡 Dica:</p>
                    <p>
                      Modifique os parâmetros diretamente na URL do navegador para ver 
                      as mudanças em tempo real!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 text-warning">🎯 Objetivo</h4>
            <p className="text-sm">
              Este sistema lê dados diretamente da URL para personalizar a experiência do usuário.
              A mensagem, tema e nome do usuário podem ser definidos através de parâmetros na URL.
              Será que é possível fazer algo além de texto simples?
            </p>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge5;