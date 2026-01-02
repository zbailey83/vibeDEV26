
import { CourseLevel } from './types';

export const COURSE_LEVELS: CourseLevel[] = [
  {
    id: 1,
    title: "LEVEL 01: NEON ARCHITECT",
    subtitle: "Structural Integrity in the Void",
    description: "Deconstruct the DOM. Learn to build resilient, semantic interfaces that survive the chaos of modern browsers. Flexbox, Grid, and the philosophy of the container.",
    icon: "Code2",
    color: "#ec4899",
    tags: ["HTML6 Spec", "Post-CSS", "A11Y Stealth"]
  },
  {
    id: 2,
    title: "LEVEL 02: SIGNAL & NOISE",
    subtitle: "The Reactive Heartbeat",
    description: "Master the pulse of data. State management is no longer a mystery. Dive deep into the Event Loop and learn to separate the signal from the noise in asynchronous flows.",
    icon: "Zap",
    color: "#22d3ee",
    tags: ["RxJS Patterns", "Concurrent Mode", "Web Workers"]
  },
  {
    id: 3,
    title: "LEVEL 03: SYNTHETIC REALITY",
    subtitle: "Interface Synthesis",
    description: "Where design meets code. Learn to animate with mathematical precision. Transform flat components into living, breathing entities using GSAP and Framer techniques.",
    icon: "Cpu",
    color: "#a855f7",
    tags: ["Bezier Theory", "Frame Budgeting", "GPU Accel"]
  },
  {
    id: 4,
    title: "LEVEL 04: THE EVENT HORIZON",
    subtitle: "Global Deployment & Scale",
    description: "Launch your application into the stratosphere. Serverless architecture, Edge computing, and the art of zero-downtime deployment. The final evolution.",
    icon: "Rocket",
    color: "#fbbf24",
    tags: ["Kubernetes", "Edge Functions", "Terraform"]
  }
];

// A more sweeping, dramatic path for the scroll journey
export const SVG_PATH = "M 250 100 C 450 300 50 500 250 700 C 450 900 50 1100 250 1300 C 450 1500 50 1700 250 1900";
