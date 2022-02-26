<template>
  <div>
    <!-- ナビゲーションバー -->
    <v-navigation-drawer
      app
      v-model="drawer"
      clipped
      color="light-blue lighten-5"
    >
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title primary--text">
              各種設定
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- タイトルとメニューの間に横線 -->
        <v-divider></v-divider>
        <v-list-item-content dense nav>
          <v-list-item-title>
            <button v-show="isLoggedIn" @click="signOut" class="ml-5">
              ログアウト
            </button>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-content dense nav>
          <v-list-item-title>
            <v-col class="ml-2">
              <a
                :href="'mailto:igahaya5@gmail.com?subject=boat-rentalの問い合わせ'"
                >管理者へ問い合わせ</a
              >
            </v-col>
          </v-list-item-title>
        </v-list-item-content>
        <!-- <v-list-item-content dense nav>
            <v-list-item-title>予約確認</v-list-item-title>
        </v-list-item-content> -->
      </v-container>
    </v-navigation-drawer>

    <!-- ヘッダー -->
    <v-app-bar clipped-left absolute app color="light-blue lighten-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">V-Pier</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="pa-2 ml-auto"
        ><router-link to="/register">ボート登録</router-link></v-btn
      >
      <v-btn v-show="!isLoggedIn" @click="push" class="pa-2 ml-auto"
        >ログイン</v-btn
      >
    </v-app-bar>
  </div>
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
    push() {
      this.$router.push("auth");
    },
    signOut() {
      const auth = getAuth();
      this.$store.dispatch("userLogout", auth);
    },
  },
};
</script>