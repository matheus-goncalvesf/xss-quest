import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Languages, Filter, Zap } from 'lucide-react';

const Challenge28 = () => {
  const [input, setInput] = useState('');
  const [normalized, setNormalized] = useState('');
  const [result, setResult] = useState('');
  const [bypassed, setBypassed] = useState(false);
  const { completeChallenge } = useProgress();

  const blacklist = ['script', 'alert', 'javascript', 'onload', 'onerror'];

  const normalizeUnicode = (text: string) => {
    // Simula normalização que pode converter caracteres Unicode similares
    return text
      .replace(/ｓ/g, 's')  // Fullwidth s
      .replace(/ｃ/g, 'c')  // Fullwidth c
      .replace(/ｒ/g, 'r')  // Fullwidth r
      .replace(/ｉ/g, 'i')  // Fullwidth i
      .replace(/ｐ/g, 'p')  // Fullwidth p
      .replace(/ｔ/g, 't')  // Fullwidth t
      .replace(/ａ/g, 'a')  // Fullwidth a
      .replace(/ｌ/g, 'l')  // Fullwidth l
      .replace(/ｅ/g, 'e')  // Fullwidth e
      .replace(/ｏ/g, 'o')  // Fullwidth o
      .replace(/ｎ/g, 'n')  // Fullwidth n
      .replace(/＜/g, '<')  // Fullwidth <
      .replace(/＞/g, '>'); // Fullwidth >
  };

  const checkFilter = () => {
    const original = input;
    const norm = normalizeUnicode(input);
    setNormalized(norm);
    
    // Filtro verifica apenas o input original (sem normalização)
    const blocked = blacklist.some(word => original.toLowerCase().includes(word));
    
    // Mas após normalização, pode conter palavras proibidas
    const containsMalicious = blacklist.some(word => norm.toLowerCase().includes(word));
    
    if (!blocked && containsMalicious) {
      setBypassed(true);
      completeChallenge(28);
      setResult('🚨 UNICODE BYPASS SUCCESSFUL! Filtro enganado pela normalização!');
    } else if (blocked) {
      setBypassed(false);
      setResult('🛡️ BLOCKED: Conteúdo malicioso detectado');
    } else {
      setBypassed(false);
      setResult('✅ Entrada válida processada');
    }
  };

  const insertUnicodeExample = () => {
    // Usando caracteres Unicode fullwidth que se parecem com ASCII
    setInput('<ｓcript>alert("Unicode Bypass")</ｓcript>');
  };

  const unicodeVariants = [
    { char: 's', variants: ['ｓ', 'ѕ', '𝐬', '𝑠', '𝒔'] },
    { char: 'c', variants: ['ｃ', 'с', '𝐜', '𝑐', '𝒄'] },
    { char: 'r', variants: ['ｒ', 'г', '𝐫', '𝑟', '𝒓'] },
    { char: 'i', variants: ['ｉ', 'і', '𝐢', '𝑖', '𝒊'] },
    { char: '<', variants: ['＜', '‹', '⟨', '〈', '《'] }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-warning" />
            Sistema com Filtro Unicode
          </CardTitle>
          <p className="text-sm text-muted-foreground">Filtro avançado com normalização Unicode</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning/10 p-4 rounded border border-warning/30">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="h-4 w-4 text-warning" />
              <p className="text-sm text-warning font-medium">Unicode Filter Active</p>
            </div>
            <p className="text-xs text-warning/80">Sistema de detecção com normalização de caracteres similares</p>
          </div>
          
          <Card className="border-muted bg-black/80 text-green-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">🚫 Palavras Bloqueadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-xs space-y-1">
                {blacklist.map((word, index) => (
                  <div key={index}>• {word}</div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Entrada para teste:</label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite texto para análise Unicode..."
              className="w-full font-mono"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={checkFilter} className="flex-1" variant="terminal">
              <Zap className="h-4 w-4 mr-2" />
              Testar Filtro
            </Button>
            <Button onClick={insertUnicodeExample} variant="outline">
              🌐 Unicode
            </Button>
          </div>
          
          {normalized && (
            <Card className="border-accent/50 bg-accent/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">🔄 Processo de Normalização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs font-medium mb-1">Original:</div>
                  <div className="bg-background border rounded p-2 text-sm font-mono">
                    {input}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium mb-1">Após normalização:</div>
                  <div className="bg-background border rounded p-2 text-sm font-mono">
                    {normalized}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {result && (
            <Card className={`border-${bypassed ? 'destructive' : result.includes('🛡️') ? 'warning' : 'success'}/50 bg-${bypassed ? 'destructive' : result.includes('🛡️') ? 'warning' : 'success'}/5`}>
              <CardContent className="pt-4">
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
              </CardContent>
            </Card>
          )}
          
          <Card className="border-muted">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">🔤 Variantes Unicode Comuns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                {unicodeVariants.map((variant, index) => (
                  <div key={index} className="bg-background border rounded p-2">
                    <div className="font-mono font-bold">{variant.char}:</div>
                    <div className="font-mono text-muted-foreground">
                      {variant.variants.join(' ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> Unicode contém milhares de caracteres que se parecem visualmente com ASCII mas têm códigos diferentes...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge28;