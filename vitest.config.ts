// Vitest configuration for ReAcademix project
// Configures testing environment with React Testing Library and jsdom
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom for DOM simulation
    environment: 'jsdom',
    
    // Setup file for test utilities
    setupFiles: ['./vitest-setup.ts'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Target 80% coverage as specified in issue #3
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
      // Exclude certain files from coverage
      exclude: [
        'node_modules/',
        'src/components/ui/**', // UI library components
        '**/*.test.{ts,tsx}',
        '**/__tests__/**',
        'vitest-setup.ts',
        'vitest.config.ts',
      ],
    },
    
    // Global test settings
    globals: true,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
