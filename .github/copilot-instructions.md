# Copilot Instructions for Portfolio Codebase

## Project Overview
Portfolio is a **Next.js 16 + Three.js 3D graphic design portfolio** featuring a custom **glassmorph UI component system** with advanced GLSL shaders. This is a high-performance visual-centric project combining modern web tech with sophisticated graphics rendering.

- **Core Stack**: Next.js 16, React 19, TypeScript, Three.js, Tailwind CSS 4
- **Custom 3D UI**: `/glass` - reusable library of WebGL-based controls with Leva plugin integration
- **Visual Effects**: Custom GLSL shaders for refraction, glare, and blur effects

---

## Architecture & Key Patterns

### `/glass` - 3D Component Library
This is a **self-contained design system library** for creating interactive 3D UI controls, not part of core app pages. Three architectural layers:

1. **Components** (`/glass/components/`): React wrappers around Leva plugin system
   - **LevaButtons/LevaCheckButtons**: Leva-integrated UI controls with intent variations (`normal|primary|danger|warning`)
   - **LevaContainer**: Custom Leva plugin for flexible layout composition
   - **LevaVectorNew**: Canvas-based 2D joystick with confinement options
   - **ResizableWindow**: Draggable, resizable container using `re-resizable`
   - **LevaImageUpload**: Image input with preview

2. **Shaders** (`/glass/shaders/`): GLSL 300 ES effects
   - `fragment-main.glsl` (749 lines): Core refraction/glare rendering - uses superellipse SDFs, Fresnel effects
   - `fragment-bg.glsl`, `*-blur.glsl`: Background blur pipeline
   - **Pattern**: Define uniforms for runtime control, use `u_mergeRate`, `u_refThickness`, `u_glareAngle` etc. for parameter tweaking

3. **Utils** (`/glass/utils/`):
   - `GLUtils.ts`: Low-level WebGL 2 shader program management, render pass coordination, uniform/attribute detection
   - `presetUtils.ts`: Serialization/storage of shader parameter presets
   - `useResizeObserver.ts`: Custom hook for responsive canvas sizing
   - `languages.ts`: Internationalization support

### Type-Safe Component Contracts
Components export types separately (see pattern in [LevaButton/index.ts](glass/components/LevaButton/index.ts)):
```typescript
export type LevaButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  intent?: 'normal' | 'primary' | 'danger' | 'warning';
} & React.DetailedHTMLProps<...HTMLButtonElement>;
```

**When adding components**: Define `*Props` type, use `clsx` for conditional classes, separate SCSS files with BEM-like naming.

### Leva Plugin System
[LevaContainer.tsx](glass/components/LevaContainer/LevaContainer.tsx) shows the pattern—createPlugin with normalize/sanitize/format/component:
- **normalize**: Transform input props → Leva-shaped `{value, settings}`
- **component**: React component using `useInputContext<LevaInputProps>`
- Used for custom parameter controls that integrate with shader tuning UI

---

## Developer Workflows

### Build & Development
```bash
npm run dev      # Next.js dev server on :3000
npm run build    # Production build (Next.js optimized)
npm run start    # Production server
npm run lint     # ESLint (next config)
```

### Key Non-Obvious Workflows
1. **Shader parameter tuning**: Parameters defined as uniforms in `fragment-main.glsl`; exposed via Leva plugins → can adjust real-time without rebuild
2. **Preset management**: `presetUtils.ts` handles save/load of shader states (likely for design variations)
3. **Canvas resizing**: `useResizeObserver` handles DPR-aware scaling—critical for retina displays

### Testing / Debugging
- No test suite visible; project is visual-first (verify shader output in dev mode)
- ESLint configured with `eslint-config-next`; rules selectively disabled where Leva library conflicts (see `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-unused-vars`)

---

## Project Conventions & Patterns

### Styling (SCSS + CSS Variables)
- **Framework**: Tailwind 4 + custom SCSS modules
- **Variables**: Leva theme colors via CSS custom properties (`var(--leva-colors-*)`, `var(--leva-radii-sm)`)
- [LevaButton.scss](glass/components/LevaButton/LevaButton.scss) example: BEM naming + nested selectors, intent modifiers (`--intent-danger`, `--intent-primary`)
- **Module naming**: `{ComponentName}.scss` (not `.module.scss` unless CSS Modules needed)

### TypeScript Strictness
- Strict typing on components; liberal use of `React.DetailedHTMLProps` for HTML attribute pass-through
- `useRef` + `useLayoutEffect` for imperative canvas/GL logic (see [LevaVectorNew.tsx](glass/components/LevaVectorNew/LevaVectorNew.tsx) for state management without useState)
- `ref.current` state patterns for performance-critical interactions (avoids re-renders)

### ESLint & Code Rules
- Rules disabled at file/line level when Leva plugins require it (`/* eslint-disable @typescript-eslint/no-unused-vars */`)
- Justified: Leva internals may not expose all params but require declaration

### Component File Organization
```
LevaButton/
  ├── index.ts          # Export component + types
  ├── LevaButton.tsx    # Implementation
  └── LevaButton.scss   # Styles
```

---

## Integration & Dependencies

### External Libraries
- **Leva** (`leva/plugin`): Parameter UI framework; requires plugin pattern for custom controls
- **React Three Fiber**: Canvas management (implicit; used via shaders)
- **class-variance-authority**: Not heavily used; consider for future UI variants
- **re-resizable**: Window dragging/resizing (in ResizableWindow)
- **Lucide React**: Icon library (available but check if used in /glass)

### Cross-Component Communication
- **No Redux/Context visible**; components self-contained or via prop drilling
- **Preset state**: Likely stored in localStorage or parent component (check presetUtils.ts usage)
- **Canvas state**: Always stored in `useRef` to avoid re-renders

---

## Common Task Patterns

### Adding a New Leva Plugin Component
1. Create folder under `/glass/components/{ComponentName}/`
2. Define `*Props`, `*Settings`, and `*ValueType` types
3. Implement component using `useInputContext<LevaInputProps>`
4. Export via `createPlugin` with normalize/sanitize/format
5. Add SCSS with BEM naming
6. Export types + component in `index.ts`

### Adding Shader Effects
1. Add new GLSL file to `/glass/shaders/`
2. Define uniforms for control parameters
3. Integrate into `GLUtils.ts` render pass pipeline (if new pass needed)
4. Expose control via new Leva plugin or existing UV inputs
5. Test in dev mode with real-time parameter tweaking

### Updating Component Styling
- Edit corresponding `.scss` file
- Use Leva CSS variables for theme consistency
- Follow BEM: `.component-name--modifier { &--state { } }`

---

## Non-Negotiable Rules
- **Shader state management**: Always use `useRef` + `useLayoutEffect`, never `useState` for canvas state
- **Type safety**: Export clear `*Props` types; use discriminated unions for intent/variant selections
- **Leva integration**: Plugins must follow normalize/sanitize/format/component pattern
- **SCSS modules**: Keep scoped to component; use CSS variables inherited from Leva theme
- **ESLint**: Only disable rules if library quirk; document why in comment

---

## Resources for Context
- [GLUtils.ts](glass/utils/GLUtils.ts) - WebGL 2 shader program API (read for understanding render passes)
- [fragment-main.glsl](glass/shaders/fragment-main.glsl) - Study for shader patterns (uniforms, SDF techniques)
- [LevaVectorNew.tsx](glass/components/LevaVectorNew/LevaVectorNew.tsx) - Study for useRef + canvas rendering patterns
- [package.json](package.json) - Dependency versions & scripts
