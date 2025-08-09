import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const Challenge2 = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "João",
      content: "Adorei o site! Muito bem feito.",
      timestamp: "2024-01-15 14:30"
    },
    {
      id: 2,
      author: "Maria",
      content: "Concordo! A funcionalidade é excelente.",
      timestamp: "2024-01-15 15:45"
    }
  ]);
  const { completeChallenge } = useProgress();

  const handleAddComment = () => {
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: comments.length + 1,
      author: "Visitante",
      content: comment,
      timestamp: new Date().toLocaleString('pt-BR')
    };

    setComments([...comments, newComment]);
    setComment('');

    // Verifica se contém XSS
    if (comment.toLowerCase().includes('<script>') && comment.toLowerCase().includes('alert')) {
      setTimeout(() => {
        completeChallenge(2);
      }, 1000);
    }
  };

  return (
    <ChallengeLayout challengeId={2}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="terminal-glow text-center">
              Blog Tecnológico - Comentários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none mb-6">
              <h3 className="text-xl font-semibold mb-4">
                "As Novas Tendências em Desenvolvimento Web"
              </h3>
              <p className="text-muted-foreground mb-4">
                O desenvolvimento web continua evoluindo rapidamente. Com o surgimento de novas 
                tecnologias e frameworks, é essencial se manter atualizado para criar aplicações 
                modernas e seguras.
              </p>
              <p className="text-muted-foreground">
                Deixe seu comentário abaixo e compartilhe sua opinião sobre o artigo!
              </p>
            </div>

            {/* Comments Section */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-lg">Comentários ({comments.length})</h4>
              
              {comments.map((commentItem) => (
                <Card key={commentItem.id} className="border-l-4 border-l-primary/30">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {commentItem.author.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{commentItem.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {commentItem.timestamp}
                          </span>
                        </div>
                        <div 
                          className="text-sm"
                          dangerouslySetInnerHTML={{ __html: commentItem.content }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Comment Form */}
            <Card className="border-accent/30 bg-accent/5">
              <CardHeader>
                <CardTitle className="text-lg">Adicionar Comentário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Escreva seu comentário aqui... (HTML é permitido para formatação!)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
                <Button 
                  onClick={handleAddComment}
                  className="w-full"
                  variant="terminal"
                  disabled={!comment.trim()}
                >
                  Publicar Comentário
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 text-warning">🎯 Objetivo</h4>
            <p className="text-sm">
              Este blog permite comentários com HTML para "formatação rica". Os comentários são 
              salvos e exibidos para todos os visitantes. Será que isso é seguro?
            </p>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge2;