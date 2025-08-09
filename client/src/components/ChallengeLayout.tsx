import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { challenges, getChallengeById } from '@/data/challenges';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Lightbulb, Eye, RotateCcw, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChallengeLayoutProps {
  children: React.ReactNode;
  challengeId: number;
}

export const ChallengeLayout = ({ children, challengeId }: ChallengeLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { progress, useHint, viewSolution } = useProgress();
  const [currentHint, setCurrentHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const challenge = getChallengeById(challengeId);
  const isCompleted = progress.completedChallenges.includes(challengeId);
  const hintsUsed = progress.hintsUsed[challengeId] || 0;
  const solutionViewed = progress.solutionsViewed.includes(challengeId);

  if (!challenge) {
    return <div>Desafio não encontrado</div>;
  }

  const nextChallenge = challenges.find(c => c.id === challengeId + 1);
  const prevChallenge = challenges.find(c => c.id === challengeId - 1);

  const handleUseHint = () => {
    if (currentHint < challenge.hints.length) {
      useHint(challengeId);
      setCurrentHint(currentHint + 1);
      toast({
        title: "💡 Dica revelada!",
        description: challenge.hints[currentHint],
        duration: 5000,
      });
    }
  };

  const handleViewSolution = () => {
    viewSolution(challengeId);
    setShowSolution(true);
    toast({
      title: "🔍 Solução revelada!",
      description: "A solução foi adicionada ao seu histórico.",
      variant: "destructive",
    });
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background matrix-bg">
      {/* Header */}
      <div className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
              
              <div className="h-6 w-px bg-border" />
              
              <div>
                <h1 className="text-xl font-bold terminal-glow">
                  #{challenge.id}: {challenge.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {challenge.category.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {challenge.vulnerabilityType.toUpperCase()}
                  </Badge>
                  {isCompleted && (
                    <Badge variant="default" className="text-xs bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      COMPLETO
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUseHint}
                disabled={currentHint >= challenge.hints.length}
                className="flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Dica ({hintsUsed}/{challenge.hints.length})
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="warning" size="sm" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Gabarito
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
                      Tem certeza?
                    </DialogTitle>
                    <DialogDescription>
                      Ver o gabarito vai marcar este desafio como "solução vista" no seu progresso.
                      Tente usar as dicas primeiro!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button 
                      onClick={handleViewSolution}
                      variant="warning"
                      className="w-full"
                    >
                      Sim, quero ver a solução
                    </Button>
                    {showSolution && (
                      <Card className="border-accent/50 bg-accent/10">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2">💯 Solução:</h4>
                          <code className="block bg-muted p-3 rounded text-sm font-mono">
                            {challenge.solution}
                          </code>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Instructions */}
        <Card className="mb-8 border-primary/30">
          <CardHeader>
            <CardTitle className="text-lg">📋 Instruções</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{challenge.description}</p>
            <ul className="space-y-2">
              {challenge.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-primary font-bold">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Challenge Content */}
        {children}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <div>
            {prevChallenge && (
              <Button
                variant="outline"
                onClick={() => navigate(`/challenge/${prevChallenge.id}`)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                #{prevChallenge.id}: {prevChallenge.title}
              </Button>
            )}
          </div>
          
          <div>
            {nextChallenge && (
              <Button
                variant="terminal"
                onClick={() => navigate(`/challenge/${nextChallenge.id}`)}
                className="flex items-center gap-2"
              >
                #{nextChallenge.id}: {nextChallenge.title}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};