import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, Star, TrendingUp } from 'lucide-react';

const Challenge4 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { completeChallenge } = useProgress();

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      // Simula resultados de busca
      const mockResults = [
        'Como criar aplicações React seguras',
        'Introdução ao TypeScript para iniciantes',
        'Melhores práticas de segurança web'
      ];
      setSearchResults(mockResults);

      // Verifica XSS na URL
      if (query.toLowerCase().includes('<script>') && query.toLowerCase().includes('alert')) {
        setTimeout(() => {
          completeChallenge(4);
        }, 1000);
      }
    }
  }, [query, completeChallenge]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    }
  };

  const featuredArticles = [
    { title: "Segurança em Aplicações Web", category: "Segurança", views: "1.2k" },
    { title: "React Hooks Avançados", category: "Frontend", views: "890" },
    { title: "Banco de Dados NoSQL", category: "Backend", views: "756" },
  ];

  return (
    <ChallengeLayout challengeId={4}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="terminal-glow text-center flex items-center justify-center gap-2">
              <BookOpen className="h-6 w-6" />
              TechBlog - Base de Conhecimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search Section */}
            <div className="space-y-6">
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Pesquisar artigos, tutoriais, dicas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSearch}
                      variant="terminal"
                      className="flex items-center gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Buscar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Search Results */}
              {query && (
                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Resultados para: <span dangerouslySetInnerHTML={{ __html: query }} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {searchResults.length > 0 ? (
                      <div className="space-y-3">
                        {searchResults.map((result, index) => (
                          <Card key={index} className="p-4 hover:bg-accent/10 cursor-pointer">
                            <h3 className="font-semibold">{result}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Artigo sobre desenvolvimento web e boas práticas de programação...
                            </p>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Nenhum resultado encontrado para "{query}"
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Featured Content */}
              {!query && (
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="h-5 w-5 text-warning" />
                        Artigos em Destaque
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {featuredArticles.map((article, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded border">
                          <div>
                            <h4 className="font-semibold text-sm">{article.title}</h4>
                            <p className="text-xs text-muted-foreground">{article.category}</p>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {article.views}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Categorias Populares</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {['JavaScript', 'React', 'Node.js', 'Segurança', 'DevOps', 'Database'].map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => {
                            setSearchTerm(category);
                            setSearchParams({ q: category });
                          }}
                        >
                          {category}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 text-warning">🎯 Objetivo</h4>
            <p className="text-sm">
              Este sistema de busca reflete o termo pesquisado na página para mostrar o que o usuário 
              está procurando. Observe como o termo aparece na URL e na página. Será que é possível 
              fazer algo interessante com isso?
            </p>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge4;