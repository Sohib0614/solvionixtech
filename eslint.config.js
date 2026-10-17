import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    /**
     * The hero 3D scene.
     *
     * React Three Fiber works by mutating Three.js objects imperatively inside
     * `useFrame`, outside React's render cycle. The React Compiler's purity,
     * immutability and refs rules flag that by design, because it cannot prove the
     * mutations are frame-loop-local — but here every mutation is confined to the
     * render loop, a geometry buffer, or a ref, and none of it feeds back into a
     * React render.
     *
     * `react-hooks/refs` is the one that needs explaining. This scene has to hold
     * refs to its own nodes — a hip, a knee, an ankle — because a leg is solved
     * and written every frame and must never trigger a render. Refs are created
     * with `useRef`/`useMemo` in the component that owns them and passed down as
     * ordinary props, then attached with `ref={...}` in the child. That is the
     * documented React pattern, but the rule reads any member access on a ref
     * container as a `.current` read, and flags attaching one it cannot trace back
     * to a `useRef` in the same component.
     *
     * Disabling the three rules for this directory keeps the rest of the codebase
     * under full compiler scrutiny. The scene still passes `no-unused-vars`, the
     * hooks rules and the recommended JS rules.
     */
    files: ['src/components/visuals/robot/**/*.jsx'],
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
    },
  },
]
