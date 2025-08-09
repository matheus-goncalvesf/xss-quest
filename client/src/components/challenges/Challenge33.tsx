import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

const Challenge33 = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "João Silva",
      rating: 5,
      text: "Excelente serviço! Recomendo a todos.",
      date: "2024-01-15"
    },
    {
      id: 2,
      author: "Maria Santos",
      rating: 4,
      text: "Muito bom, apenas alguns detalhes a melhorar.",
      date: "2024-01-14"
    }
  ]);
  const { completeChallenge } = useProgress();

  const submitReview = () => {
    if (!review.trim()) return;
    
    const newReview = {
      id: reviews.length + 1,
      author: "Usuário Anônimo",
      rating,
      text: review,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews([newReview, ...reviews]);
    setReview('');
    
    // Verifica se contém XSS
    if (review.includes('onerror') && review.includes('alert')) {
      setTimeout(() => {
        completeChallenge(33);
      }, 500);
    }
  };

  return (
    <ChallengeLayout challengeId={33}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8 border-success/30 bg-success/5">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-success" />
              Sistema de Avaliações
            </CardTitle>
            <p className="text-sm text-muted-foreground">Compartilhe sua experiência conosco</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sua avaliação (1-5 estrelas):</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 ${star <= rating ? 'text-warning' : 'text-muted-foreground'}`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Comentário:</label>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Conte-nos sobre sua experiência... (HTML é permitido para formatação!)"
                rows={4}
              />
            </div>
            
            <Button onClick={submitReview} className="w-full" variant="terminal">
              Enviar Avaliação
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Avaliações dos Clientes ({reviews.length})
          </h3>
          
          {reviews.map((reviewItem) => (
            <Card key={reviewItem.id} className="border-l-4 border-l-primary/30">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{reviewItem.author}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < reviewItem.rating ? 'text-warning fill-current' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{reviewItem.date}</span>
                </div>
                
                {/* ⚠️ Vulnerabilidade: HTML não sanitizado */}
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: reviewItem.text }}
                />
                
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary">
                    <ThumbsUp className="h-3 w-3" />
                    Útil ({Math.floor(Math.random() * 20)})
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-xs text-muted-foreground p-3 bg-muted/30 rounded">
          💡 <strong>Dica:</strong> O sistema permite HTML para "formatação rica" nas avaliações. Outros usuários verão sua avaliação exatamente como você escreveu.
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge33;