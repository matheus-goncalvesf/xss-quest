export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: 'basic' | 'intermediate' | 'advanced' | 'expert';
  difficulty: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  hints: string[];
  solution: string;
  vulnerabilityType: 'reflected' | 'stored' | 'dom' | 'url' | 'filter-bypass' | 'polyglot' | 'blind';
  instructions: string[];
  component: string; // Nome do componente da fase
}

export interface UserProgress {
  completedChallenges: number[];
  hintsUsed: Record<number, number>;
  solutionsViewed: number[];
}