<template>
  <v-container id="Head">
       <!-- ヘッダー -->
    <v-app-bar clipped-left absolute app color="light-blue darken-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title >
        <router-link to="/" class="white--text">V-Pier</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="pa-2 ml-auto" outlined color="white" @click="register"
        >ボート登録</v-btn>
      <v-btn v-show="!isLoggedIn" @click="login" class="pa-2 ml-auto"
       outlined color="white" >ログイン</v-btn
      >
    </v-app-bar>
    <!-- ナビゲーションバー -->
    <v-navigation-drawer
      app
      v-model="drawer"
      clipped
      color="light-blue darken-4"
    >
      <v-container>
        <v-list-item>
          <v-list-item-content >
            <v-list-item-title class="title white--text" >
              各種設定
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- タイトルとメニューの間に横線 -->
        <v-divider></v-divider>
        <v-list-item-content dense nav>
          <v-list-item-title>
            <v-col class="ml-2">
              <a
                :href="'mailto:igahaya5@gmail.com?subject=boat-rentalの問い合わせ'" class="white--text"
                >管理者へ問い合わせ</a
              >
            </v-col>
          </v-list-item-title>
        </v-list-item-content>
        <v-divider></v-divider>
        <v-list-item-content v-show="isLoggedIn" dense nav>
          <v-list-item-title class="white--text">
            <button  @click="signOut" class="ml-5 pt-4" >
              ログアウト
            </button>
          </v-list-item-title>
        </v-list-item-content>
        <v-divider></v-divider>
        <!-- <v-list-item-content dense nav>
            <v-list-item-title>予約確認</v-list-item-title>
        </v-list-item-content> -->
      </v-container>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import { getAuth } from "firebase/auth";
import { mapGetters } from "vuex";

export default {
  name: "Head",
  data() {
    return {
      drawer: false,
      buttonShow: "",
    };
  },
  created() {
    if (this.$store.getters.userState) {
      this.buttonShow = true;
    } else {
      this.buttonShow = false;
    }
  },
  mounted() {
    if (this.$store.getters.userState) {
      this.buttonShow = true;
    } else {
      this.buttonShow = false;
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    login() {
      this.$router.push("auth");
    },
    signOut() {
      const auth = getAuth();
      this.$store.dispatch("userLogout", auth);
    },
    register(){
      this.$router.push("Register");
    }
  },
};
</script>