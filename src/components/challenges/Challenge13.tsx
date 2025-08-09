import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, File, CheckCircle, AlertTriangle } from 'lucide-react';

const Challenge13 = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState('');
  const [fileContent, setFileContent] = useState('');
  const { completeChallenge } = useProgress();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Lê o conteúdo do arquivo
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
        
        // Verifica se o arquivo contém XSS
        if (content.includes('script') && content.includes('alert')) {
          setTimeout(() => {
            completeChallenge(13);
          }, 500);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    // Simula validação de arquivo
    const allowedTypes = ['.txt', '.html', '.htm', '.xml'];
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExtension.toLowerCase())) {
      setUploadResult('❌ Tipo de arquivo não permitido. Use: .txt, .html, .htm, .xml');
      return;
    }
    
    setUploadResult('✅ Arquivo enviado com sucesso! Visualizando conteúdo...');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-warning/30 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-warning" />
            Portal de Upload de Documentos
          </CardTitle>
          <p className="text-sm text-muted-foreground">Sistema corporativo para compartilhamento de arquivos</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-warning/10 p-4 rounded border border-warning/30">
            <p className="text-sm text-warning mb-2">📁 Upload de Arquivos Habilitado</p>
            <p className="text-xs text-warning/80">Tipos permitidos: .txt, .html, .htm, .xml (máx. 1MB)</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Selecionar arquivo:</label>
            <Input
              type="file"
              onChange={handleFileSelect}
              accept=".txt,.html,.htm,.xml"
              className="w-full"
            />
          </div>
          
          {selectedFile && (
            <Card className="border-muted">
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type || 'text/plain'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Button 
            onClick={handleUpload} 
            className="w-full" 
            disabled={!selectedFile}
            variant="terminal"
          >
            Fazer Upload
          </Button>
          
          {uploadResult && (
            <Card className={`border-${uploadResult.includes('✅') ? 'success' : 'destructive'}/50 bg-${uploadResult.includes('✅') ? 'success' : 'destructive'}/5`}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  {uploadResult.includes('✅') ? (
                    <CheckCircle className="h-4 w-4 mt-0.5 text-success" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-destructive" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{uploadResult}</p>
                    
                    {fileContent && uploadResult.includes('✅') && (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-2">Preview do arquivo:</p>
                        <div 
                          className="bg-background border rounded p-3 text-sm max-h-40 overflow-auto"
                          dangerouslySetInnerHTML={{ __html: fileContent }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/30 rounded">
            💡 <strong>Dica:</strong> Este sistema aceita arquivos HTML e exibe seu conteúdo diretamente. O que acontece se você criar um arquivo HTML com código JavaScript?
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challenge13;