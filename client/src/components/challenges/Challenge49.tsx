import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge49: React.FC = () => {
  const [workerCode, setWorkerCode] = useState('');
  const [workerResult, setWorkerResult] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runWorker = () => {
    setIsRunning(true);
    setWorkerResult('🔄 Executando Web Worker...');
    
    try {
      // Simular execução de Web Worker
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);
      
      worker.onmessage = (e) => {
        setWorkerResult(`✅ Worker executado com sucesso!\nResultado: ${JSON.stringify(e.data)}`);
        setIsRunning(false);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      };
      
      worker.onerror = (error) => {
        setWorkerResult(`❌ Erro no Worker: ${error.message}`);
        setIsRunning(false);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      };
      
      // Simular timeout
      setTimeout(() => {
        if (isRunning) {
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          setWorkerResult('⏱️ Worker finalizado por timeout');
          setIsRunning(false);
        }
      }, 5000);
      
    } catch (error) {
      setWorkerResult(`❌ Erro ao criar Worker: ${error}`);
      setIsRunning(false);
    }
  };

  const examples = [
    {
      name: 'Cálculo simples',
      code: `// Calcular números primos
self.onmessage = function(e) {
  const primes = [];
  for (let i = 2; i < 100; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) isPrime = false;
    }
    if (isPrime) primes.push(i);
  }
  self.postMessage({ primes: primes.slice(0, 10) });
};
self.postMessage({ status: 'Worker iniciado' });`
    },
    {
      name: 'Processamento de dados',
      code: `// Processamento intensivo
const data = Array.from({length: 1000}, (_, i) => i);
const processed = data.map(x => x * x).filter(x => x % 2 === 0);
self.postMessage({ 
  original: data.length, 
  processed: processed.length,
  sample: processed.slice(0, 5) 
});`
    },
    {
      name: 'Acesso a APIs',
      code: `// Tentar acessar recursos externos
try {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(data => self.postMessage({ api_data: data }))
    .catch(err => self.postMessage({ error: err.message }));
} catch (e) {
  self.postMessage({ error: 'Fetch não disponível em Worker' });
}`
    }
  ];

  return (
    <ChallengeLayout challengeId={49}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">⚙️ Web Worker Executor</h2>
          <p className="text-muted-foreground mb-4">
            Execute código JavaScript em background usando Web Workers.
            Ideal para processamento pesado sem bloquear a interface.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Código do Worker:</label>
                <textarea
                  value={workerCode}
                  onChange={(e) => setWorkerCode(e.target.value)}
                  className="w-full h-64 p-3 border rounded-md font-mono text-sm"
                  placeholder="// Seu código JavaScript aqui
self.onmessage = function(e) {
  // Processar dados recebidos
  self.postMessage({ result: 'Hello from Worker!' });
};"
                />
              </div>
              
              <button
                onClick={runWorker}
                disabled={!workerCode.trim() || isRunning}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 disabled:opacity-50"
              >
                {isRunning ? 'Executando...' : 'Executar Worker'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Resultado:</label>
                <pre className="p-3 border rounded-md bg-muted h-64 overflow-auto text-sm">
                  {workerResult || 'Nenhum resultado ainda...'}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">⚠️ Limitações do Worker:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Sem acesso ao DOM</li>
                  <li>• Sem acesso ao objeto window</li>
                  <li>• Comunicação apenas via mensagens</li>
                  <li>• Ambiente isolado de segurança</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">📋 Exemplos de código:</h3>
            <div className="space-y-2">
              {examples.map((example, index) => (
                <div key={index} className="p-3 bg-accent/10 border border-accent/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">{example.name}</h4>
                    <button
                      onClick={() => setWorkerCode(example.code)}
                      className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded hover:bg-accent/80"
                    >
                      Usar
                    </button>
                  </div>
                  <pre className="text-xs text-muted-foreground overflow-hidden">
                    {example.code.split('\n').slice(0, 3).join('\n')}...
                  </pre>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded">
            <p className="text-sm">
              💡 <strong>Dica:</strong> Web Workers rodam em contexto isolado, mas ainda podem executar JavaScript...
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge49;