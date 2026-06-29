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
    const canvas = canvasElement;
    // Interaction code
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
      <p>Lists are prime culprits for memory issues. When using <code>FlatList</code>, always declare optimized virtualized settings to manage cell heights.</p>
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
      <p>Use **Flexbox** when laying out items in a single dimension (either row OR column, like headers, button rows, or vertical forms). Use **CSS Grid** when managing layout in two dimensions simultaneously (columns AND rows).</p>
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
    `
  },
  // -------------------------------------------------------------------
  // 20 NEW ARTICLES START HERE
  // -------------------------------------------------------------------
  {
    slug: "js-execution-context",
    title: "Demystifying JavaScript Execution Context",
    date: "May 05, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    excerpt: "How JavaScript runs code under the hood. Learn about the Call Stack, Creation Phase, and Execution Phase.",
    content: `
      <p>Everything in JavaScript happens inside an <strong>Execution Context</strong>. Think of it as a big box where JavaScript code is evaluated and executed.</p>
      <h3>The Two Phases</h3>
      <p>An execution context is created in two distinct phases:
      <ol>
        <li><strong>Memory Creation Phase:</strong> JS engine scans the code and allocates memory to variables (initialized as <code>undefined</code>) and functions (copied as entire declarations).</li>
        <li><strong>Code Execution Phase:</strong> Code is executed line-by-line, and values are assigned to memory slots.</li>
      </ol>
      </p>
      <h3>The Call Stack</h3>
      <p>JavaScript manages execution contexts using the <strong>Call Stack</strong>. When a script runs, the Global Execution Context is pushed to the bottom. Each function invocation creates a new context, which is pushed on top and popped off when execution completes.</p>
    `
  },
  {
    slug: "hoisting-temporal-dead-zone",
    title: "Understanding Hoisting & Temporal Dead Zone",
    date: "May 02, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Discover the difference in hoisting behavior between var, let, and const, and why the Temporal Dead Zone exists.",
    content: `
      <p>In JavaScript, you can access functions and variables before they are declared in the code. This phenomenon is known as <strong>Hoisting</strong>.</p>
      <h3>Var vs. Let/Const Hoisting</h3>
      <p>Variables declared with <code>var</code> are hoisted and initialized with <code>undefined</code>. Variables declared with <code>let</code> and <code>const</code> are also hoisted, but they are initialized inside a separate memory scope (Script scope) and are not initialized.</p>
      <h3>The Temporal Dead Zone (TDZ)</h3>
      <p>The time window between a <code>let</code> or <code>const</code> variable's hoisting allocation and its actual inline initialization statement is called the <strong>Temporal Dead Zone (TDZ)</strong>. Accessing the variable in this zone triggers a <code>ReferenceError</code>.</p>
    `
  },
  {
    slug: "js-closures-deep-dive",
    title: "How Closures Work in Modern JavaScript",
    date: "April 28, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    excerpt: "Master closures, lexical environment nesting, and real-world practical use cases for state encapsulation.",
    content: `
      <p>A <strong>Closure</strong> is a function bundled together with references to its surrounding state—its <strong>Lexical Environment</strong>.</p>
      <blockquote>
        "A closure gives an inner function access to the outer function's scope even after the outer function has returned."
      </blockquote>
      <h3>Practical Use Cases</h3>
      <p>Closures are widely used in JavaScript for:
      <ul>
        <li><strong>Data Hiding & Encapsulation:</strong> Creating private variables that cannot be accessed or modified from the outside.</li>
        <li><strong>Currying & Memoization:</strong> Retaining values across multiple invocations.</li>
        <li><strong>Iterators and Factories:</strong> Preserving internal loop counters.</li>
      </ul>
      </p>
    `
  },
  {
    slug: "javascript-event-loop",
    title: "Deep Dive into the Event Loop & Microtask Queue",
    date: "April 25, 2026",
    readTime: "7 min read",
    category: "JavaScript",
    excerpt: "Learn how JavaScript handles asynchronous operations, and the priority differences between Macrotasks and Microtasks.",
    content: `
      <p>JavaScript is single-threaded, but it achieves concurrency through the browser Web APIs and the **Event Loop**.</p>
      <h3>Macrotasks vs. Microtasks</h3>
      <p>Asynchronous callbacks are routed to two different queues:
      <ul>
        <li><strong>Microtask Queue:</strong> Holds Promise callbacks, <code>queueMicrotask</code>, and MutationObserver events. This queue has absolute priority. The event loop will empty the entire microtask queue before executing any macrotask.</li>
        <li><strong>Callback (Macrotask) Queue:</strong> Holds <code>setTimeout</code>, <code>setInterval</code>, and DOM event callbacks.</li>
      </ul>
      </p>
      <p>Understanding this priority queue structure is key to predicting exact execution sequences in complex asynchronous pipelines.</p>
    `
  },
  {
    slug: "event-bubbling-capturing-delegation",
    title: "Mastering Event Bubbling, Capturing, & Delegation",
    date: "April 20, 2026",
    readTime: "6 min read",
    category: "Frontend",
    excerpt: "Explore the DOM event propagation phases and how Event Delegation optimizes event listeners in large pages.",
    content: `
      <p>DOM event propagation happens in three phases: Capturing (trickling), Target, and Bubbling.</p>
      <h3>Bubbling vs. Capturing</h3>
      <p>By default, event listeners listen during the <strong>Bubbling Phase</strong> (propagating from the child item up through parent nodes). You can capture events during the <strong>Capturing Phase</strong> by passing <code>{ capture: true }</code> as the third argument to <code>addEventListener</code>.</p>
      <h3>Event Delegation</h3>
      <p>Instead of binding a separate click handler to 100 list items, you bind a single event listener to the parent element. This listener intercepts bubbling clicks and uses <code>e.target</code> to verify which child clicked, saving heavy memory allocations.</p>
    `
  },
  {
    slug: "polyfills-map-filter-reduce",
    title: "Polyfills: Writing Map, Filter, and Reduce",
    date: "April 15, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Learn how array prototype methods are implemented under the hood by building custom polyfills from scratch.",
    content: `
      <p>Writing polyfills is a classic method to understand JavaScript prototype behaviors. Let's write custom versions of <code>map</code>, <code>filter</code>, and <code>reduce</code>.</p>
      <h3>Map Polyfill</h3>
      <pre><code>Array.prototype.myMap = function(cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    temp.push(cb(this[i], i, this));
  }
  return temp;
};</code></pre>
      <h3>Reduce Polyfill</h3>
      <pre><code>Array.prototype.myReduce = function(cb, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = accumulator !== undefined 
      ? cb(accumulator, this[i], i, this) 
      : this[i];
  }
  return accumulator;
};</code></pre>
    `
  },
  {
    slug: "call-apply-bind-polyfills",
    title: "Understanding Call, Apply, & Bind with Polyfills",
    date: "April 10, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    excerpt: "Learn how to explicitly bind JavaScript contexts and build polyfills for call, apply, and bind.",
    content: `
      <p>JavaScript functions run within specific lexical contexts. The methods <code>call</code>, <code>apply</code>, and <code>bind</code> allow us to explicitly declare what the <code>this</code> keyword references.</p>
      <h3>Custom Bind Polyfill</h3>
      <p>Let's write a custom implementation of <code>Function.prototype.bind</code>:</p>
      <pre><code>Function.prototype.myBind = function(...args) {
  let obj = this;
  let params = args.slice(1);
  return function(...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};</code></pre>
    `
  },
  {
    slug: "javascript-function-currying",
    title: "The Power of Function Currying in JavaScript",
    date: "April 05, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Understand currying using closures and binds, and how to write a generic recursive currying function.",
    content: `
      <p><strong>Currying</strong> is a functional programming technique where a function with multiple arguments is transformed into a sequence of nesting functions, each accepting a single argument.</p>
      <h3>Generic Curry implementation</h3>
      <pre><code>function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}</code></pre>
    `
  },
  {
    slug: "prototypal-inheritance-javascript",
    title: "JavaScript Prototype & Prototypal Inheritance",
    date: "March 28, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    excerpt: "Learn about proto, prototype properties, prototype chains, and how inheritance works in JavaScript.",
    content: `
      <p>Unlike classical class-based languages, JavaScript uses <strong>Prototypal Inheritance</strong>. Every object in JavaScript has an internal property linking it to another object, called its **prototype**.</p>
      <h3>The Prototype Chain</h3>
      <p>When you access a property on an object, JavaScript looks for it locally. If not found, it traverses up the prototype chain link (<code>__proto__</code>) until it either finds the property or reaches <code>null</code>.</p>
    `
  },
  {
    slug: "implementing-debouncing-polyfill",
    title: "Implementing a High-Performance Debouncing Polyfill",
    date: "March 25, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Step-by-step implementation of debouncing to limit search and keypress event handler invocations.",
    content: `
      <p><strong>Debouncing</strong> delays function execution until a specified delay has elapsed since the last time the function was called.</p>
      <h3>Custom Debounce</h3>
      <pre><code>function debounce(fn, delay) {
  let timer;
  return function(...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}</code></pre>
    `
  },
  {
    slug: "implementing-throttling-polyfill",
    title: "Implementing a High-Performance Throttling Polyfill",
    date: "March 20, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Write a throttle polyfill to limit scrolls, resize handlers, and drag updates to fixed intervals.",
    content: `
      <p><strong>Throttling</strong> limits function execution to once per specified interval, ignoring all invocations occurring between frames.</p>
      <h3>Custom Throttle</h3>
      <pre><code>function throttle(fn, limit) {
  let flag = true;
  return function(...args) {
    const context = this;
    if (flag) {
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
}</code></pre>
    `
  },
  {
    slug: "event-loop-vs-call-stack",
    title: "Deep Dive: Event Loop vs. Call Stack",
    date: "March 15, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Trace how the JS engine moves functions from the Call Stack through Web APIs into queues.",
    content: `
      <p>The call stack executing code and the event loop pulling async callbacks are distinct units inside the JS environment.</p>
    `
  },
  {
    slug: "javascript-promises-combinators",
    title: "Understanding Promises & Promise Combinators",
    date: "March 10, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    excerpt: "Compare Promise.all, Promise.race, Promise.any, and Promise.allSettled and when to use each.",
    content: `
      <p>Promises represent a eventual placeholder value for async tasks. JavaScript provides four combinators:
      <ul>
        <li><strong>Promise.all:</strong> Fails instantly if one promise rejects; resolves when all succeed.</li>
        <li><strong>Promise.allSettled:</strong> Never rejects; returns status arrays for all resolved or rejected promises.</li>
        <li><strong>Promise.race:</strong> Resolves/rejects as soon as the first promise settles.</li>
        <li><strong>Promise.any:</strong> Resolves as soon as the first promise succeeds; rejects if all fail.</li>
      </ul>
      </p>
    `
  },
  {
    slug: "functions-first-class-higher-order",
    title: "First-Class, Higher-Order, and Anonymous Functions",
    date: "March 05, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Learn the core taxonomy of functions in functional JavaScript and how they are manipulated.",
    content: `
      <p>In JavaScript, functions are **First-Class Citizens**, meaning they can be passed as arguments, returned from functions, and assigned to variables.</p>
    `
  },
  {
    slug: "scope-shadowing-illegal-shadowing",
    title: "Block Scope, Shadowing, and Illegal Shadowing",
    date: "February 28, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    excerpt: "Understand let/const lexical boundary rules and what constitutes illegal shadowing in JavaScript.",
    content: `
      <p>Variable shadowing occurs when an inner scope declares a variable with the same name as an outer scope variable.</p>
      <h3>Illegal Shadowing</h3>
      <p>You cannot shadow a <code>let</code> variable with a <code>var</code> variable in a nested block. This raises a compilation syntax error because <code>var</code> attempts to escape the block scope, leaking context bindings.</p>
    `
  },
  {
    slug: "memoization-polyfill-optimization",
    title: "Memoization Polyfill: Optimizing Heavy Tasks",
    date: "February 20, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    excerpt: "Write a custom memoize function that caches arguments to optimize CPU-heavy procedures.",
    content: `
      <p>Memoization is a caching pattern that maps unique function arguments to their calculated results.</p>
      <pre><code>function myMemoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache[key]) {
      cache[key] = fn.apply(this, args);
    }
    return cache[key];
  };
}</code></pre>
    `
  },
  {
    slug: "javascript-map-set-weakmap-weakset",
    title: "JavaScript Map, Set, WeakMap, & WeakSet",
    date: "February 15, 2026",
    readTime: "6 min read",
    category: "JavaScript",
    excerpt: "Explore the ES6 collections and understand the key garbage-collection advantages of WeakMap and WeakSet.",
    content: `
      <p>ES6 introduced key-value collections. Unlike objects, Map keys can be of any data type. WeakMaps hold weak references to object keys, allowing automatic garbage collection if the key object has no other reference pointer.</p>
    `
  },
  {
    slug: "nextjs-ssr-deep-dive",
    title: "Understanding Server-Side Rendering in Next.js",
    date: "February 10, 2026",
    readTime: "7 min read",
    category: "React",
    excerpt: "How Page hydration, SSR, and dynamic HTML rendering work inside Next.js App Router.",
    content: `
      <p>Server-Side Rendering (SSR) compiles React component structures into static HTML on each request. The client downloads static markup, and React binds events dynamically, a process called **Hydration**.</p>
    `
  },
  {
    slug: "debounce-vs-throttle-scenarios",
    title: "Debounce vs. Throttle: Real-world Scenarios",
    date: "February 05, 2026",
    readTime: "5 min read",
    category: "Frontend",
    excerpt: "Deep comparison of debouncing vs throttling with visual examples of resize, search search bars, and click events.",
    content: `
      <p>Use debouncing for events that occur in bursts where only the final outcome matters (like search suggestions). Use throttling for continuous updates where the rate matters (like drag-drop or page scroll handlers).</p>
    `
  },
  {
    slug: "nextjs-server-actions-hydration",
    title: "Next.js Server Actions & Hydration Strategy",
    date: "January 28, 2026",
    readTime: "6 min read",
    category: "React",
    excerpt: "Learn how to invoke server-side operations directly within forms using modern Next.js Server Actions.",
    content: `
      <p>Server Actions allow frontend form components to securely invoke Node.js server methods without manually wiring up REST or GraphQL endpoints.</p>
    `
  }
];
