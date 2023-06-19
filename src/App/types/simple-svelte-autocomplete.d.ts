import type { Item } from '../item.model';

declare module 'simple-svelte-autocomplete' {
    import { SvelteComponentTyped } from 'svelte';

    export interface AutoCompleteProps
        extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {
        items: Item[];
        // ...
    }

    export interface AutoCompleteEvents {
        onChange: (value: Item) => void
    }

    export class AutoComplete extends SvelteComponentTyped<AutoCompleteProps, AutoCompleteEvents> { }
}

// https://github.com/carbon-design-system/sveld
import type { SvelteComponentTyped } from 'svelte';

export interface AutoCompleteProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {
    items: Item[];
    // onChange: (value: Item) => void;
    // ...
}

export class AutoComplete extends SvelteComponentTyped<
    AutoCompleteProps,
    {
        onChange: (value: Item) => void
    },
    { default: {} }
> { }
