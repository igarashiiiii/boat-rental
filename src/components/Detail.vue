<template>
  <div id="Detail">
    <v-container v-for="(i, index) in items" :key="index">
      <v-col>
        <v-card elevation="10">
          <v-card-title class="light-blue darken-4 white--text">{{
            i.boatName
          }}</v-card-title>
          <v-row>
            <v-col cols="12" xs="12" sm="6">
              <v-img max-height="350" :src="pictureUrl"></v-img>
            </v-col>
            <v-col cols="12" xs="12" sm="6">
              <v-simple-table class="mt-5">
                <tbody>
                  <tr>
                    <td>レンタル料金：</td>
                    <td>{{ i.rentalFee }}円/1日</td>
                  </tr>
                  <tr>
                    <td>船長料金：</td>
                    <td>{{ i.captainFee }}円/1日</td>
                  </tr>
                  <tr>
                    <td>全長：</td>
                    <td>{{ i.boatLength }}m</td>
                  </tr>
                  <tr>
                    <td>全幅：</td>
                    <td>{{ i.width }}m</td>
                  </tr>
                  <tr>
                    <td>出港時間:</td>
                    <td>{{ i.departureTime }}</td>
                  </tr>
                  <tr>
                    <td>寄港時間:</td>
                    <td>{{ i.arrivalTime }}</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card cols="12" xs="12" elevation="10">
          <p class="ml-4 pt-4">集合場所</p>
          <v-card-text>{{ i.place }}</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card cols="12" xs="12" elevation="10">
          <p class="ml-4 pt-4">追記事項</p>
          <v-card-text>{{ i.caution }}</v-card-text>
        </v-card>
      </v-col>
    </v-container>
    <v-spacer></v-spacer>
    <v-container>
      <v-row class="mx-10 py-12">
        <v-btn class="mx-auto" color="light-blue darken-4">
          <a :href="'mailto:' + userEmail" class="white--text"
            >メールで申し込みをする</a
          >
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { mapGetters } from "vuex";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCysepqEQcNxwodpX5g03bbJIyCskAhc8c",
  authDomain: "boat-rental-dfd96.firebaseapp.com",
  projectId: "boat-rental-dfd96",
  storageBucket: "boat-rental-dfd96.appspot.com",
  messagingSenderId: "750963958567",
  appId: "1:750963958567:web:8465babc5ac3620df6ff02",
};

//Picture
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export default {
  name: "Detail",
  computed: {
    ...mapGetters(["userEmail"]),
  },
  data() {
    return {
      items: [],
      id: this.$route.params.id,
      name: "",
      number: "",
      length: "",
      width: "",
      pictureUrl: "",
    };
  },
  async created() {
    const docRef = doc(db, "boatInformation", this.id);
    const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
       this.items = [];
       this.items.push(docSnap.data());
    } else {
      console.log("Not exixt");
    }

          //Get Picture
      await getDownloadURL(
        ref(storage, "pictures/" + this.items[0].userId + ".jpg")
      )
        .then((url) => {
          console.log("Register:created:画像を読み込みました:" + url);
          this.pictureUrl = url;
        })
        .catch((error) => {
          console.log("Register:created:画像が読み込めません:" + error);
          console.log("■■" + this.items[0].userId);
        });
  },
};
</script>

<style>
</style>