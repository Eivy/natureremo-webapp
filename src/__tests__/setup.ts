import '@testing-library/jest-dom';
import { cleanup } from '@solidjs/testing-library';
import { afterEach } from 'vitest';
import { setDevices, setAppliances } from '../store';

// Node.js v22+ exposes a broken global `localStorage` (requires --localstorage-file).
// Override it with jsdom's proper implementation so storage APIs work in tests.
// Guard against non-browser environments (e.g. Api.test.ts runs under node).
if (typeof window !== 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get: () => (window as any)._localStorage,
  });
}

afterEach(() => {
  if (typeof window !== 'undefined') {
    cleanup();
    localStorage.clear();
    window.history.pushState({}, '', '/');
  }
  setDevices([]);
  setAppliances([]);
});
