---
Task ID: 1
Agent: Main Agent
Task: Fix all bugs and implement 10-point security hardening

Work Log:
- Diagnosed root cause of `toFixed` crash: API dashboard returned `avgSections` but frontend expected `avgSectionsPerVisit`; also `contactCount` vs `contactSubmissions`
- Fixed `/api/analytics/dashboard` route to return correctly shaped data including `contactSubmissionsList`
- Fixed AdminPanel CMS fetch — was treating API response as flat `Record<string,string>` but API returns `{success, data: [...], grouped}`
- Fixed AdminPanel analytics fetch — now properly unwraps `json.data` and applies null-safe defaults (`?? 0`, `?? []`)
- Fixed `dashboard.avgSectionsPerVisit.toFixed(1)` crash — added `typeof` check before calling `.toFixed`
- Fixed `recentVisitors` data shape — API now transforms raw Prisma data to match frontend interface (timestamp, country, sectionsViewed)
- Fixed hydration error — caused by `.toFixed` crash which forced React client-side tree regeneration
- Fixed `navigator.platform` (deprecated) → `navigator.userAgentData?.platform`
- Fixed `setInterval().unref()` crash in Edge middleware — replaced with lazy cleanup approach
- Fixed `getEnvInfo()` to have try-catch and proper typing

Security Features Implemented:
1. **CSP & Security Headers** — Full Content-Security-Policy via middleware + next.config.ts headers
2. **X-Powered-By Removal** — `poweredByHeader: false` in next.config.ts
3. **Input Validation** — Zod schemas for all API routes (contact, analytics, CMS, backup)
4. **Data Sanitization** — DOMPurify via `isomorphic-dompurify` library, `sanitizeInput()` utility
5. **API Rate Limiting** — In-memory rate limiter with per-IP tracking, different limits for public/sensitive/admin routes
6. **Bot Protection** — Middleware blocks known bot user-agents from analytics tracking
7. **Serverless Timeout** — AbortController with 10-15s timeout in all API routes
8. **Runtime Type Safety** — Zod v4 validation on all POST/PUT endpoints
9. **XSS Output Encoding** — DOMPurify sanitize utility available, JSON-LD uses pre-built safe string
10. **Git Secret Management** — Hardened .gitignore (env files, DB files, credentials, tokens, keys)
11. **Dependency Auditing** — Added `security:audit`, `security:check`, `security:outdated` scripts
12. **Contact API** — New `/api/contact` route with Zod validation, sanitization, rate limiting, DB storage
13. **Copyright Protection** — Now renders `<CopyrightProtection enabled={true} />` in page.tsx
14. **WordPress probe redirects** — /wp-admin, /wp-login.php, /xmlrpc.php redirect to /

Stage Summary:
- All 2 reported bugs fixed (hydration error, toFixed crash)
- 3 additional bugs discovered and fixed (CMS parsing, data shape mismatch, Edge runtime crash)
- 14 security features implemented across middleware, API routes, and config
- Agent-browser verified: page loads clean, admin panel analytics works, rate limiting works, XSS blocked
- Security headers verified via browser: CSP, HSTS, X-Frame-Options, nosniff all present
- Lint passes with 0 errors (1 expected font warning)

---
Task ID: 2
Agent: Main Agent
Task: Add 3D World theme — full website 3D transformation

