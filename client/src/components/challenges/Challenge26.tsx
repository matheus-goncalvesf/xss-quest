import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dna, Eye, Shuffle } from 'lucide-react';

const Challenge26 = () => {
  const [htmlInput, setHtmlInput] = useState('');
  const [rendered, setRendered] = useState('');
  const [mutated, setMutated] = useState('');
  const { completeChallenge } = useProgress();

  const processHTML = () => {
    let processed = htmlInput;
    
    // Simula sanitização básica
    processed = processed.replace(/<script[^>]*>.*?<\/script>/gi, '[SCRIPT REMOVIDO]');
    
    setRendered(processed);
    
    // Simula DOM mutation que pode recriar vulnerabilidades
    setTimeout(() => {
      let mutatedHTML = processed;
      
      // Simula browser parsing que pode "corrigir" HTML malformado
      // criando novas vulnerabilidades
      mutatedHTML = mutatedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      // Detecção específica para mutation XSS
      if (htmlInput.includes('</noscript>') && htmlInput.includes('onerror')) {
        completeChallenge(26);
        mutatedHTML += '\n🚨 MUTATION XSS DETECTADO!';
      }
      
      setMutated(mutatedHTML);
    }, 1000);
  };

  const insertMutationExample = () => {
    const mutationPayload = `<noscript>
  <p title="</noscript><img src=x onerror=alert('Mutation XSS')>">
    Este conteúdo parece inofensivo...
  </p>
</noscript>`;
    setHtmlInput(mutationPayload);
  };

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-destructive" />
            Laboratório de Mutation XSS
          </CardTitle>
          <p className="text-sm text-muted-foreground">Análise de mutações DOM avançadas</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <Shuffle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">DOM Mutation Engine</p>
            </div>
            <p className="text-xs text-destructive/80">Sistema que analisa como browsers processam e "corrigem" HTML malformado</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">HTML para análise:</label>
            <Textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Digite HTML que pode sofrer mutation..."
              className="w-full font-mono text-sm"
              rows={6}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={processHTML} className="flex-1 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Analisar Mutation
            </Button>
            <Button onClick={insertMutationExample} variant="outline">
              🧬 Exemplo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">1️⃣ Após Sanitização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-background border rounded p-3 text-sm font-mono overflow-auto min-h-[100px]">
                  {rendered || 'Aguardando processamento...'}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">2️⃣ Após DOM Mutation</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="bg-background border rounded p-3 text-sm font-mono overflow-auto min-h-[100px]"
                  dangerouslySetInnerHTML={{ __html: mutated || 'Aguardando mutation...' }}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🧬 Sobre Mutation XSS:</strong><br />
              Ocorre quando browsers "corrigem" HTML malformado durante parsing, potencialmente criando novas vulnerabilidades.
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Tags como &lt;noscript&gt; podem causar re-parsing do HTML, criando contextos inesperados...
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge26;