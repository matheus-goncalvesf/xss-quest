import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge38: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [userProfile, setUserProfile] = useState({
    name: 'João Silva',
    bio: 'Desenvolvedor apaixonado por tecnologia',
    email: 'joao@example.com'
  });

  const executeQuery = () => {
    try {
      // Simular processamento GraphQL
      if (query.includes('mutation') && query.includes('updateProfile')) {
        // Extrair valor do bio da mutation
        const bioMatch = query.match(/bio:\s*"([^"]+)"/);
        if (bioMatch) {
          const newBio = bioMatch[1];
          setUserProfile(prev => ({ ...prev, bio: newBio }));
          setResult({
            data: {
              updateProfile: {
                success: true,
                user: { ...userProfile, bio: newBio }
              }
            }
          });
        }
      } else if (query.includes('query') && query.includes('user')) {
        setResult({
          data: {
            user: userProfile
          }
        });
      } else {
        setResult({
          errors: [{ message: 'Query inválida' }]
        });
      }
    } catch (error) {
      setResult({
        errors: [{ message: 'Erro ao processar query' }]
      });
    }
  };

  return (
    <ChallengeLayout challengeId={38}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🌐 GraphQL API Playground</h2>
          <p className="text-muted-foreground mb-4">
            Explore nossa API GraphQL. Use queries e mutations para interagir com dados do usuário.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">GraphQL Query/Mutation:</label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-40 p-3 border rounded-md font-mono text-sm"
                  placeholder={`query {
  user {
    name
    bio
    email
  }
}

# ou

mutation {
  updateProfile(bio: "Nova bio aqui") {
    success
    user {
      name
      bio
    }
  }
}`}
                />
              </div>
              
              <button
                onClick={executeQuery}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                Executar Query
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Resultado:</label>
                <pre className="bg-muted p-3 rounded-md text-sm overflow-auto h-40">
                  {result ? JSON.stringify(result, null, 2) : 'Nenhum resultado ainda...'}
                </pre>
              </div>
              
              <div className="bg-accent/10 p-4 rounded-md border">
                <h4 className="font-medium mb-2">Perfil Atual:</h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Nome:</strong> {userProfile.name}</p>
                  <p><strong>Email:</strong> {userProfile.email}</p>
                  <p><strong>Bio:</strong> <span dangerouslySetInnerHTML={{ __html: userProfile.bio }} /></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded">
            <p className="text-sm text-warning">
              💡 <strong>Dica:</strong> APIs GraphQL podem aceitar HTML em campos de texto...
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge38;