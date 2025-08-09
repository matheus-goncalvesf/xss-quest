import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge44: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<any>(null);
  const [templates, setTemplates] = useState({
    user: { name: 'João', role: 'user' },
    system: { version: '1.0.0', debug: false }
  });

  const evaluateTemplate = () => {
    try {
      // Simular template engine vulnerável que permite JavaScript
      let processed = expression;
      
      // Substituir variáveis {{variable}} 
      processed = processed.replace(/\{\{([^}]+)\}\}/g, (match, varName) => {
        const trimmed = varName.trim();
        
        // Permitir acesso a propriedades dos objetos
        if (trimmed.includes('.')) {
          const parts = trimmed.split('.');
          let current: any = templates;
          for (const part of parts) {
            current = current?.[part];
          }
          return current || '';
        }
        
        return (templates as any)[trimmed] || match;
      });
      
      // VULNERABILIDADE: Permitir expressões JavaScript com ${}
      processed = processed.replace(/\$\{([^}]+)\}/g, (match, jsCode) => {
        try {
          // Simular execução de JavaScript
          return eval(jsCode);
        } catch (e) {
          return `Error: ${e}`;
        }
      });
      
      setResult(processed);
    } catch (error) {
      setResult(`Erro: ${error}`);
    }
  };

  const sampleTemplates = [
    'Olá {{user.name}}! Você é um {{user.role}}.',
    'Versão do sistema: {{system.version}}',
    'Status de debug: {{system.debug}}',
    'Operação matemática: ${2 + 2}',
    'Timestamp: ${new Date().toLocaleString()}'
  ];

  return (
    <ChallengeLayout challengeId={44}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">📄 Template Engine</h2>
          <p className="text-muted-foreground mb-4">
            Sistema de templates que suporta variáveis e expressões JavaScript.
            Use {"{{variable}}"} para variáveis e ${"${code}"} para JavaScript.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Template:</label>
                <textarea
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                  placeholder="Digite seu template aqui..."
                />
              </div>
              
              <button
                onClick={evaluateTemplate}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                Processar Template
              </button>
              
              <div>
                <label className="block text-sm font-medium mb-2">Resultado:</label>
                <div className="p-3 border rounded-md bg-muted min-h-20">
                  <div dangerouslySetInnerHTML={{ __html: result || 'Nenhum resultado ainda...' }} />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">📊 Variáveis Disponíveis:</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-accent/10 border border-accent/30 rounded">
                    <h4 className="text-sm font-medium">user:</h4>
                    <pre className="text-xs mt-1">{JSON.stringify(templates.user, null, 2)}</pre>
                  </div>
                  <div className="p-3 bg-accent/10 border border-accent/30 rounded">
                    <h4 className="text-sm font-medium">system:</h4>
                    <pre className="text-xs mt-1">{JSON.stringify(templates.system, null, 2)}</pre>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">📋 Exemplos:</h3>
                <div className="space-y-1">
                  {sampleTemplates.map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setExpression(template)}
                      className="w-full text-left p-2 text-sm bg-muted hover:bg-muted/80 rounded border font-mono"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded">
            <p className="text-sm text-warning">
              ⚠️ <strong>Atenção:</strong> Templates com ${"${}"} executam JavaScript no servidor!
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge44;