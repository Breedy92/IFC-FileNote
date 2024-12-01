"use client";

import { FileDown, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AnalysisOutputProps {
  analysis: string;
  editedAnalysis: string;
  isAnalyzing: boolean;
  isSaving: boolean;
  onReset: () => void;
  onSave: () => void;
  onEdit: (content: string) => void;
}

export function AnalysisOutput({
  analysis,
  editedAnalysis,
  isAnalyzing,
  isSaving,
  onReset,
  onSave,
  onEdit,
}: AnalysisOutputProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Analysis Results</h2>
            <div className="flex gap-2">
              {analysis && editedAnalysis !== analysis && (
                <Button
                  onClick={onReset}
                  variant="outline"
                  size="sm"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
              <Button
                onClick={onSave}
                disabled={!editedAnalysis.trim() || isSaving}
                variant="outline"
                size="sm"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileDown className="mr-2 h-4 w-4" />
                )}
                Save as Word
              </Button>
            </div>
          </div>
          <div className="relative">
            <div
              className="prose prose-gray dark:prose-invert max-w-none min-h-[400px] p-4 border rounded-md bg-background"
              contentEditable
              dangerouslySetInnerHTML={{ __html: editedAnalysis }}
              onInput={(e) => onEdit(e.currentTarget.innerHTML)}
              suppressContentEditableWarning
            />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Analysing your transcript...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}