import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// import matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom/vitest';

// to add assertion methods for DOM elements 'toBeInTheDocument()' or 'toHaveTextContent()'
// expect.extend(matchers);

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
