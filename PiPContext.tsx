import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PiPContextType {
  pipVideo: {
    auctionId: string;
    roomName: string;
    title: string;
  } | null;
  setPiPVideo: (video: { auctionId: string; roomName: string; title: string } | null) => void;
  isPiPActive: boolean;
}

const PiPContext = createContext<PiPContextType | undefined>(undefined);

export const PiPProvider = ({ children }: { children: ReactNode }) => {
  const [pipVideo, setPiPVideo] = useState<{
    auctionId: string;
    roomName: string;
    title: string;
  } | null>(null);

  return (
    <PiPContext.Provider
      value={{
        pipVideo,
        setPiPVideo,
        isPiPActive: pipVideo !== null,
      }}
    >
      {children}
    </PiPContext.Provider>
  );
};

export const usePiP = () => {
  const context = useContext(PiPContext);
  if (!context) {
    throw new Error('usePiP must be used within PiPProvider');
  }
  return context;
};
