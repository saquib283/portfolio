"use client";

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    accept?: string;
    placeholder?: string;
}

export default function ImageUploader({
    value,
    onChange,
    label = 'Image',
    accept = 'image/jpeg,image/png,image/gif,image/webp',
    placeholder = 'Enter URL or upload an image'
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        // Validate file type
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf'
        ];

        if (!allowedTypes.includes(file.type)) {
            alert('Invalid file type. Please upload an image (JPEG, PNG, GIF, WebP) or PDF.');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File too large. Maximum size is 5MB.');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData
            });
            const result = await res.json();
            if (res.ok) {
                onChange(result.url);
            } else {
                alert(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpload(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0]);
        }
    };

    const clearImage = () => {
        onChange('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-secondary mb-1">{label}</label>

            {/* URL Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-surfaceHighlight border border-border rounded p-2 text-primary focus:outline-none focus:border-accent"
                    placeholder={placeholder}
                />
                {value && (
                    <button
                        type="button"
                        onClick={clearImage}
                        className="px-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${dragActive
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50 hover:bg-surfaceHighlight/50'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {uploading ? (
                    <div className="flex flex-col items-center gap-2 py-2">
                        <Loader2 className="animate-spin text-accent" size={24} />
                        <span className="text-sm text-secondary">Uploading...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-2">
                        <Upload className="text-secondary" size={24} />
                        <span className="text-sm text-secondary">
                            Drop file here or <span className="text-accent">browse</span>
                        </span>
                        <span className="text-xs text-secondary/60">
                            Max 5MB • JPEG, PNG, GIF, WebP
                        </span>
                    </div>
                )}
            </div>

            {/* Preview */}
            {value && (
                <div className="mt-3 p-3 bg-surfaceHighlight/50 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                        {value.match(/\.(jpg|jpeg|png|gif|webp)$/i) || value.startsWith('/uploads/') ? (
                            <img
                                src={value}
                                alt="Preview"
                                className="w-16 h-16 object-cover rounded border border-border"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="w-16 h-16 bg-black/50 rounded border border-border flex items-center justify-center">
                                <ImageIcon className="text-secondary" size={24} />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-primary truncate">{value}</p>
                            <p className="text-xs text-secondary">Current file</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
