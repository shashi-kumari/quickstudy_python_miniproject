
import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  className?: string;
  floating?: boolean;
}

const AudioPlayer = ({ className, floating = false }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mock audio URLs - in a real app, these would be actual study music tracks
  const studyTracks = [
    '/study-music-1.mp3',
    '/study-music-2.mp3',
    '/study-music-3.mp3',
  ];

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // In a real app, you'd load the actual track
      // For now, we'll just simulate the playing state
      audioRef.current.play().catch(e => console.log('Audio playback prevented'));
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        floating && 'fixed bottom-6 right-6 bg-white shadow-md rounded-full p-3 z-10',
        className
      )}
    >
      <button
        onClick={togglePlay}
        className={cn(
          'flex items-center justify-center rounded-full transition-all',
          isPlaying
            ? 'bg-quickstudy-purple text-white'
            : 'bg-white text-quickstudy-purple border border-quickstudy-purple',
          floating ? 'w-12 h-12' : 'w-10 h-10'
        )}
      >
        {isPlaying ? (
          <Pause className={floating ? 'w-5 h-5' : 'w-4 h-4'} />
        ) : (
          <Play className={floating ? 'w-5 h-5' : 'w-4 h-4'} />
        )}
      </button>
      {!floating && (
        <div className="text-sm font-medium">
          {isPlaying ? 'Pause Music' : 'Play Study Music'}
        </div>
      )}
      <audio ref={audioRef} loop>
        <source src={studyTracks[0]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
