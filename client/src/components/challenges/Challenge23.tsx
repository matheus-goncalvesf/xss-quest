import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Eye, Brush } from 'lucide-react';

const Challenge23 = () => {
  const [cssCode, setCssCode] = useState('');
  const [appliedStyles, setAppliedStyles] = useState('');
  const { completeChallenge } = useProgress();

  const defaultCss = `/* Adicione seus estilos personalizados aqui */
.custom-element {
  color: blue;
  font-size: 16px;
}`;

  const applyStyles = () => {
    const styles = cssCode || defaultCss;
    setAppliedStyles(styles);
    
    // Verifica se contém expressão JavaScript (vulnerável em browsers antigos)
    if (styles.includes('expression') && styles.includes('alert')) {
      setTimeout(() => {
        completeChallenge(23);
      }, 300);
    }
  };

  const insertMaliciousCss = () => {
    const maliciousCss = `.vulnerable-element {
  background: url('javascript:alert("CSS XSS")');
  /* Para IE6-7: */
  width: expression(alert('CSS XSS'));
  /* SVG em CSS: */
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><script>alert('CSS XSS')</script></svg>");
}`;
    setCssCode(maliciousCss);
  };

  return (
    <div className="space-y-6">
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-warning" />
            Editor de CSS Dinâmico
          </CardTitle>
          <p className="text-sm text-muted-foreground">Personalize estilos em tempo real</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning/10 p-4 rounded border border-warning/30">
            <div className="flex items-center gap-2 mb-2">
              <Brush className="h-4 w-4 text-warning" />
              <p className="text-sm text-warning font-medium">CSS Engine Ativo</p>
            </div>
            <p className="text-xs text-warning/80">Aplicação dinâmica de estilos com suporte completo a propriedades CSS</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Código CSS:</label>
            <Textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              placeholder={defaultCss}
              className="w-full font-mono text-sm"
              rows={8}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={applyStyles} className="flex-1 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Aplicar Estilos
            </Button>
            <Button onClick={insertMaliciousCss} variant="outline">
              🧪 Exemplo
            </Button>
          </div>
          
          <div className="space-y-4">
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">🎨 Elemento de Teste</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded p-4">
                  <div className="custom-element vulnerable-element">
                    Este é um elemento de teste para aplicar os estilos CSS.
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {appliedStyles && (
              <Card className="border-accent/50 bg-accent/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">📝 CSS Aplicado</CardTitle>
                </CardHeader>
                <CardContent>
                  <style dangerouslySetInnerHTML={{ __html: appliedStyles }} />
                  <div className="bg-black/80 text-green-400 p-3 rounded text-xs font-mono overflow-auto whitespace-pre">
                    {appliedStyles}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🎭 Sobre CSS Injection:</strong><br />
              Em alguns contextos e browsers antigos, CSS pode executar JavaScript através de propriedades como expression() ou URLs maliciosas.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Explore propriedades como expression(), url() com javascript:, ou SVG em data URLs...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge23;