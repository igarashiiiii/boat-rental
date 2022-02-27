<template>
  <v-container id="auth" class="py-12">
    <v-spacer pt-4></v-spacer>
    <div v-show="!isLoggedIn">
      <v-row>
        <v-col class="mx-auto">
          <v-card max-width="344" class="mx-auto">
            <v-card-title class="light-blue darken-4 white--text">
              ログイン
            </v-card-title>
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
              <p type="text">
                機能確認用のアドレス、PassWordを初期値で入力しております
              </p>
              <v-row dense>
                <v-btn outlined @click="signUp" color="light-blue darken-4">
                  サインアップ
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn outlined @click="signIn" color="light-blue darken-4">
                  サインイン
                </v-btn>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <div v-show="isLoggedIn" class="mx-auto">ログイン完了しました</div>
    </v-row>
    <!-- snackbar Signin Success-->
    <v-snackbar v-model="snackbarSigninSuccess" :timeout="timeout">
      {{ snackbarSigninSuccessText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbarSigninSuccess = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- snackbar Signin fault-->
    <v-snackbar v-model="snackbarSigninfault">
      {{ snackbarSigninfaultText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbarSigninfault = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- snackbar Signup Success-->
    <v-snackbar v-model="snackbarSignupSuccess" :timeout="timeout">
      {{ snackbarSignupSuccessText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbarSignupSuccess = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- snackbar Signup fault-->
    <v-snackbar v-model="snackbarSignupfault">
      {{ snackbarSignupfaultText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbarSignupfault = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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

//authentification
const auth = getAuth();
import { mapGetters } from "vuex";

import { getAuth, signOut } from "firebase/auth";

export default {
  name: "Auth",
  data() {
    return {
      email: "5@gamil.com",
      password: "123456789",
      state: "",
      boatId: "",
      everyBoatId: [],
      //snackbar
      timeout: 1500,
      snackbarSigninSuccess: false,
      snackbarSigninSuccessText: "SignIn completed",
      snackbarSigninfault: false,
      snackbarSigninfaultText: "SignIn rejected",
      snackbarSignupSuccess: false,
      snackbarSignupSuccessText: "SignUp completed",
      snackbarSignupfault: false,
      snackbarSignupfaultText: "SignUp rejected",
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  created() {
    //ログイン状態を確認
    this.$store.dispatch("userConfirm", auth);
    this.state = this.$store.getters.userState;
    console.log("Auth:created:" + this.state);
  },

  methods: {
    //signUp ユーザーID = boatId
    async signUp() {
      // await this.makeId();
      await this.$store.dispatch("userSignup", {
        authInfo: auth,
        emailInfo: this.email,
        passwordInfo: this.password,
      });
      //ボート情報の登録(boatId = userId)
      this.$store.dispatch("createBoatId", this.$store.getters.userId);
      this.state = this.$store.getters.userState;
      if (this.$store.getters.userState) {
        this.snackbarSignupSuccess = true;
      } else {
        this.snackbarSignupfault = true;
      }
    },
    //signIn
    signIn() {
      this.$store.dispatch("userSignin", {
        authInfo: auth,
        emailInfo: this.email,
        passwordInfo: this.password,
      });
      this.state = this.$store.getters.userState;
      if (this.state) {
        this.snackbarSigninSuccess = true;
      } else {
        this.snackbarSigninfault = true;
      }
    },
    //signOut
    signOut() {
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