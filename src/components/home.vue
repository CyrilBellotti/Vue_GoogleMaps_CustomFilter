<template>
    <div class="app">
        <div class="sidenav">
            <h3>Filter type :</h3>
            <ul class="list-style">
                <li><input type="radio" id="one" value="Dropdown" v-model="filter">Dropdown</li>
                <li><input type="radio" id="one" value="List" v-model="filter">List</li>
            </ul>
            <hr>
            <filters-dropdown-component v-if="filter === 'Dropdown'"
                               :markersWithFilters="markersWithFilters"
                               :markers="markers"
                               @updateMarkersWithFilters="updateMarkersWithFilters"/>
            <filters-list-component v-if="filter === 'List'"
                               :markersWithFilters="markersWithFilters"
                               :markers="markers"
                               @updateMarkersWithFilters="updateMarkersWithFilters"/>
        </div>
        <div class="content">
            <maps-component :markersWithFilters="markersWithFilters" :activeMarker="marker"/>
        </div>
    </div>
</template>

<script>
import MapsComponent from "./maps";
import FiltersDropdownComponent from "./filtersDropdown";
import FiltersListComponent from "./filtersList";

export default {
    name: 'home',
    components: {
        mapsComponent: MapsComponent,
        filtersDropdownComponent: FiltersDropdownComponent,
        filtersListComponent: FiltersListComponent
    },
    data () {
        return {
            markers: [
                {
                    id:1, 
                    name: 'Rosemont',
                    address: '419-405 Boulevard Rosemont',
                    city: 'Montreal',
                    state: 'Canada',
                    position: {
                        lat: 45.531322,
                        lng: -73.59815
                    },
                    icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
                    type: 'Metro',
                    product: 'Florentine',
                    store: 'HEB'
                },
                {
                    id:2, 
                    name: 'Laurier',
                    address: '4985-5009 Rue Berri',
                    city: 'Montreal',
                    state: 'Canada',
                    position: {
                        lat: 45.527374,
                        lng: -73.586825
                    },
                    icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
                    type: 'Metro',
                    product: 'Florentine',
                    store: 'HEB'
                },
                {
                    id:3, 
                    name: 'Université de Montréal',
                    address: 'Universite de Montreal',
                    city: 'Montreal',
                    state: 'Canada',
                    position: {
                        lat: 45.502642,
                        lng: -73.618247
                    },
                    icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
                    type: 'Metro',
                    product: 'Florentine',
                    store: 'HEB'
                },
                {
                    id:4, 
                    name: 'Gare de Vendôme',
                    address: 'Gare de Vendome',
                    city: 'Montreal',
                    state: 'Canada',
                    position: {
                        lat: 45.473449,
                        lng: -73.603487
                    },
                    icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
                    type: 'Metro',
                    product: 'Florentine',
                    store: 'Kroger'
                },
                {
                    id:5, 
                    name: '23e Avenue',
                    address: '2177 23e Avenue',
                    city: 'Montreal',
                    state: 'Canada',
                    position: {
                        lat: 45.472901,
                        lng: -73.707239
                    },
                    icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
                    type: 'Autre',
                    product: 'Potatoe',
                    store: 'Kroger'
                },
                {
                    id:6, 
                    name: 'Maisonneuve',
                    address: 'Mercier-Hochelaga-Maisonneuve',
                    city: 'Montreal',
                    state: 'Canada',
                    position: {
                        lat: 45.591271,
                        lng: -73.541185
                    },
                    icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
                    type: 'Autre',
                    product: 'Potatoe',
                    store: 'Trader'
                }
            ],
            markersWithFilters: [],
            filter: 'Dropdown',
            marker: null,
        }
    },
    computed: {
    },
    methods: {
        updateMarkersWithFilters(e) {
            this.markersWithFilters = e;
        }
    },
    watch: {
    },
    mounted() {
        this.markersWithFilters = this.markers;
        this.marker = null;
        if (this.$route.params.namePlace) {
            this.marker = this.markersWithFilters.find((e) => { return e.name === this.$route.params.namePlace});
        }
    }
}
</script>

<style>
.sidenav {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 10px;
}

.content {
  margin-left: 200px;
  padding: 0px 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
}

.app {
    font-family: Helvetica, Arial, sans-serif;
}

.list-style {
    list-style-type: none;
}

.clearFilter {
    margin-left:120px
}
</style>
