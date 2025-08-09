import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, Zap, Crown, ArrowRight, Code, Lock, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "50+ Desafios Únicos",
      description: "Cada fase é uma aplicação diferente com vulnerabilidades únicas",
      color: "text-success"
    },
    {
      icon: Zap,
      title: "Progressão Inteligente",
      description: "Do básico ao avançado com hints educativos",
      color: "text-warning"
    },
    {
      icon: Shield,
      title: "XSS na Prática",
      description: "Aprenda explorando vulnerabilidades reais",
      color: "text-primary"
    },
    {
      icon: Crown,
      title: "Auto-Recuperação",
      description: "Sistema resiliente que se recompõe automaticamente",
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background matrix-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/30">
              <Shield className="h-16 w-16 text-primary terminal-glow" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 terminal-glow">
            XSS Security Lab
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Aprenda Cross-Site Scripting (XSS) através de desafios práticos interativos.
            Cada fase é uma aplicação vulnerável única que te ensina como hackear ela própria.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-lg px-8 py-6"
              variant="terminal"
            >
              <Code className="h-5 w-5" />
              Iniciar Laboratório
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/challenge/1')}
              className="flex items-center gap-2 text-lg px-8 py-6"
            >
              <Target className="h-5 w-5" />
              Primeiro Desafio
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-primary/20 hover:border-primary/40 transition-all">
                  <CardContent className="pt-6 text-center">
                    <IconComponent className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="border-t border-primary/20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 terminal-glow">
              O que você vai aprender
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-accent" />
                    Tipos de XSS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="outline">Reflected XSS</Badge>
                  <Badge variant="outline">Stored XSS</Badge>
                  <Badge variant="outline">DOM-based XSS</Badge>
                  <Badge variant="outline">Blind XSS</Badge>
                  <Badge variant="outline">Filter Bypass</Badge>
                  <Badge variant="outline">Polyglot Payloads</Badge>
                </CardContent>
              </Card>

              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-success" />
                    Metodologia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• Identificação de pontos de injeção</p>
                  <p>• Análise de filtros e proteções</p>
                  <p>• Desenvolvimento de payloads</p>
                  <p>• Técnicas de bypass avançadas</p>
                  <p>• Exploração em diferentes contextos</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto border-accent/50 bg-accent/5">
          <CardContent className="pt-8 pb-8">
            <h3 className="text-2xl font-bold mb-4">Pronto para começar?</h3>
            <p className="text-muted-foreground mb-6">
              Entre no laboratório e comece sua jornada de aprendizado em segurança web.
              Cada desafio é único e vai te ensinar algo novo!
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/dashboard')}
              variant="exploit"
              className="flex items-center gap-2 mx-auto"
            >
              <Shield className="h-5 w-5" />
              Acessar Laboratório
              <ArrowRight className="h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
