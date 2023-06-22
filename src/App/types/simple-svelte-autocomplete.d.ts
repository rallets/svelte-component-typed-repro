/* NB: you cannot have a import or export on top of this file, otherwise it will not work. */

declare module 'simple-svelte-autocomplete' {
    import { SvelteComponentTyped } from 'svelte';

    export interface AutoCompleteProps<T>
        extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {
        items: T[];
        labelFieldName?: string;
        valueFieldName?: string;
        lock?: boolean;
        closeOnBlur?: boolean;
        showClear?: boolean;
        itemFilterFunction?: (T, keywords) => boolean;
        selectedItem?: T | undefined;
        disabled?: boolean;
        onChange: (item: T) => void
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface AutoCompleteEvents {
        // NOP
    }

    export default class AutoComplete extends SvelteComponentTyped<AutoCompleteProps<T>, AutoCompleteEvents, {
        'item': { item: T },
        'no-results': null
    }> { }
}
