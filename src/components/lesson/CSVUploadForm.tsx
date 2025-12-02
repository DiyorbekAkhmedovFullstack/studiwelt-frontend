import { useState } from 'react';
import { deckService } from '../../services/deckService';
import toast from 'react-hot-toast';

interface CSVUploadFormProps {
  deckId: string;
  onUploadSuccess: () => void;
}

export function CSVUploadForm({ deckId, onUploadSuccess }: CSVUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [useCustomDelimiter, setUseCustomDelimiter] = useState(false);
  const [delimiter, setDelimiter] = useState(',');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);

    try {
      let response;

      if (useCustomDelimiter && delimiter) {
        response = await deckService.uploadCSVWithDelimiter(deckId, file, delimiter);
      } else {
        response = await deckService.uploadCSV(deckId, file);
      }

      const result = response.result;

      // Show success message
      toast.success(result.message);

      // Show detailed info if there were any failures
      if (result.failedInserts > 0 && result.errors) {
        toast.error(
          `${result.failedInserts} card(s) failed to upload. Check console for details.`,
          { duration: 5000 }
        );
        console.error('Upload errors:', result.errors);
      }

      // Reset form
      setFile(null);
      setUseCustomDelimiter(false);
      setDelimiter(',');

      // Clear file input
      const fileInput = document.getElementById('csv-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // Trigger refresh of deck
      onUploadSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      toast.error(message);
      console.error('CSV upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-surface rounded-[24px] p-8 shadow-card border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-[1.2rem] font-serif font-bold text-text-main mb-2">
        📁 Bulk Import Flashcards
      </h2>
      <p className="text-[15px] text-text-muted mb-6">
        Upload a CSV file to import multiple flashcards at once. Format: <code className="bg-gray-100 px-2 py-1 rounded">front,back</code>
      </p>

      {/* File Input */}
      <div className="mb-6">
        <label
          htmlFor="csv-file-input"
          className="block text-[15px] font-medium text-text-main mb-2"
        >
          Select CSV File
        </label>
        <input
          id="csv-file-input"
          type="file"
          accept=".csv,.txt"
          onChange={handleFileChange}
          disabled={uploading}
          className="block w-full text-sm text-text-main
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-primary-dark
            file:cursor-pointer
            cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {file && (
          <p className="mt-2 text-sm text-text-muted">
            Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Custom Delimiter Option */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-[15px] text-text-main cursor-pointer">
          <input
            type="checkbox"
            checked={useCustomDelimiter}
            onChange={(e) => setUseCustomDelimiter(e.target.checked)}
            disabled={uploading}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
          <span>Use custom delimiter</span>
        </label>

        {useCustomDelimiter && (
          <div className="mt-3 ml-6">
            <label
              htmlFor="delimiter-input"
              className="block text-sm text-text-muted mb-1"
            >
              Delimiter character
            </label>
            <select
              id="delimiter-input"
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              disabled={uploading}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48
                focus:outline-none focus:ring-2 focus:ring-primary
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="|">Pipe (|)</option>
              <option value="	">Tab (\t)</option>
            </select>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex gap-3">
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="px-6 py-2.5 bg-primary text-white rounded-lg
            font-medium text-[15px]
            hover:bg-primary-dark
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            flex items-center gap-2"
        >
          {uploading ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload CSV
            </>
          )}
        </button>

        {file && !uploading && (
          <button
            onClick={() => {
              setFile(null);
              const fileInput = document.getElementById('csv-file-input') as HTMLInputElement;
              if (fileInput) fileInput.value = '';
            }}
            className="px-4 py-2.5 text-text-muted rounded-lg
              font-medium text-[15px]
              hover:bg-gray-100
              transition-colors duration-200"
          >
            Clear
          </button>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 font-medium mb-2">
          📝 CSV Format Example:
        </p>
        <pre className="text-xs bg-white p-3 rounded border border-blue-200 overflow-x-auto">
{`front,back
die Universität,the university
der Student,the student
das Studium,the studies`}
        </pre>
        <p className="text-xs text-blue-700 mt-2">
          • First row can be headers (will be auto-detected)
          <br />
          • Each row must have exactly 2 columns
          <br />
          • Empty rows will be skipped
          <br />
          • Max file size: 10 MB
        </p>
      </div>
    </div>
  );
}
