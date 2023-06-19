<script lang="ts">
    import AutoComplete from 'simple-svelte-autocomplete';
    import type { Item } from './item.model';

    const shouldDisableFields = false;

    let selectedItem: Item | undefined = undefined;

    const items: Item[] = [
        {
            id: 1,
            description: 'a',
            price: 1,
        },
        {
            id: 2,
            description: 'b',
            price: 2,
        },
    ];

    function onChangeItem(item: Item) {
        console.log(item);
    }
</script>

<div class="row top1 form-group">
    <AutoComplete
        items="{items}"
        labelFieldName="description"
        valueFieldName="description"
        lock="{false}"
        closeOnBlur="{false}"
        showClear="{true}"
        itemFilterFunction="{(item, keywords) => new RegExp(keywords, 'i').test(item.description) || String(item.price).includes(keywords)}"
        bind:selectedItem="{selectedItem}"
        disabled="{shouldDisableFields}"
        onChange="{(item) => onChangeItem(item)}">
        <div slot="item" let:item>
            {#if item.description}
                <span>{item.description} {item.price}</span>
            {:else}
                <span>---</span>
            {/if}
        </div>

        <div slot="no-results">No results</div>
    </AutoComplete>
</div>

<style lang="scss">
</style>
