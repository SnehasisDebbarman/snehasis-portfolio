export const posts = [
  {
    slug: "react-compiler-mastery",
    title: "Mastering the React 19 Compiler",
    date: "June 28, 2026",
    readTime: "6 min read",
    category: "React",
    excerpt: "An in-depth look at how the new React Compiler automates memoization, rendering optimization, and simplifies code architecture.",
    content: `
      <p>For years, React developers have spent countless hours manually optimizing render performance using APIs like <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo</code>. With the release of React 19, the new <strong>React Compiler</strong> (formerly React Forget) shifts this burden from the developer to the build toolchain.</p>
      
      <h3>How the Compiler Works Under the Hood</h3>
      <p>The compiler is a Babel/Vite plugin that parses your component code into an Abstract Syntax Tree (AST), analyzes data dependencies, and injects fine-grained memoization directly into the output JavaScript. It detects whether props or state have changed, ensuring that components only re-render when absolutely necessary.</p>
      
      <blockquote>
        "The React Compiler represents a shift from developer-managed optimization to compiler-driven optimization."
      </blockquote>

      <h3>Key Rules for the Compiler</h3>
      <p>To benefit fully from the React Compiler, your codebase must adhere to the <strong>Rules of React</strong>:</p>
      <ul>
        <li><strong>Purity:</strong> Components must be pure. Side effects belong in event handlers or <code>useEffect</code>.</li>
        <li><strong>Immutable State:</strong> Modifying state variables directly breaks the compiler's dependency detection.</li>
        <li><strong>Hook Call Rules:</strong> Hooks must only be called at the top level of React components or custom hooks.</li>
      </ul>

      <h3>What Happens to useMemo and useCallback?</h3>
      <p>You no longer need to write them! The compiler automatically memoizes function declarations and expensive calculations. However, you don't need to delete existing ones immediately; they will serve as hints and will be compiled out smoothly.</p>
    `
  },
  {
    slug: "typescript-advanced-utility-types",
    title: "TypeScript Advanced Utility Types",
    date: "June 25, 2026",
    readTime: "5 min read",
    category: "TypeScript",
    excerpt: "Explore powerful utility types, mapped types, conditional types, and template literal types to craft bulletproof type definitions.",
    content: `
      <p>TypeScript's type system is incredibly expressive. Beyond basic interfaces and type aliases, advanced utility types allow you to dynamically map, filter, and transform types to ensure absolute runtime safety without code duplication.</p>
      
      <h3>Conditional Types & Mapped Types</h3>
      <p>Conditional types allow you to declare types that follow an if/else structure based on relations between other types:</p>
      <pre><code>type IsString&lt;T&gt; = T extends string ? true : false;</code></pre>
      
      <p>Mapped types build on index signatures to transform every property in a type. When combined, they allow for complex operations like stripping out read-only accessors or making specific fields optional:</p>
      <pre><code>type Optional&lt;T, K extends keyof T&gt; = Omit&lt;T, K&gt; & Partial&lt;Pick&lt;T, K&gt;&gt;;</code></pre>

      <h3>Template Literal Types</h3>
      <p>Introduced in TypeScript 4.1, template literal types allow you to manipulate string values within the type system itself. This is incredibly useful for design systems, API routes, or event systems:</p>
      <pre><code>type EventName&lt;T extends string&gt; = \`on\${Capitalize&lt;T&gt;}\`;
// eventName: EventName&lt;"click"&gt; results in "onClick"</code></pre>

      <h3>Conclusion</h3>
      <p>Investing in advanced typing might seem like overhead initially, but it prevents regression errors, documents boundaries, and vastly improves autocomplete developer experience.</p>
    `
  },
  {
    slug: "deep-dive-microfrontends",
    title: "A Deep Dive into Microfrontends",
    date: "June 20, 2026",
    readTime: "8 min read",
    category: "Frontend",
    excerpt: "Learn how to structure modular frontend architectures, deploy independently, and integrate dynamically using Webpack Module Federation.",
    content: `
      <p>Scaling a large web application across multiple autonomous teams is a challenging engineering task. The <strong>Microfrontend Architecture</strong> pattern splits a monolithic frontend into independent, decoupled micro-apps that assemble dynamically in the browser.</p>
      
      <h3>Integration Strategies</h3>
      <p>Microfrontends can be integrated in three primary ways:</p>
      <ul>
        <li><strong>Build-Time Integration:</strong> Deploying microfrontends as package dependencies (e.g., npm packages). While simple, it requires a full rebuild of the host application to deploy any micro-app change.</li>
        <li><strong>Server-Side Integration:</strong> Assembling HTML fragments on the server before dispatching to the client. Highly performant but complex to manage dynamically.</li>
        <li><strong>Runtime Integration (Recommended):</strong> Loading compiled micro-apps dynamically via scripts. <strong>Webpack Module Federation</strong> is the industry standard for this pattern.</li>
      </ul>

      <h3>Dynamic Loading via Module Federation</h3>
      <p>Module Federation allows a JavaScript application to dynamically load code from another application at runtime. It solves the issue of shared dependency duplication, allowing micro-apps to share libraries like React or Lodash without loading them multiple times.</p>

      <blockquote>
        "Module Federation enables true independent deployments without sacrificing load performance or bundle size."
      </blockquote>

      <h3>Key Engineering Challenges</h3>
      <p>When adopting microfrontends, prepare to address state synchronization, shared CSS namespace collisions, and loading state management (skeletons/spinners) when swapping micro-apps.</p>
    `
  },
  {
    slug: "nextjs-core-web-vitals",
    title: "Optimizing Next.js Core Web Vitals",
    date: "June 15, 2026",
    readTime: "7 min read",
    category: "React",
    excerpt: "Pro tips for maximizing PageSpeed score and improving LCP, FID, and CLS scores in modern Next.js applications.",
    content: `
      <p>Google's Core Web Vitals heavily influence search engine optimization (SEO) and user conversion rates. Optimizing these metrics is critical for modern Next.js websites.</p>
      
      <h3>1. Largest Contentful Paint (LCP)</h3>
      <p>LCP measures loading performance. To improve LCP, ensure that your primary above-the-fold image loads instantly:
      <ul>
        <li>Use the Next.js <code>&lt;Image&gt;</code> component with the <code>priority</code> prop.</li>
        <li>Preload crucial fonts and stylesheets.</li>
        <li>Utilize ISR (Incremental Static Regeneration) or SSR to pre-render the initial HTML.</li>
      </ul>
      </p>
      
      <h3>2. Cumulative Layout Shift (CLS)</h3>
      <p>CLS measures visual stability. Layout shifts degrade user experience. Fix CLS by:
      <ul>
        <li>Always specifying width and height dimensions on images and media containers.</li>
        <li>Reserving layout slots for dynamic content, ads, or charts using skeleton shells.</li>
        <li>Using CSS property transformations like <code>transform: scale()</code> instead of changing layout offsets (e.g., <code>top</code> or <code>left</code>).</li>
      </ul>
      </p>

      <h3>3. Interaction to Next Paint (INP)</h3>
      <p>Replacing First Input Delay (FID), INP measures overall input responsiveness. Optimize INP by yielding execution blocks, minimizing long-running synchronous JavaScript tasks, and utilizing React's <code>useTransition</code> Hook to split state updates.</p>
    `
  },
  {
    slug: "aem-headless-integration",
    title: "AEM Headless Integration Patterns",
    date: "June 10, 2026",
    readTime: "6 min read",
    category: "Frontend",
    excerpt: "Best practices for consuming Adobe Experience Manager Content Fragments dynamically inside React and Next.js applications.",
    content: `
      <p>Adobe Experience Manager (AEM) is a powerful enterprise CMS. In modern headless architectures, AEM serves content dynamically via GraphQL APIs, which is then consumed by decoupled React or Next.js frontends.</p>
      
      <h3>Content Fragments vs. Experience Fragments</h3>
      <p>Content Fragments are structured, channel-agnostic data entities (JSON). Experience Fragments contain styling and layout details. For pure headless architectures, always prefer consuming <strong>Content Fragments</strong> via AEM's GraphQL API to maintain clean concerns.</p>

      <h3>Integration Code Pattern</h3>
      <p>When fetching Content Fragments in Next.js, use a typed GraphQL client to request precisely what the frontend requires, and cache responses at the edge:</p>
      <pre><code>const query = \`
  {
    articleByPath(_path: "/content/dam/articles/headless-aem") {
      item {
        title
        body { html }
      }
    }
  }
\`;</code></pre>

      <h3>Dynamic Rich Text Rendering</h3>
      <p>AEM outputs rich text formatting. To render this securely inside React, sanitise the HTML payload (using tools like <code>dompurify</code>) before rendering to prevent Cross-Site Scripting (XSS) risks.</p>
    `
  },
  {
    slug: "fluid-cursor-interactions",
    title: "Building Fluid Custom Cursor Effects",
    date: "June 05, 2026",
    readTime: "5 min read",
    category: "Frontend",
    excerpt: "A guide to building smooth lagging cursors using custom hooks, requestAnimationFrame, and performance-tuned CSS in React.",
    content: `
      <p>Custom cursors add a touch of personality and interactive engagement to websites. Creating a cursor wrapper that drags a smooth lagging ring requires synchronized mouse event listeners and performance-tuned rendering.</p>
      
      <h3>Why Not Use React State?</h3>
      <p>Updating mouse positions using standard React state triggers component re-renders at 60fps, creating major input lag and layout thrashing. Instead, use mutable refs and direct DOM updates inside a <code>requestAnimationFrame</code> loop.</p>

      <h3>Easing Math for Lagging Elements</h3>
      <p>To calculate the lagging position of the outer ring relative to the center pointer, we apply linear interpolation (lerp):</p>
      <pre><code>ringX += (mouseX - ringX) * 0.1;
ringY += (mouseY - ringY) * 0.1;</code></pre>
      <p>The multiplier <code>0.1</code> represents the interpolation speed. Lower values create a looser, more delayed drag, while higher values make it snap faster.</p>

      <h3>CSS Optimization</h3>
      <p>Always apply <code>pointer-events: none</code> and use <code>transform: translate3d()</code> to delegate coordinates calculation to the GPU, keeping layout calculations cheap and interaction fluid.</p>
    `
  },
  {
    slug: "storybook-testing-best-practices",
    title: "Effective Component Testing with Storybook",
    date: "May 28, 2026",
    readTime: "6 min read",
    category: "Frontend",
    excerpt: "Leverage Storybook interaction testing, Mock Service Worker integration, and visual regression tests to protect UI packages.",
    content: `
      <p>Storybook is much more than a component dictionary; it is a full environment for development, documentation, and interface testing.</p>
      
      <h3>1. Interaction Testing (Play Functions)</h3>
      <p>Using Storybook's <code>play</code> functions, you can write automated user journeys directly within your component stories using Testing Library APIs. These run in the browser to verify form submissions, dropdown expansion, or validation warnings:</p>
      <pre><code>export const FormSubmit = {
  play: async ({ canvasElement }) => {
    const canvas =搜尋Within(canvasElement);
    await userEvent.type(canvas.getByTestId("input"), "hello");
    await userEvent.click(canvas.getByRole("button"));
  }
};</code></pre>

      <h3>2. API Mocking with MSW</h3>
      <p>By integrating Mock Service Worker (MSW) addon, you can simulate API requests within isolated stories, ensuring components that load fetch data display mock items and handle network failures gracefully.</p>

      <h3>3. Visual Regression Testing</h3>
      <p>Integrating tools like Chromatic checks screenshots of your components against baseline versions on push, catching unintended visual alignment errors instantly.</p>
    `
  },
  {
    slug: "react-native-perf",
    title: "Performance Optimization in React Native",
    date: "May 20, 2026",
    readTime: "7 min read",
    category: "React",
    excerpt: "Optimize React Native application performance by addressing bridge traffic, memory leaks, image loading, and list rendering.",
    content: `
      <p>Building high-performance React Native apps requires a deep understanding of how the JS threads communicate with native platforms. Laggy scrolling and delayed inputs are almost always related to bridge bottlenecks.</p>
      
      <h3>1. Leverage the New Architecture</h3>
      <p>The new architecture replaces the asynchronous JSON serialization bridge with **JSI (JavaScript Interface)**, allowing direct, synchronous JS invocation of native C++ objects. This eliminates serialization overhead entirely.</p>

      <h3>2. Virtualized List Tuning</h3>
      <p>Lists are prime culprits for memory issues. When using <code>FlatList</code>, always declare the following performance props:
      <ul>
        <li><code>getItemLayout</code>: Skips dynamic cell height calculation.</li>
        <li><code>removeClippedSubviews</code>: Unmounts off-screen elements to save memory.</li>
        <li><code>windowSize</code>: Restricts the viewport prepopulation zone.</li>
      </ul>
      </p>

      <h3>3. Image Caching</h3>
      <p>Native rendering of large images consumes heavy RAM. Always use optimized wrappers like <code>react-native-fast-image</code> which cache image payloads on the native filesystem side directly.</p>
    `
  },
  {
    slug: "css-grid-vs-flexbox",
    title: "CSS Grid vs. Flexbox: Layout Mastery",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Frontend",
    excerpt: "Understand when to use CSS Grid versus Flexbox to create highly responsive, dynamic, and clean web structures.",
    content: `
      <p>CSS layout is dominated by two modern specs: Flexbox and Grid. While they overlap in capabilities, they are designed for fundamentally different paradigms.</p>
      
      <h3>1. One Dimension vs. Two Dimensions</h3>
      <p>Use **Flexbox** when laying out items in a single dimension (either row OR column, like headers, button rows, or vertical forms). Use **CSS Grid** when managing layout in two dimensions simultaneously (columns AND rows, like complex landing page grids, dashboards, or card displays).</p>

      <h3>2. Content-Out vs. Layout-In</h3>
      <p>Flexbox works <strong>content-out</strong>. The size of the parent flex container adjusts automatically based on the intrinsic size of its child items. Grid works <strong>layout-in</strong>. You define the explicit matrix columns/rows on the parent container, and the content flows into these slots.</p>

      <h3>Combining the Two</h3>
      <p>Premium layouts combine them: use Grid for the main page structural columns, and nested Flexbox layouts to align headers, texts, and icons inside grid cards.</p>
    `
  },
  {
    slug: "frontend-cicd-github-actions",
    title: "Mastering CI/CD Pipelines for Frontend",
    date: "May 10, 2026",
    readTime: "6 min read",
    category: "TypeScript",
    excerpt: "Automate your checks, type compilations, component tests, and serverless deployments using GitHub Actions.",
    content: `
      <p>A reliable CI/CD pipeline protects code quality and automates static code deployments. Building standard workflows ensures code compiles cleanly, lint checks pass, and tests execute on every pull request.</p>
      
      <h3>1. Basic Workflow Pipeline</h3>
      <p>A clean GitHub Action runs jobs in parallel to minimize runtimes:
      <ul>
        <li><strong>Linting:</strong> Verify formatting using ESLint/Prettier.</li>
        <li><strong>Typecheck:</strong> Run <code>tsc --noEmit</code> to catch TypeScript violations.</li>
        <li><strong>Unit Tests:</strong> Run Jest tests with coverage reporting.</li>
      </ul>
      </p>

      <h3>2. Deploying to Vercel/Netlify</h3>
      <p>Integrate GitHub Actions with Vercel deployment webhooks. Pushes to the <code>main</code> branch compile static files and publish to production, while pushes to dev branches build sandbox preview deployments automatically, reducing deployment wait cycles.</p>

      <h3>3. Build Cache Optimization</h3>
      <p>Speed up runs by utilizing caching on <code>node_modules</code> and package lock dependencies, cutting typical build runtimes by over 50%.</p>
    `
  }
];
