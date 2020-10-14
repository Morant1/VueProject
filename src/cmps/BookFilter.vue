<template>
    <section class="book-filter">
        <div>
        <input class="input-text input" type="text" placeholder="Search by book name" v-model="filterBy.title" @input="emitFilter" />
        </div>
        <div>
        <label for="from">From</label>
        <input id="from" class="input input-number" type="number"  v-model.number="filterBy.fromPrice" @input="emitFilter" />
        <label for="to">To</label>
        <input id="to" class="input input-number" type="number"  v-model.number="filterBy.toPrice" @input="emitFilter" />
        </div>
    </section>
</template>

<script>

export default {
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice:-Infinity,
                toPrice:Infinity
            }
        }
    },
    methods: {
        emitFilter() {
            if(!this.filterBy.fromPrice) this.filterBy.fromPrice = -Infinity
            if(!this.filterBy.toPrice) this.filterBy.toPrice = Infinity
            this.$emit('filtered', {...this.filterBy})
        }
    }
}
</script>