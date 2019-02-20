<template>
    <div>
        <div>
            <h4>Filter by :</h4>
            <ul class="list-style">
                <li :key="index" v-for="(filterName, index) in Object.keys(filterList)">
                    <input type="checkbox"
                        :id="filterList[filterName].id"
                        v-model="filterList[filterName].selected"
                        @click="selectFilterList(filterList[filterName])">
                    <label for="filtre">{{filterList[filterName].name}}</label>
                </li>
            </ul>
        </div>
        <p><button class="clearFilter" @click="clearFilter()">Clear filter</button></p>
        <div :key="index" v-for="(filterName, index) in Object.keys(filterList)">
            <p v-if="filterList[filterName].selected">
                {{filterList[filterName].name}}
                <select v-model="filterList[filterName].choice" @change="reloadMarkersWithFilter()">
                    <option :value="null"></option>
                    <option :key="index" v-for="(item, index) in filterList[filterName].items" :value="item">{{item}}</option>
                </select>
            </p>
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
            this.markers.forEach((marker) => {
                if (!filter.items.find((item) => { return item === marker[filter.name]})) {
                    filter.items.push( marker[filter.name])
                }
            })
            if (filter.selected) {
                this.filterList[filter.name].choice = null;
                this.changeFilterChoice()
            }
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

<style>
</style>
