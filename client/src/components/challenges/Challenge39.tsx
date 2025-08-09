import React, { useState } from 'react';
import { ChallengeLayout } from '../ChallengeLayout';

const Challenge39: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [validationEnabled, setValidationEnabled] = useState(true);

  const validateForm = () => {
    if (!validationEnabled) return true;
    
    // Validação client-side básica
    const hasScript = Object.values(formData).some(value => 
      value.toLowerCase().includes('script') || 
      value.includes('<') || 
      value.includes('>')
    );
    
    if (hasScript) {
      alert('Erro: HTML/Script detectado!');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  return (
    <ChallengeLayout challengeId={39}>
      <div className="space-y-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">📝 Formulário de Contato</h2>
          <p className="text-muted-foreground mb-4">
            Envie uma mensagem através do nosso formulário seguro.
            Validação JavaScript impede conteúdo malicioso.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome de usuário:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Mensagem:</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full p-3 border rounded-md h-24"
                required
              />
            </div>
            
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
            >
              Enviar Mensagem
            </button>
          </form>
          
          {submitted && (
            <div className="mt-6 p-4 bg-success/10 border border-success/30 rounded">
              <h3 className="font-medium text-success mb-2">✅ Mensagem Enviada!</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Usuário:</strong> <span dangerouslySetInnerHTML={{ __html: formData.username }} /></p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Mensagem:</strong> <span dangerouslySetInnerHTML={{ __html: formData.message }} /></p>
              </div>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded">
            <div className="flex items-center justify-between">
              <span className="text-sm">🔧 DevTools - Validação JavaScript:</span>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={validationEnabled}
                  onChange={(e) => setValidationEnabled(e.target.checked)}
                />
                <span className="text-sm">Ativada</span>
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Desative para simular bypass da validação client-side
            </p>
          </div>
        </div>
      </div>
    </ChallengeLayout>
  );
};

export default Challenge39;