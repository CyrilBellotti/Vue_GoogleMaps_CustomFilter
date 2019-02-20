<template>
    <div>
    <gmap-map :center="center"
              ref="gmap"
              :zoom="10"
              :class="[marker && !activeWindow ? 'mapsWithModal' : 'maps']"
              @click="closeInfoWindow()">
            <GmapCluster :zoom-on-click="true">
                <GmapMarker :key="index"
                            v-for="(marker, index) in markersWithFilters"
                            :opacity="getMarkerOpacity(marker.id)"
                            :position="marker.position"
                            :clickable="true"
                            :draggable="false"
                            @click="setActiveMarker(marker)">
                </GmapMarker>
                <gmap-info-window v-if="activeWindow"
                                  :position="marker.position"
                                  :opened="true"
                                  :options="{maxWidth: 300}"
                                  @closeclick="closeInfoWindow()">
                    <p><strong>Name</strong></p><p> {{marker.name}}</p><br>
                    <p><strong>Address</strong> :</p>
                    <p> {{marker.address}}</p>
                    <p>{{marker.city}} - {{marker.state}}</p>
                    <br>
                    <a :href="'https://www.google.com/maps/dir//'
                        + marker.address + ', '
                        + marker.city + ', '
                        + marker.state"
                        target="_blank">
                        <span>Get Direction</span>
                    </a>
                    <br>
                    <button @click="show()">
                        <router-link :to="'/' + marker.name">Details</router-link>
                    </button>
                </gmap-info-window>
            </GmapCluster>
        </gmap-map>
        <div v-if="marker && !activeWindow">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <h1>{{marker.name}}</h1> 
                            <p><strong>Address :</strong> {{marker.address}} <br>{{marker.city}} - {{marker.state}}</p>
                            <p><strong>Type :</strong> {{marker.type}}</p>
                            <br>
                            <a :href="'https://www.google.com/maps/dir//'
                                + marker.address + ', '
                                + marker.city + ', '
                                + marker.state"
                                target="_blank">
                                <span>Get Direction</span>
                            </a>
                            <br>
                            <button @click="hide()">
                                <router-link to="/">Close</router-link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
    name: 'maps',
    props: ['markersWithFilters', 'activeMarker'],
    data () {
        return {
            isActive: false,
            center: {
                lat: 45.50884,
                lng: -73.58781
            },
            marker: this.activeMarker,
            activeWindow: false,
        }
    },
    computed: {
        google: gmapApi,
        gmap() {
            return this.$refs.gmap.$mapPromise;
        },
    },
    methods: {
        show () {
            this.isActive = true;
            this.activeWindow = false;
        },
        hide () {
            this.isActive = false;
            this.marker = null;
        },
        getMarkerOpacity(markerId) {
            if (this.marker) {
                return this.marker.id == markerId ? 1 : 0.5;
            } else {
                return 1;
            }
        },
        setActiveMarker(marker) {
            this.center = marker.position;
            if (!this.marker) {
                this.activeWindow = true;
            }
            this.marker = marker;
            if (!this.activeWindow) {
                this.$router.push({ path: '/' + this.marker.name  });
            }
        },
        closeInfoWindow() {
            if (this.activeWindow) {
                this.activeWindow = false;
                this.activeMarker = null;
            }
        },
    },
    watch: {
        markersWithFilters() {
            this.marker = null;
            this.activeWindow = false;
            this.isActive = false;
        },
        activeMarker() {
            this.marker = this.activeMarker;
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
.maps {
    width: 100%;
    height: 950px;
}

.mapsWithModal {
    position: fixed;
    z-index: 1;
    width: 68vw;
    height: 950px;
}

.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modal-wrapper {
    padding-top: 8%;
    vertical-align: middle;
}

.modal-container {
    position: absolute;
    right: 0;
    height: 600px;
    width: 15vw;
    background-color: #F0F1F1;
    margin: 0px auto;
    margin-right: 5px;
    padding: 30px 30px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}
</style>
