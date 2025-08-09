import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { challenges, getChallengesByCategory } from '@/data/challenges';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Target, Zap, Crown, Trophy, Lock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'intermediate' | 'advanced' | 'expert'>('all');

  const categoryIcons = {
    basic: Target,
    intermediate: Zap,
    advanced: Shield,
    expert: Crown
  };

  const categoryColors = {
    basic: 'bg-success/20 text-success border-success/30',
    intermediate: 'bg-warning/20 text-warning border-warning/30',
    advanced: 'bg-accent/20 text-accent border-accent/30',
    expert: 'bg-destructive/20 text-destructive border-destructive/30'
  };

  const filteredChallenges = selectedCategory === 'all' 
    ? challenges 
    : getChallengesByCategory(selectedCategory);

  const completionRate = (progress.completedChallenges.length / challenges.length) * 100;

  return (
    <div className="min-h-screen bg-background matrix-bg">
      {/* Header */}
      <div className="border-b border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold terminal-glow flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                XSS Security Lab
              </h1>
              <p className="text-muted-foreground mt-2">
                Aprenda XSS através de desafios práticos interativos
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-warning" />
                <span className="text-lg font-semibold">
                  {progress.completedChallenges.length}/{challenges.length}
                </span>
              </div>
              <Progress value={completionRate} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'terminal' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            Todos os Desafios
          </Button>
          {(['basic', 'intermediate', 'advanced', 'expert'] as const).map((category) => {
            const Icon = categoryIcons[category];
            const count = getChallengesByCategory(category).length;
            const completed = getChallengesByCategory(category).filter(
              c => progress.completedChallenges.includes(c.id)
            ).length;
            
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'terminal' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <Badge variant="secondary" className="ml-1">
                  {completed}/{count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => {
            const isCompleted = progress.completedChallenges.includes(challenge.id);
            const hintsUsed = progress.hintsUsed[challenge.id] || 0;
            const solutionViewed = progress.solutionsViewed.includes(challenge.id);
            const CategoryIcon = categoryIcons[challenge.category];

            return (
              <Card 
                key={challenge.id}
                className={`transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${
                  isCompleted 
                    ? 'border-success/50 bg-success/5' 
                    : 'border-primary/20 hover:border-primary/40'
                } ${isCompleted ? '' : 'vuln-indicator'}`}
                onClick={() => navigate(`/challenge/${challenge.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                      <Badge className={categoryColors[challenge.category]}>
                        {challenge.category}
                      </Badge>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="h-5 w-5 text-success" />
                    )}
                  </div>
                  <CardTitle className="text-lg">
                    #{challenge.id}: {challenge.title}
                  </CardTitle>
                  <CardDescription>
                    {challenge.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>Dificuldade:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < challenge.difficulty 
                                ? 'bg-accent' 
                                : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {hintsUsed > 0 && (
                        <span>💡 {hintsUsed}</span>
                      )}
                      {solutionViewed && (
                        <span>🔍</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border">
                    <Badge variant="outline" className="text-xs">
                      {challenge.vulnerabilityType.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum desafio encontrado</h3>
            <p className="text-muted-foreground">
              Tente uma categoria diferente ou volte mais tarde para novos desafios.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;