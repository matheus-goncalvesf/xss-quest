import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Save } from 'lucide-react';

const Challenge3 = () => {
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    bio: 'Desenvolvedor apaixonado por tecnologia',
    company: 'TechCorp'
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const { completeChallenge } = useProgress();

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);

    // Verifica se contém XSS no nome
    if (formData.name.toLowerCase().includes('onerror') || 
        formData.name.toLowerCase().includes('<script>') ||
        formData.name.toLowerCase().includes('<img')) {
      setTimeout(() => {
        completeChallenge(3);
      }, 1000);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ChallengeLayout challengeId={3}>
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="terminal-glow text-center flex items-center justify-center gap-2">
              <User className="h-6 w-6" />
              Perfil do Usuário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Display */}
              <div className="md:w-1/2">
                <Card className="border-primary/30">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarFallback className="text-2xl">
                          {profile.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <h2 
                        className="text-2xl font-bold terminal-glow"
                        dangerouslySetInnerHTML={{ __html: profile.name }}
                      />
                      
                      <Badge variant="outline" className="mt-2">
                        {profile.company}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>{profile.email}</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <User className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold">Biografia</p>
                          <p className="text-sm text-muted-foreground">{profile.bio}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Membro desde Janeiro 2024
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Edit Form */}
              <div className="md:w-1/2">
                <Card className="border-accent/30 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Editar Perfil</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {editing ? (
                      <>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Nome Completo</label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Seu nome completo"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Este nome aparecerá publicamente no seu perfil
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="seu@email.com"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Empresa</label>
                          <Input
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="Nome da empresa"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Biografia</label>
                          <Input
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            placeholder="Conte um pouco sobre você"
                          />
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button 
                            onClick={handleSave}
                            variant="success"
                            className="flex items-center gap-2"
                          >
                            <Save className="h-4 w-4" />
                            Salvar
                          </Button>
                          <Button 
                            onClick={() => {
                              setEditing(false);
                              setFormData(profile);
                            }}
                            variant="outline"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Button 
                        onClick={() => setEditing(true)}
                        variant="terminal"
                        className="w-full"
                      >
                        Editar Perfil
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 text-warning">🎯 Objetivo</h4>
            <p className="text-sm">
              Este sistema de perfil exibe o nome do usuário em destaque na página. O nome é salvo
              no sistema e pode conter qualquer caractere. Explore as possibilidades de personalização...
            </p>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge3;