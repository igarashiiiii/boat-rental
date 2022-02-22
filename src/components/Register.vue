<template>
  <v-container id="Register" class="py-10">
    <h4>貸出すボートを登録する</h4>
    <v-simple-table>
      <tbody v-for="(i, index) in items" :key="index">
        <tr>
          <td>船名：</td>
          <td>
            <input type="text" v-model="name" v-name="i.boatName" />
          </td>
        </tr>
        <tr>
          <td>定員：</td>
          <td>
            <input
              type="nummber"
              v-model="boatCapacity"
              v-capacity="i.capacity"
            />
            人
          </td>
        </tr>
        <tr>
          <td>全長：</td>
          <td><input type="text" v-model="length" v-length="i.length" />m</td>
        </tr>
        <tr>
          <td>全幅：</td>
          <td><input type="text" v-model="width" v-width="i.width" />m</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-img :src="pictureUrl" alt="" id="myimg"></v-img>
    <v-col class="m-12" cols="12" sm="6">
      <v-file-input type="file" v-model="pictureFile"></v-file-input>
    </v-col>
    <v-row class="py-10">
      <v-btn @click="update">公開</v-btn>
      <v-btn @click="draft">下書きとして保存</v-btn>
    </v-row>
  </v-container>

  <!-- カレンダー -->
  <!-- 貸出可能時間を設定
    日にち選択
    時間
    繰り返し
    ToDo
      修正アイコン押すと登録情報を修正できるようになる。その際、既に登録した情報を初期値として表示する
      最低情報を入力したら登録
      抜けている項目があったら下書きとして保存。公開はしない -->
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
import { getFirestore } from "firebase/firestore";
import { setDoc, doc, getDoc } from "firebase/firestore";
const db = getFirestore();

//Picture
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
const storage = getStorage();

export default {
  name: "Register",
  data() {
    return {
      //boat Information
      exist: false,
      name: "",
      boatCapacity: "",
      length: "",
      width: "",
      boatId: "",
      items: [],
      userId: "",
      everyBoatId: [],
      pictureId: "",
      //picture
      pictureUrl: "",
      pictureFile: [],
    };
  },
  //if user has already registered your boat Infromation
  //show up the information
  //otherwise show up the fillin format
  //pictureId = boatId
  async created() {
    const docRef = doc(db, "boatInformation", this.$store.getters.boatId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //Get the boat Information
      this.items = [];
      this.items.push(docSnap.data());
      this.name = this.items.boatName;
      this.boatCapacity = this.items.capacity;
      this.length = this.items.length;
      this.width = this.items.width;
      console.log("register:created:Boat情報を読み込みました");
      console.log(docSnap.data());

      //Get Picture
      getDownloadURL(
        ref(storage, "pictures/" + String(this.$store.getters.boatId) + ".jpg")
      )
        .then((url) => {
          console.log("Register:created:画像を読み込みました:" + url);
          this.pictureUrl = url;
        })
        .catch((error) => {
          console.log("Register:created:画像が読み込めません:" + error);
        });
    } else {
      this.exist = false;
      console.log("Register:created:Not exixt");
    }
  },

  methods: {
    //when update button is clicked
    async update() {
      try {
        //Picture Upload
        const uploadStorage = ref(
          storage,
          "pictures/" + String(this.$store.getters.boatId) + ".jpg"
        );
        await uploadBytes(uploadStorage, this.pictureFile)
          .then(() => {
            console.log("register:画像のUpload成功");
            this.pictureUrl = uploadStorage;
          })
          .catch((error) => {
            console.log("register:画像のUpload失敗:" + error);
          });
        //update Information
        await setDoc(
          doc(db, "boatInformation", String(this.$store.getters.boatId)),
          {
            boatName: this.name,
            capacity: this.boatCapacity,
            length: this.length,
            width: this.width,
            boatId: this.$store.getters.boatId,
            userId: this.$store.getters.userId,
            textStatus: true,
            pictureId: this.pictureUrl,
          }
        );
        console.log("register:情報更新成功");
      } catch (error) {
        console.log("register:情報更新失敗:" + error);
        console.log(this.pictureUrl);
      }
    },
    //when draft button is clicked
    async draft() {
      //Picture Upload
      const uploadStorage = ref(
        storage,
        "pictures/" + String(this.$store.getters.boatId) + ".jpg"
      );
      await uploadBytes(uploadStorage, this.pictureFile)
        .then(() => {
          console.log("register:画像のUpload成功");
          this.pictureUrl = uploadStorage;
        })
        .catch((error) => {
          console.log("register:画像のUpload失敗:" + error);
        });
      //preserve information as draft
      try {
        await setDoc(doc(db, "boatInformation", this.$store.getters.boatId), {
          boatName: this.name,
          capacity: this.boatCapacity,
          length: this.length,
          width: this.width,
          boatId: this.$store.getters.boatId,
          userId: this.$store.getters.userId,
          textStatus: false,
          pictureId: this.pictureUrl,
        });
        console.log("register:情報の下書き成功");
      } catch (error) {
        console.log("register:情報の下書き成功失敗:" + error);
      }
    },
  },
};
</script>