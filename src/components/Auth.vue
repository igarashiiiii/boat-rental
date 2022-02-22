<template>
  <v-container id="auth" cols="12" sm="8" md="8" pa-10>
    <v-spacer pt-4></v-spacer>
    <div v-show="!state">
      <v-row align="center">
        <v-col>
          <v-card class="mx-auto justify-center" max-width="344" >
            <v-card-title class="light-blue lighten-2"> ログイン </v-card-title>
            <div class="pa-5">
              <v-text-field
                label="メールアドレス"
                hide-details="auto"
                type="text"
                v-model="email"
              >
              </v-text-field>
              <v-text-field
                label="パスワード"
                type="text"
                v-model="password"
              ></v-text-field>
              <v-row dense>
                <v-btn @click="signUp" color="light-blue lighten-4"> サインアップ </v-btn>
                <v-spacer ></v-spacer>
                <v-btn @click="signIn" color="light-blue lighten-4"> サインイン </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-show="state">
      ログイン完了しました
    </div>
  </v-container>
</template>
<script>
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

//Boat information
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signOut,
} from "firebase/auth";

export default {
  name: "Auth",
  data() {
    return {
      email: "igahaya5@gamil.com",
      password: "123456789",
      state: this.$store.getters.userState,
      boatId: "",
      everyBoatId: [],
    };
  },
  created() {
    //ログイン状態を確認
    const auth = getAuth();
    this.$store.dispatch("userConfirm", auth);
  },
  methods: {
    //signUp ユーザーID = boatId
    async signUp() {
      await this.makeId();
      const auth = getAuth();
      await this.$store.dispatch("userSignup", {
        authInfo: auth,
        emailInfo: this.email,
        passwordInfo: this.password,
      });
      //ボート情報の登録(boatId = userId)
      this.$store.dispatch("createBoatId", this.$store.getters.userId);
    },
    signIn() {
      const auth = getAuth();
      this.$store.dispatch("userSignin", {
        authInfo: auth,
        emailInfo: this.email,
        passwordInfo: this.password,
      });
      if(this.$store.getters.userState){
        this.state = true;
      }else{
        this.state = false;
      }
      
    },
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log(auth);
          this.state = false;
        })
        .catch((error) => {
          console.log("error" + error);
        });
    },
    //make random id for boatId
    makeId() {
      var tmpId = Math.floor(Math.random() * 10000);
      if (this.everyBoatId.includes(tmpId)) {
        this.makeId();
      } else {
        this.boatId = String(tmpId);
      }
    },
  },
};
</script>