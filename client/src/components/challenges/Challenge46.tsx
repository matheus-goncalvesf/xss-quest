import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge46: React.FC = () => {
  const [userObject, setUserObject] = useState<any>({ name: 'João', role: 'user' });
  const [pollutionAttempt, setPollutionAttempt] = useState('');
  const [result, setResult] = useState('');

  const attemptPollution = () => {
    try {
      // Simular parsing inseguro de JSON que permite prototype pollution
      const parsed = JSON.parse(pollutionAttempt);
      
      // Simular merge vulnerável
      const merge = (target: any, source: any): any => {
        for (const key in source) {
          if (key === '__proto__') {
            // VULNERABILIDADE: permitir modificação do prototype
            merge(target.__proto__, source[key]);
          } else if (typeof source[key] === 'object' && source[key] !== null) {
            if (!target[key]) target[key] = {};
            merge(target[key], source[key]);
          } else {
            target[key] = source[key];
          }
        }
        return target;
      };
      
      // Aplicar merge vulnerável
      merge(userObject, parsed);
      setUserObject({ ...userObject });
      
      // Testar se conseguiu poluir o prototype
      const testObj: any = {};
      if (testObj.polluted !== undefined) {
        setResult('🎯 Prototype pollution bem-sucedida! Todos os objetos foram afetados.');
      } else {
        setResult('✅ Merge realizado com sucesso (sem pollution detectada)');
      }
      
    } catch (error) {
      setResult(`❌ Erro no JSON: ${error}`);
    }
  };

  const examples = [
    {
      name: 'Merge normal',
      json: '{"age": 25, "city": "São Paulo"}'
    },
    {
      name: 'Tentativa básica',
      json: '{"__proto__": {"polluted": true}}'
    },
    {
      name: 'Pollution complexa',
      json: '{"__proto__": {"isAdmin": true, "polluted": "yes"}}'
    }
  ];

  return (
    <ChallengeLayout challengeId={46}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">🧬 Object Merger Tool</h2>
          <p className="text-muted-foreground mb-4">
            Ferramenta para fazer merge de objetos JSON com o perfil do usuário.
            Suporta merge profundo de propriedades aninhadas.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">JSON para merge:</label>
                <textarea
                  value={pollutionAttempt}
                  onChange={(e) => setPollutionAttempt(e.target.value)}
                  className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                  placeholder='{"novaPropriedade": "valor"}'
                />
              </div>
              
              <button
                onClick={attemptPollution}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                Fazer Merge
              </button>
              
              <div className="p-3 border rounded-md bg-muted">
                <p className="text-sm font-medium mb-1">Resultado:</p>
                <p className="text-sm">{result || 'Nenhum merge realizado ainda'}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">👤 Objeto do Usuário Atual:</h3>
                <pre className="p-3 bg-accent/10 border border-accent/30 rounded text-sm overflow-auto">
                  {JSON.stringify(userObject, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">🧪 Teste de Pollution:</h3>
                <div className="p-3 bg-muted border rounded">
                  <p className="text-sm">Novo objeto vazio:</p>
                  <pre className="text-xs mt-1">
                    {JSON.stringify({}, null, 2)}
                  </pre>
                  <p className="text-xs text-muted-foreground mt-1">
                    Se o prototype foi poluído, propriedades extras aparecerão aqui
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">📋 Exemplos para testar:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {examples.map((example, index) => (
                <div key={index} className="p-3 bg-accent/10 border border-accent/30 rounded">
                  <h4 className="text-sm font-medium">{example.name}</h4>
                  <pre className="text-xs mt-1 text-muted-foreground">{example.json}</pre>
                  <button
                    onClick={() => setPollutionAttempt(example.json)}
                    className="mt-2 px-2 py-1 bg-accent text-accent-foreground text-xs rounded hover:bg-accent/80"
                  >
                    Usar
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded">
            <p className="text-sm text-destructive">
              ⚠️ <strong>Prototype Pollution:</strong> Modificar __proto__ pode afetar todos os objetos!
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge46;