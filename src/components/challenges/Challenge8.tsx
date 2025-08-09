import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Eye } from 'lucide-react';

const Challenge8 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const { completeChallenge } = useProgress();

  const handlePreview = () => {
    setShowPreview(true);
    
    // Verifica se algum campo contém XSS
    const hasXSS = Object.values(formData).some(value => 
      value.includes('script') && value.includes('alert')
    );
    
    if (hasXSS) {
      setTimeout(() => {
        completeChallenge(8);
      }, 100);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-success/30 bg-success/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-success" />
            Contato Empresarial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome:</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Seu nome completo"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail:</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="seu@email.com"
                type="email"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Assunto:</label>
            <Input
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Assunto da mensagem"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Mensagem:</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Descreva seu interesse ou dúvida..."
              rows={4}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visualizar
            </Button>
            <Button className="flex-1">
              Enviar Mensagem
            </Button>
          </div>
          
          {showPreview && (
            <Card className="mt-4 border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">📋 Preview da Mensagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div><strong>De:</strong> <span dangerouslySetInnerHTML={{ __html: formData.name }} /> ({formData.email})</div>
                <div><strong>Assunto:</strong> <span dangerouslySetInnerHTML={{ __html: formData.subject }} /></div>
                <div className="border-t pt-3">
                  <strong>Mensagem:</strong>
                  <div 
                    className="mt-2 p-3 bg-background rounded border"
                    dangerouslySetInnerHTML={{ __html: formData.message }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> O preview mostra os dados exatamente como você digitou. Teste diferentes campos para ver onde a vulnerabilidade pode estar...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge8;