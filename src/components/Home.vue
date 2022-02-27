<template id="home">
  <div>
    <v-container class="py-10">
      <v-layout>
        <v-flex>
          <v-row>
            <v-col>
                <v-row>
                  <div
                    v-for="(i, index) in items"
                    :key="index"
                    @click="push(i.boatId)"
                    class="mx-auto"
                  >
                    <v-card max-width="300" color="blue-grey lighten-5" class="my-2" elevation="24">
                      <v-img
                        :src="i.pictureId"
                        alt=""
                        id="myimg"
                        height="350"
                      ></v-img>
                      <!-- <v-img height="350" src="../assets/6.jpg"></v-img> -->
                      <v-card-title>船名:{{ i.boatName }}</v-card-title>
                      <!-- 口コミ評価 実装したい -->
                      <!--<v-row class="my-5">
                        <v-rating
                          :value="4.5"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                          ></v-rating>
                          <div class="grey--text my-5">
                            4.5 (413)
                          </div>
                        </v-row> -->

                      <v-card-text class="text--primary">
                        <div>料金：{{ i.rentalFee }}円/1日</div>
                        <div>船長料金：{{ i.captainFee }}円/1日</div>
                        <div>定員：{{ i.capacity }}人</div>
                        <div>全長：{{ i.boatLength }}m</div>
                        <div>全幅：{{ i.width }}m</div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-row>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
  
<script>
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCysepqEQcNxwodpX5g03bbJIyCskAhc8c",
  authDomain: "boat-rental-dfd96.firebaseapp.com",
  projectId: "boat-rental-dfd96",
  storageBucket: "boat-rental-dfd96.appspot.com",
  messagingSenderId: "750963958567",
  appId: "1:750963958567:web:8465babc5ac3620df6ff02",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default {
  name: "Home",
  data() {
    return {
      items: [],
      registeredItems: [],
    };
  },
  methods: {
    push(n) {
      this.$router.push("detail" + "/" + n);
    },
  },
  // show only registered information
  async created() {
    const q = await query(collection(db, "boatInformation"));
    onSnapshot(q, (i) => {
      this.items = [];
      i.forEach((i) => {
        if (i.data().textStatus) {
          this.items.push(i.data());
        }
      });
    });
  },
};
</script>
<style>
</style>