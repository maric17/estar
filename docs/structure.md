# Project Structural Design Rules

To maintain consistency, readability, and a premium aesthetic across all pages, please follow these structural guidelines for all UI components.

## Section and Container Pattern
Every page-level section **MUST** wrap its inner content in a `Container` component (or a container div with consistent centering and maximum width). This ensures that content is perfectly aligned across different devices and screen sizes.

### Correct Implementation Pattern:
```tsx
import Container from '@/components/layout/Container';

const MySection = () => (
    <section className="bg-black py-20 px-6 lg:px-12">
        <Container className="flex flex-col items-center">
            {/* Your content here */}
        </Container>
    </section>
);
```

### The Container Component
The `Container` component ensures consistent maximum width (`max-w-7xl`) and horizontal centering (`mx-auto`) across all sections of the application. It should be used for all page-level content grouping.

## Naming Conventions
- Components should be named in PascalCase (e.g. `Header.tsx`, `Footer.tsx`).
- Sub-components should reside in the same directory as their parent if they are specific to that page (e.g. `src/components/home/ImpactStats.tsx`).
