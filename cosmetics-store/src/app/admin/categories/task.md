# Category System Fixes & Edit Feature Task List

- `[ ]` Phase 1: API Stability
  - `[ ]` Update `src/app/api/categories/[id]/route.ts` with `PUT` and `withAdminAuth`.
  - `[ ]` Fix the `params` bug in the `DELETE` route.
- `[ ]` Phase 2: Homepage Integration
  - `[ ]` Update `CategorySection.tsx` to show all dynamic categories.
- `[ ]` Phase 3: Admin UI Enhancements
  - `[ ]` Add Edit button to `src/app/admin/categories/page.tsx`.
  - `[ ]` Create `src/app/admin/categories/edit/[id]/page.tsx` with full form support.
