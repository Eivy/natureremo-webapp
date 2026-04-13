import '@testing-library/jest-dom';
import { cleanup } from '@solidjs/testing-library';
import { afterEach } from 'vitest';
import { setDevices, setAppliances } from '../store';

// Node.js v22+ exposes a broken global `localStorage` (requires --localstorage-file).
// Override it with jsdom's proper implementation so storage APIs work in tests.
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  get: () => (window as any)._localStorage,
});

afterEach(() => {
  cleanup();
  setDevices([]);
  setAppliances([]);
  localStorage.clear();
  window.history.pushState({}, '', '/');
});
