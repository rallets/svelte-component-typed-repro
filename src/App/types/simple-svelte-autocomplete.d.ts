declare module 'simple-svelte-autocomplete' {
    import { SvelteComponentTyped } from 'svelte';

    export interface AutoCompleteProps
        extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {
        items: any[];
        labelFieldName?: string;
        valueFieldName?: string;
        lock?: boolean;
        closeOnBlur?: boolean;
        showClear?: boolean;
        itemFilterFunction?: (item: any, keywords: string) => boolean;
        selectedItem?: any | undefined;
        disabled?: boolean;
        onChange: (item: any) => void;
    }

    export default class AutoComplete extends SvelteComponentTyped<AutoCompleteProps> { }
}
