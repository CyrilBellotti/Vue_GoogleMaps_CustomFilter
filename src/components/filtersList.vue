<template>
    <div>
        <p><button class="clearFilter" @click="clearFilter()">Clear filter</button></p>
        <div :key="index" v-for="(filter, index) in filterList">
            <a @click="selectFilterList(filter)" class="level1">
                <strong>{{filter.name}}</strong>
            </a>
            <div :key="index" v-for="(item, index) in filter.items">
                <div v-if="filter.selected && filter.items.length">
                    <a @click="selectFilterItem(item, filter)" :class="[filter.choice === item ? 'level2-active' : 'level2']">{{item}}</a>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
export default {
    name: 'maps',
    props: ['markersWithFilters', 'markers'],
    data () {
        return {
            markersWithFiltersCopy: this.markersWithFilters,
            filterList: {
                store: {
                    id: 1,
                    name: 'store',
                    items: [],
                    selected: false,
                    choice: null,
                },
                product: {
                    id: 2,
                    name: 'product',
                    items: [],
                    selected: false,
                    choice: null,
                },
                type: {
                    id: 3,
                    name: 'type',
                    items: [],
                    selected: false,
                    choice: null,
                }
            },
        }
    },
    methods: {
        selectFilterList(filter) {
            filter.selected = !filter.selected;
            this.markers.forEach((marker) => {
                if (!filter.items.find((item) => { return item === marker[filter.name]})) {
                    filter.items.push( marker[filter.name]);
                }
            })
            if (!filter.selected) {
                this.filterList[filter.name].choice = null;
                this.reloadMarkersWithFilter();
            }
        },
        selectFilterItem(item, filter) {
            if (filter.choice === item) {
                filter.choice = null;
                this.reloadMarkersWithFilter();
                return;
            }
            filter.choice = item;
            this.reloadMarkersWithFilter();
        },
        reloadMarkersWithFilter() {
            this.markersWithFiltersCopy = [];
            this.markers.forEach((marker) => {
                if ((!this.filterList.store.choice || marker.store === this.filterList.store.choice) &&
                (!this.filterList.product.choice || marker.product === this.filterList.product.choice) &&
                (!this.filterList.type.choice || marker.type === this.filterList.type.choice) ) {
                    this.markersWithFiltersCopy.push(marker)
                }
            })
            this.$emit('updateMarkersWithFilters', this.markersWithFiltersCopy);
        },
        clearFilter() {
            Object.keys(this.filterList).forEach((filterName) => {
                this.filterList[filterName].choice = null;
            })
            this.reloadMarkersWithFilter();
            this.$router.push({ path: '/' });
        },
    },
    mounted() {
        Object.keys(this.filterList).forEach((filterName) => {
            this.filterList[filterName].choice = null;
            this.filterList[filterName].selected = false;
        })
        this.reloadMarkersWithFilter();  
    }
}
</script>

<style scoped>
.level1 {
    display: flex;
    font: bold 1.5rem "din-2014", Helvetica, Arial, sans-serif;
    z-index: 1;
    background: #F0F1F1;
    text-transform: uppercase;
    width: 100%;
    border: solid #888888;
    border-width: 2px 2px 2px 0;
}

.level1:hover { 
    display: flex;
    font: bold 1.5rem "din-2014", Helvetica, Arial, sans-serif;
    z-index: 1;
    background: #888888;
    text-transform: uppercase;
    width: 100%;
    border: solid #888888;
    border-width: 2px 2px 2px 0;
}

.level2 {
    font: normal 1rem "din-2014", Helvetica, Arial, sans-serif;
    padding-left: 20px;
    display: flex;
    background-color: #fff;
    width: 100%;
}

.level2:hover {
    font: normal 1rem "din-2014", Helvetica, Arial, sans-serif;
    padding-left: 20px;
    display: flex;
    background-color: #F0F1F1;
    width: 100%;
}

.level2-active {
    font: normal 1rem "din-2014", Helvetica, Arial, sans-serif;
    padding-left: 20px;
    display: flex;
    background-color: #F0F1F1;
    width: 100%;
}
</style>
