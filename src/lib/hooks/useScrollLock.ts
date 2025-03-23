import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle scroll locking for modals and mobile menus
 * Works across different browsers including Safari on iOS
 */
export function useScrollLock() {
  const scrollOffset = useRef(0);
  const isLocked = useRef(false);

  const lockScroll = () => {
    if (typeof document === 'undefined' || isLocked.current) return;

    // Save current scroll position
    scrollOffset.current = window.scrollY;

    // Get the scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Apply scroll lock styles
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollOffset.current}px`;
    document.body.style.width = '100%';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';

    isLocked.current = true;
  };

  const unlockScroll = () => {
    if (typeof document === 'undefined' || !isLocked.current) return;

    // Remove scroll lock styles
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';

    // Restore scroll position
    window.scrollTo(0, scrollOffset.current);

    isLocked.current = false;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isLocked.current) {
        unlockScroll();
      }
    };
  }, []);

  return { lockScroll, unlockScroll };
} 