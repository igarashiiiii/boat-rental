<template>
  <div>
    <v-card>
      <v-row>
        <v-col class="mx-auto m-12" max-width="374" sm="6">
          <h1>画像を表示</h1>
          <v-file-input
            type="file"
            @change="upload"
            v-model="pictureFile"
          ></v-file-input>
          <button @click="upload">アップロード</button>
          <!-- <v-img :src="pictureUrl" alt="" id="myimg" >
          </v-img> -->
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  // getDownloadURL,
  uploadBytes,
} from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyCysepqEQcNxwodpX5g03bbJIyCskAhc8c",
  authDomain: "boat-rental-dfd96.firebaseapp.com",
  projectId: "boat-rental-dfd96",
  storageBucket: "boat-rental-dfd96.appspot.com",
  messagingSenderId: "750963958567",
  appId: "1:750963958567:web:8465babc5ac3620df6ff02",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

export default {
  data() {
    return {
      pictureUrl: "",
      pictureFile: [],
    };
  },
  methods: {
    upload() {
      console.log(firebaseApp);
      const uploadStorage = ref(storage, "pictures");
      uploadBytes(uploadStorage, this.pictureFile)
        .then(() => {
          console.log("Uploaded a blob or file!");
        })
        .catch((error) => {
          console.log(error);
          console.log(this.pictureFile);
        });
    },
  },
  // created() {
  //   getDownloadURL(ref(storage, 'pictures/0.jpg'))
  // .then((url) => {
  //   // inserted into an <img> element
  //   console.log(url)
  //   this.pictureUrl = url
  // })
  // .catch((error) => {
  //   // Handle any errors
  //   console.log(error,firebaseApp)
  // });
  // },
};
</script>