Work Log:
- Analyzed entire project structure: layout, sections, components, CSS system, theme system
- Designed 3D theme architecture using `.theme-3d` class on `<html>` element (same pattern as `liquid-glass`)
- Added ~750 lines of 3D CSS to globals.css covering:
  - 3D keyframes: float-3d, spin-3d-slow/reverse, pulse-3d, grid-3d-flow, cube-rotate, depth-pulse, orbit-3d/reverse, wireframe-pulse, text-3d-breathe
  - CSS variable overrides: deep space palette (#050510 base), enhanced neon glow shadows, 3D perspective/depth vars
  - Base layout: perspective(1200px) on body, preserve-3d on main/sections
  - Glass cards: gradient backgrounds, multi-layer depth shadows, translateZ hover transforms with rotateX/Y
  - Fonts: Orbitron with 3-layer cyan text-shadow glow, mono with subtle glow
  - Hero: enhanced shimmer with drop-shadow, translateZ(30px) on name
  - Section dividers: perspective rotation, radial gradient dots with triple box-shadow
  - Navbar: translateZ(40px) floating, deep background gradient
  - Footer: perspective translateZ(20px), bottom shadow depth
  - Buttons: 3D raised/pressed states with translateZ, multi-layer shadows
  - Icons: drop-shadow glow, hover scale+translateZ+enhanced glow
  - Skill bars: perspective(200px) rotateX(10deg) with inset shadow
  - Soft skill tags: translateZ(10px) hover with rotateX(3deg)
  - Timeline cards: rotateY(2deg) hover, deep shadows
  - FAQ accordion: translateZ(5px) hover, depth shadows
  - Contact cards: translateZ(10px) hover with translateY
  - Achievement cards: rotateX/Y hover
  - Inputs: inset shadows, focus translateZ(3px) with glow
  - Background: enhanced gradient body::before
  - Scrollbar: 8px gradient thumb with cyan/magenta glow
  - Command palette: perspective translateZ(30px) with deep shadows
  - HUD brackets: box-shadow glow, translateZ(5px)
  - Avatar border: triple glow shadow, perspective translateZ(10px)
  - Reduced motion: disables all 3D transforms and animations

- Created Theme3DBackground.tsx component:
  - 6 floating 3D wireframe cubes (35px, 25px, 30px, 20px, 18px, 22px) with float-3d animation
  - 3 wireframe spheres (120px, 80px, 100px) with wireframe-pulse animation
  - 3 orbit containers with 5 total orbiting dots
  - 1 perspective 3D grid floor with mask gradient
  - 3 ambient glow orbs (cyan, magenta, purple)
  - Conditional render: only shows when theme === 'theme-3d'

- Updated ThemeCustomizer.tsx:
  - Added '3D World' preset with `themeMode: 'theme-3d'`
  - Updated Preset interface to include 'theme-3d' mode
  - Added 3D class management: add/remove dark/liquid-glass/theme-3d classes
  - Added "◈ 3D" badge on the 3D World preset button
  - Added useEffect to restore theme preset from localStorage on mount

- Updated page.tsx: imported and rendered Theme3DBackground

Stage Summary:
- 3D theme fully implemented with ~875 lines of code added across 4 files
- All existing sections automatically get 3D treatment via CSS (no component changes needed)
- Browser verified: theme activates, all 3D elements render (6 cubes, 3 spheres, 5 dots, 1 grid)
- CSS variables confirmed: bg=#050510, perspective=1200px, navbar translateZ=40px
- Theme persists on page reload via localStorage
- Switching back to Cyberpunk/dark works correctly
- Zero console errors
- Lint passes (0 errors, 1 pre-existing warning)
- Pushed to GitHub: commit bdbb8f6

---
Task ID: 3
Agent: Main Agent
Task: 3D dynamic lighting, neon glow borders, new hard skills, 3D tech stack orbit

Work Log:
- Created `use3DLightSource` hook (src/hooks/use3DLightSource.ts):
  - Tracks mouse position globally with requestAnimationFrame loop
  - Sets CSS custom properties on `<html>`: `--light-x` (-1 to 1), `--light-y` (-1 to 1), `--light-px`, `--light-py`
  - Only active when theme === 'theme-3d'; cleans up vars when switching away
  - Wired into Theme3DBackground component

- Added ~170 lines of dynamic 3D lighting CSS to globals.css:
  - Vibrant neon glow border on `.glass:hover` and `.glass-card-advanced:hover` using `calc()` with `--light-x`/`--light-y` for intensity
  - Dynamic ambient occlusion: shadow offsets shift opposite to light source direction
  - Neon glow follows light: positive offset toward light, negative offset away
  - Secondary magenta glow on shadow-side edge
  - Inset highlight on light-facing edge, inset shadow on opposite edge
  - Applied to ALL card types: glass, glass-hover-glow, experience, FAQ, contact, achievement, stats
  - Added tech stack 3D orbital CSS classes (orbit-outer-3d, orbit-inner-3d, tech-float-3d, tech-pulse-glow)
  - Updated reduced motion to cover all new animations

- Added 2 new Hard Skills to About.tsx:
  - Software Development Dasar Fundamental (Code2 icon, 60% proficiency)
  - Python Dasar Fundamental (Terminal icon, 55% proficiency)
  - Updated stats count: 5 → 7 hard skills (both ID and EN)

- Rewrote TechStack.tsx with 3D orbital animation:
  - Normal mode: unchanged flat layout
  - 3D mode (TechStack3D component): full 3D orbital layout
  - Outer ring (7 skills): positioned on 480×200 ellipse, rotates via orbit-outer-3d (40s)
  - Inner ring (4 skills): positioned on 300×130 ellipse, counter-rotates via orbit-inner-3d (35s)
  - Center core: pulsing triple rings (cyan/magenta/purple) with "ZM" initials
  - 2 visible orbit ring lines (elliptical with rotateX(25deg) for 3D perspective)
  - Each item floats independently via tech-float-3d animation
  - Hover pauses float animation, applies dynamic light-based shadows
  - Each item positioned with translateZ for depth variation

Stage Summary:
- All 6 changes implemented and browser-verified
- Mouse-following light source confirmed: --light-x changes from 0.000 to 0.250 on mouse move
- 3D Tech Stack verified: orbitOuter ✅, orbitInner ✅, center ✅, 2 ringLines ✅, 11 items ✅
- 7 hard skills confirmed in DOM (was 5)
- Zero console errors, zero lint errors
- Pushed to GitHub: commit f2ca0d6
