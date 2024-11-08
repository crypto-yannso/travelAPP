import React from 'react';
import { Camera, Upload, Plus } from 'lucide-react';

interface PhotoUploadProps {
  photos: string[];
  dragActive: boolean;
  onDrag: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileSelect: (files: FileList | null) => void;
  onPhotoRemove: (index: number) => void;
}

export default function PhotoUpload({
  photos,
  dragActive,
  onDrag,
  onDrop,
  onFileSelect,
  onPhotoRemove
}: PhotoUploadProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        <Camera className="inline-block w-4 h-4 mr-2" />
        Photos du voyage
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-tokyo-accent' : 'border-tokyo-accent/30'
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          id="file-upload"
          onChange={(e) => onFileSelect(e.target.files)}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-8 h-8 mb-2 text-tokyo-accent" />
          <span className="text-sm">
            Glissez vos photos ici ou cliquez pour sélectionner
          </span>
        </label>
      </div>
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={photo}
                alt={`Travel photo ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onPhotoRemove(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
              >
                <Plus className="w-4 h-4 rotate-45" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}