"use client";

import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { exportToWord } from '@/lib/docx-export';
import mammoth from 'mammoth';
import { FileUploader } from './FileUploader';
import { AnalysisOutput } from './AnalysisOutput';

export function TranscriptAnalyzer() {
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [editedAnalysis, setEditedAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [meetingType, setMeetingType] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFile = async (file: File) => {
    setIsLoading(true);
    try {
      let text = '';
      
      if (file.name.toLowerCase().endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (file.name.toLowerCase().endsWith('.txt') || file.name.toLowerCase().endsWith('.md')) {
        text = await file.text();
      } else {
        throw new Error('Unsupported file type. Please upload a .txt, or .docx file.');
      }

      if (!text.trim()) {
        throw new Error('The file appears to be empty');
      }

      setTranscript(text);
      setFileName(file.name);
      setAnalysis('');
      setEditedAnalysis('');
      
      // Detect meeting type from filename
      const detectedType = detectMeetingType(file.name);
      if (detectedType) {
        setMeetingType(detectedType);
        setShowDropdown(false);
        toast({
          title: "Meeting type detected",
          description: `Detected as ${MEETING_TYPES.find(t => t.id === detectedType)?.label}`,
        });
      } else {
        setShowDropdown(true);
        toast({
          title: "Meeting type not detected",
          description: "Please select the meeting type manually.",
        });
      }
      
      toast({
        title: "File loaded successfully",
        description: `${file.name} has been loaded and is ready for analysis.`,
      });
    } catch (error) {
      toast({
        title: "Error loading file",
        description: error instanceof Error ? error.message : "Please try again with a valid file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    await handleFile(file);
  }, []);

  const analyzeTranscript = async () => {
    if (!transcript.trim()) {
      toast({
        title: "No content to analyze",
        description: "Please provide a transcript first.",
        variant: "destructive",
      });
      return;
    }

    if (!meetingType) {
      toast({
        title: "Meeting type required",
        description: "Please select a meeting type before analyzing.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          transcript,
          meetingType 
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Analysis failed');
      }

      const data = await response.json();
      const newAnalysis = data.summary;
      
      if (!newAnalysis) {
        throw new Error('No analysis received');
      }

      setAnalysis(newAnalysis);
      setEditedAnalysis(newAnalysis);
      
      toast({
        title: "Analysis complete",
        description: "Your transcript has been analyzed successfully. You can now edit the analysis before saving.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveAsWord = async () => {
    if (!editedAnalysis.trim()) {
      toast({
        title: "Nothing to save",
        description: "Please analyze a transcript first.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await exportToWord(editedAnalysis);
      toast({
        title: "Analysis saved",
        description: "Your analysis has been downloaded as a Word document.",
      });
    } catch (error) {
      console.error('Error saving Word document:', error);
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Failed to save as Word document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetAnalysis = () => {
    if (analysis) {
      setEditedAnalysis(analysis);
      toast({
        title: "Analysis reset",
        description: "Your edits have been reset to the original analysis.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            File Note Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Drop your transcript file or paste content to get an AI-powered file note
          </p>
        </div>

        <div className="space-y-8">
          <FileUploader
            isLoading={isLoading}
            fileName={fileName}
            meetingType={meetingType}
            showDropdown={showDropdown}
            isAnalyzing={isAnalyzing}
            onDrop={onDrop}
            onMeetingTypeChange={setMeetingType}
            onAnalyze={analyzeTranscript}
          />

          {(analysis || isAnalyzing) && (
            <AnalysisOutput
              analysis={analysis}
              editedAnalysis={editedAnalysis}
              isAnalyzing={isAnalyzing}
              isSaving={isSaving}
              onReset={resetAnalysis}
              onSave={saveAsWord}
              onEdit={setEditedAnalysis}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const MEETING_TYPES = [
  { id: 'initial', label: 'Initial Meeting', keywords: ['initial meeting', 'new client'] },
  { id: 'strategy', label: 'Strategy Presentation', keywords: ['strategy discussion', 'strategy presentation'] },
  { id: 'annual', label: 'Annual Review Meeting', keywords: ['annual review', 'annual progress'] },
  { id: 'soa', label: 'SOA Presentation', keywords: ['advice recommendation'] },
] as const;

const detectMeetingType = (fileName: string): string | null => {
  const lowerFileName = fileName.toLowerCase();

  for (const type of MEETING_TYPES) {
    if (type.keywords.some(keyword => lowerFileName.includes(keyword))) {
      return type.id;
    }
  }

  return null;
};