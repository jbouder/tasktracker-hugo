import { atom } from 'jotai';

/**
 * Global app atoms — add your application-wide state here.
 *
 * Rules:
 * - Use atoms for state that is shared across multiple unrelated components.
 * - Use local useState for component-local state.
 * - Use TanStack Query (useQuery/useMutation) for server state.
 * - Never duplicate server state in atoms — derive from query data instead.
 */

// Example atom — replace or extend with real app state.
export const sidebarOpenAtom = atom<boolean>(false);
