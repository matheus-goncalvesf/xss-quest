import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { ChallengeLayout } from '@/components/ChallengeLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Download } from 'lucide-react';

const Challenge32 = () => {
  const [text, setText] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const { completeChallenge } = useProgress();

  const generateQR = () => {
    if (!text.trim()) return;
    
    setQrGenerated(true);
    
    // Verifica se contém XSS
    if (text.includes('<script>') && text.includes('alert')) {
      setTimeout(() => {
        completeChallenge(32);
      }, 500);
    }
  };

  return (
    <ChallengeLayout challengeId={32}>
      <div className="max-w-2xl mx-auto">
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <QrCode className="h-5 w-5 text-accent" />
              Gerador de QR Code
            </CardTitle>
            <p className="text-sm text-muted-foreground">Transforme qualquer texto em QR Code</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Texto para o QR Code:</label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite o texto que será codificado..."
                className="w-full"
              />
            </div>
            
            <Button onClick={generateQR} className="w-full" variant="terminal">
              Gerar QR Code
            </Button>
            
            {qrGenerated && (
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="pt-6 text-center">
                  <div className="mb-4">
                    {/* Simulação de QR Code */}
                    <div className="w-48 h-48 mx-auto bg-white border-2 border-black flex items-center justify-center">
                      <QrCode className="h-32 w-32 text-black" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">QR Code gerado com sucesso!</p>
                    <p className="text-xs text-muted-foreground">Conteúdo codificado:</p>
                    
                    {/* ⚠️ Vulnerabilidade: HTML não sanitizado */}
                    <div 
                      className="p-3 bg-background border rounded text-sm"
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Baixar QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> O texto é exibido abaixo do QR code para confirmação. Será que suporta formatação HTML?
            </div>
          </CardContent>
        </Card>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge32;