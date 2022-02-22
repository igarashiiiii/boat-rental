<template>
  <div id="Detail">
    <!-- パソコン画面 -->
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
    <hr>
    <v-container>
      <v-row>
        <v-col sm="6">
          <v-img height="250" src="../assets/6.jpg" ></v-img>
        </v-col>
        <v-col sm="6">
          <div  v-for="i,index in items" :key="index">
            <div>船名:{{i.boatName}}</div>
            <div>料金：</div>
            <div>船長料金：</div>
            <div>定員：{{i.capacity}}人</div>
            <div>全長：{{i.length}}m</div>
            <div>全幅：{{i.width}}m</div>
          </div>
        </v-col>
      </v-row>
      <v-row class="py-12">
        <ul>
            <li>注意事項</li>
            <li>集合場所</li>
            <li>時間</li>
            <li>送迎の有無</li>
            <li>船長のHire Fee</li>
        </ul>
      </v-row>
    </v-container>
    <v-spacer></v-spacer>
    <v-container>
      <v-row class="mx-10 py-12">
          <v-btn class="mx-auto">
            申し込みをする→メール画面に遷移
          </v-btn>
        </v-row>
    </v-container>
  </div>
</template>

<script>


  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import {
        doc,
        getDoc
  } from "firebase/firestore";

// Your web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyCysepqEQcNxwodpX5g03bbJIyCskAhc8c",
  authDomain: "boat-rental-dfd96.firebaseapp.com",
  projectId: "boat-rental-dfd96",
  storageBucket: "boat-rental-dfd96.appspot.com",
  messagingSenderId: "750963958567",
  appId: "1:750963958567:web:8465babc5ac3620df6ff02"
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  const db = getFirestore();

export default {
  name: 'Detail',
  data(){
    return{
      items:[],
      id:this.$route.params.id,
      name:"",
      number:"",
      length:"",
      width:""
    };
  },
async created(){
    const docRef = doc(db,"boatInformation",this.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      this.exist = false;
      this.items = [];
      this.items.push(docSnap.data())
      this.name = this.items.boatName,
      this.number = this.items.capacity,
      this.length = this.items.length,
      this.width = this.items.width
    }else{
      this.exist = true;
      console.log("Not exixt")
    }

  }
}
</script>

<style>
</style>