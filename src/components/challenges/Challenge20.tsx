import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Upload, Eye } from 'lucide-react';

const Challenge20 = () => {
  const [svgContent, setSvgContent] = useState('');
  const [preview, setPreview] = useState('');
  const { completeChallenge } = useProgress();

  const defaultSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="blue"/>
  <text x="50" y="55" text-anchor="middle" fill="white">SVG</text>
</svg>`;

  const previewSvg = () => {
    const content = svgContent || defaultSvg;
    setPreview(content);
    
    // Verifica se contém JavaScript malicioso
    if (content.includes('onload') && content.includes('alert')) {
      setTimeout(() => {
        completeChallenge(20);
      }, 300);
    }
  };

  const uploadMaliciousSvg = () => {
    const maliciousSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="red"/>
  <script>alert('SVG XSS')</script>
</svg>`;
    setSvgContent(maliciousSvg);
  };

  return (
    <div className="space-y-6">
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-accent" />
            Galeria de Imagens SVG
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sistema de upload e visualização de gráficos vetoriais</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/10 p-4 rounded border border-accent/30">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="h-4 w-4 text-accent" />
              <p className="text-sm text-accent font-medium">Upload SVG Habilitado</p>
            </div>
            <p className="text-xs text-accent/80">Suporte completo para gráficos vetoriais SVG com preservação de código</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Código SVG:</label>
            <Textarea
              value={svgContent}
              onChange={(e) => setSvgContent(e.target.value)}
              placeholder={defaultSvg}
              className="w-full font-mono text-xs"
              rows={8}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={previewSvg} className="flex-1 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visualizar SVG
            </Button>
            <Button onClick={uploadMaliciousSvg} variant="outline">
              🧪 Exemplo
            </Button>
          </div>
          
          {preview && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">🖼️ Preview da Imagem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded p-4 text-center">
                  <div 
                    dangerouslySetInnerHTML={{ __html: preview }}
                    className="inline-block"
                  />
                </div>
                <div className="mt-3 p-3 bg-black/80 text-green-400 rounded text-xs font-mono overflow-auto">
                  {preview}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🎨 Sobre SVG:</strong><br />
              Scalable Vector Graphics podem conter elementos interativos e JavaScript, mas muitos sistemas não sanitizam adequadamente.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> SVG suporta tags &lt;script&gt; e eventos como onload. Este sistema renderiza SVG diretamente...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge20;