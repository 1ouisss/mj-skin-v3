
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface LoadingScreenProps {
  timeout?: number;
  message?: string;
  onTimeout?: () => void;
  showSpinner?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = React.memo(({ 
  timeout = 30000,
  message = 'Chargement...',
  onTimeout,
  showSpinner = true
}) => {
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const warningRef = useRef<NodeJS.Timeout>();

  const handleTimeout = useCallback(() => {
    console.warn('[LoadingScreen] Loading timeout reached');
    setShowTimeoutWarning(true);
    if (onTimeout) {
      onTimeout();
    }
  }, [onTimeout]);

  useEffect(() => {
    console.log('[LoadingScreen] Mounted with config:', { timeout, message });
    
    timeoutRef.current = setTimeout(handleTimeout, timeout);
    warningRef.current = setTimeout(() => {
      toast.warning('Chargement plus long que prévu...');
    }, Math.min(5000, timeout / 2));

    return () => {
      console.log('[LoadingScreen] Unmounting, clearing timeouts');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, [handleTimeout, timeout]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
    >
      <div className="flex flex-col items-center gap-4">
        {showSpinner && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-[#4A4A4A] border-t-transparent rounded-full"
          />
        )}
        <span className="text-[#4A4A4A] font-medium">
          {showTimeoutWarning ? 'Chargement prolongé...' : message}
        </span>
      </div>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';
