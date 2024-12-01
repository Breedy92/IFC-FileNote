"use client";

import { useDropzone } from 'react-dropzone';
import { FileText, Loader2, UploadCloud, Wand2, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  isLoading: boolean;
  fileName: string | null;
  meetingType: string;
  showDropdown: boolean;
  isAnalyzing: boolean;
  onDrop: (acceptedFiles: File[]) => void;
  onMeetingTypeChange: (value: string) => void;
  onAnalyze: () => void;
}

const MEETING_TYPES = [
  { id: 'initial', label: 'Initial Meeting' },
  { id: 'strategy', label: 'Strategy Presentation' },
  { id: 'annual', label: 'Annual Review Meeting' },
  { id: 'soa', label: 'SOA Presentation' },
];

export function FileUploader({
  isLoading,
  fileName,
  meetingType,
  showDropdown,
  isAnalyzing,
  onDrop,
  onMeetingTypeChange,
  onAnalyze,
}: FileUploaderProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <div
          {...getRootProps()}
          className={cn(
            "relative rounded-lg p-8 transition-colors text-center",
            "hover:bg-muted/50",
            isDragActive && !isDragReject && "bg-primary/5",
            isDragReject && "bg-destructive/5",
            "cursor-pointer"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            {isDragActive ? (
              <UploadCloud className="h-12 w-12 text-primary animate-pulse" />
            ) : (
              <FileText className="h-12 w-12 text-muted-foreground" />
            )}
            <div className="space-y-2">
              <h3 className="font-medium text-muted-foreground">
                {isDragActive
                  ? "Drop your file here"
                  : fileName 
                    ? `File loaded: ${fileName}`
                    : "Drag and drop your transcript file"}
              </h3>
              {!fileName && (
                <p className="text-sm text-muted-foreground">
                  or click to select a file (TXT, DOCX up to 10MB)
                </p>
              )}
            </div>
          </div>
          {isLoading && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
        
        {fileName && !isAnalyzing && showDropdown && (
          <div className="mt-6 space-y-4">
            <div className="max-w-xs mx-auto">
              <Select value={meetingType} onValueChange={onMeetingTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  {MEETING_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {fileName && !isAnalyzing && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={onAnalyze}
              disabled={isAnalyzing || !meetingType}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analysing...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Analyse Transcript
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}