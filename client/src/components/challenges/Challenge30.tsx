import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Crown, Search, Target, Trophy, Zap } from 'lucide-react';

const Challenge30 = () => {
  const [analysisNotes, setAnalysisNotes] = useState('');
  const [exploitAttempt, setExploitAttempt] = useState('');
  const [findings, setFindings] = useState<string[]>([]);
  const [finalExploit, setFinalExploit] = useState('');
  const { completeChallenge } = useProgress();

  const vulnerabilities = [
    { id: 1, type: 'DOM XSS', location: 'search function', hint: 'No sanitization in search results' },
    { id: 2, type: 'PostMessage', location: 'iframe communication', hint: 'Missing origin validation' },
    { id: 3, type: 'Template Injection', location: 'user profile', hint: 'Angular-like syntax processing' },
    { id: 4, type: 'CSP Bypass', location: 'inline scripts', hint: 'Weak nonce implementation' },
    { id: 5, type: 'Prototype Pollution', location: 'settings merge', hint: 'Deep object merging vulnerability' }
  ];

  const addFinding = (vulnerability: any) => {
    if (!findings.includes(vulnerability.type)) {
      setFindings(prev => [...prev, vulnerability.type]);
    }
  };

  const analyzeApplication = () => {
    // Simula análise da aplicação
    const newFindings: string[] = [];
    
    if (analysisNotes.toLowerCase().includes('dom') || analysisNotes.toLowerCase().includes('search')) {
      newFindings.push('DOM XSS');
    }
    if (analysisNotes.toLowerCase().includes('postmessage') || analysisNotes.toLowerCase().includes('iframe')) {
      newFindings.push('PostMessage');
    }
    if (analysisNotes.toLowerCase().includes('template') || analysisNotes.toLowerCase().includes('angular')) {
      newFindings.push('Template Injection');
    }
    if (analysisNotes.toLowerCase().includes('csp') || analysisNotes.toLowerCase().includes('nonce')) {
      newFindings.push('CSP Bypass');
    }
    if (analysisNotes.toLowerCase().includes('prototype') || analysisNotes.toLowerCase().includes('pollution')) {
      newFindings.push('Prototype Pollution');
    }
    
    setFindings(prev => [...new Set([...prev, ...newFindings])]);
  };

  const submitExploit = () => {
    // Verifica se encontrou vulnerabilidades suficientes e criou exploit
    const foundVulns = findings.length;
    const hasExploit = finalExploit.length > 50;
    
    if (foundVulns >= 3 && hasExploit) {
      completeChallenge(30);
    }
  };

  const simulateRealApp = `
// Simulação de aplicação real com múltiplas vulnerabilidades

// 1. Função de busca vulnerável (DOM XSS)
function searchProducts(query) {
  const results = document.getElementById('search-results');
  results.innerHTML = 'Resultados para: ' + query; // ❌ Sem sanitização
}

// 2. Listener postMessage vulnerável
window.addEventListener('message', function(event) {
  // ❌ Sem validação de origem
  const data = event.data;
  document.getElementById('content').innerHTML = data.content;
});

// 3. Template engine vulnerável
function renderProfile(user) {
  const template = 'Olá, {{name}}! Seu role é {{role}}.';
  // ❌ Evaluation insegura de templates
  return template.replace(/{{(\w+)}}/g, (match, key) => eval('user.' + key));
}

// 4. CSP com nonce fraco
// Content-Security-Policy: script-src 'nonce-static123'
// ❌ Nonce estático e previsível

// 5. Merge de objetos vulnerável
function updateSettings(userSettings) {
  const defaultSettings = {};
  // ❌ Prototype pollution via deep merge
  return deepMerge(defaultSettings, userSettings);
}`;

  return (
    <div className="space-y-6">
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-destructive" />
            Zero-Day Discovery Challenge
          </CardTitle>
          <p className="text-sm text-muted-foreground">Análise completa de aplicação real - encontre e explore vulnerabilidades</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive font-medium">Missão Final</p>
            </div>
            <p className="text-xs text-destructive/80">
              Você é um pesquisador de segurança. Analise esta aplicação, encontre vulnerabilidades e crie um exploit funcional.
            </p>
          </div>
          
          <Card className="border-muted bg-black/80 text-green-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">📱 Aplicação Alvo</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs font-mono overflow-auto max-h-64 whitespace-pre">
                {simulateRealApp}
              </pre>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4" />
              Notas de Análise:
            </label>
            <Textarea
              value={analysisNotes}
              onChange={(e) => setAnalysisNotes(e.target.value)}
              placeholder="Documente suas descobertas: que vulnerabilidades você encontrou? Como podem ser exploradas?"
              className="w-full text-sm"
              rows={4}
            />
            <Button onClick={analyzeApplication} variant="outline" className="w-full">
              Analisar Aplicação
            </Button>
          </div>
          
          <Card className="border-accent/50 bg-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Vulnerabilidades Encontradas ({findings.length}/5)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {vulnerabilities.map((vuln) => (
                  <div 
                    key={vuln.id}
                    className={`p-2 rounded border text-xs ${
                      findings.includes(vuln.type) 
                        ? 'bg-success/20 border-success/50 text-success' 
                        : 'bg-muted/50 border-muted'
                    }`}
                    onClick={() => addFinding(vuln)}
                  >
                    <div className="font-medium">{vuln.type}</div>
                    <div className="text-xs opacity-75">{vuln.location}</div>
                    {findings.includes(vuln.type) && (
                      <div className="text-xs mt-1 text-success/80">💡 {vuln.hint}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Tentativa de Exploit:</label>
            <Input
              value={exploitAttempt}
              onChange={(e) => setExploitAttempt(e.target.value)}
              placeholder="Teste seus payloads aqui..."
              className="w-full font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Exploit Final:</label>
            <Textarea
              value={finalExploit}
              onChange={(e) => setFinalExploit(e.target.value)}
              placeholder="Documente seu exploit final: qual vulnerabilidade escolheu? Como funciona? Qual o impacto?"
              className="w-full text-sm"
              rows={5}
            />
          </div>
          
          <Button 
            onClick={submitExploit} 
            className="w-full" 
            variant="terminal"
            disabled={findings.length < 3 || finalExploit.length < 50}
          >
            <Zap className="h-4 w-4 mr-2" />
            Submeter Descoberta Zero-Day
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="p-3 bg-muted/30 rounded">
              <strong>🎯 Objetivos:</strong><br />
              • Encontrar pelo menos 3 vulnerabilidades diferentes<br />
              • Escolher uma para explorar em profundidade<br />
              • Documentar o exploit com detalhes técnicos
            </div>
            <div className="p-3 bg-muted/30 rounded">
              💡 <strong>Dica:</strong> Pense como um pesquisador real: analise o código, identifique patterns perigosos, teste hipóteses e documente tudo!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge30;