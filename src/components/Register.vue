<template>
  <v-container id="Register" class="py-5">
    <h2>貸出すボートを登録</h2>
    <v-row>
      <v-col cols="12" xs="12" sm="6">
        <v-img :src="pictureUrl" alt="" id="myimg"></v-img>
        <v-col class="m-12">
          <v-file-input type="file" v-model="pictureFile"
            >画像を登録</v-file-input
          >
        </v-col>
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <v-simple-table>
          <tbody>
            <tr>
              <td>船名：</td>
              <td>
                <input type="text" @change="changeName" :value="updateName" />
              </td>
            </tr>
            <tr>
              <td>定員：</td>
              <td>
                <input
                  type="nummber"
                  @change="changeCapacity"
                  :value="updateBoatCapacity"
                />人
              </td>
            </tr>
            <tr>
              <td>全長：</td>
              <td>
                <input
                  type="text"
                  @change="changeLength"
                  :value="updateLength"
                />m
              </td>
            </tr>
            <tr>
              <td>全幅：</td>
              <td>
                <input
                  type="text"
                  @change="changeWidth"
                  :value="updateWidth"
                />m
              </td>
            </tr>

            <tr>
              <td>レンタル料金：</td>
              <td>
                <input
                  type="text"
                  @change="changeRentalFee"
                  :value="updateRentalFee"
                />円
              </td>
            </tr>

            <tr>
              <td>船長料金：</td>
              <td>
                <input
                  type="text"
                  @change="changeCaptainFee"
                  :value="updateCaptainFee"
                />円
              </td>
            </tr>
            <tr>
              <td>出港時刻：</td>
              <td>
                <input
                  type="time"
                  @change="changeDepartureTime"
                  :value="updateDepartureTime"
                />
              </td>
            </tr>
            <tr>
              <td>寄港時刻：</td>
              <td>
                <input
                  type="time"
                  @change="changeArrivalTime"
                  :value="updateArrivalTime"
                />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <tbody>
            <tr>
              <td class="py-5">
                <v-textarea
                  label="集合場所"
                  auto-grow
                  outlined
                  name="input-7-4"
                  @change="changePlace"
                  :value="updatePlace"
                />
              </td>
            </tr>

            <tr>
              <td>
                <v-textarea
                  label="追記事項"
                  auto-grow
                  outlined
                  name="input-7-4"
                  @change="changeCaution"
                  :value="updateCaution"
                />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row class="py-10" justify="center">
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
      updateName: "",
      updateBoatCapacity: "",
      updateLength: "",
      updateWidth: "",
      updateItems: [],
      updateCaptainFee: "",
      updateRentalFee: "",
      updateDepartureTime: "",
      updateArrivalTime: "",
      updatePlace: "",
      updateCaution: "",
      userId: "",
      pictureId: "",
      //picture
      pictureUrl: "",
      pictureFile: null,
    };
  },

  async created() {
    const docRef = doc(db, "boatInformation", this.$store.getters.boatId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //Get Picture
      await getDownloadURL(
        ref(storage, "pictures/" + String(this.$store.getters.boatId) + ".jpg")
      )
        .then((url) => {
          console.log("Register:created:画像を読み込みました:" + url);
          this.pictureUrl = url;
        })
        .catch((error) => {
          console.log("Register:created:画像が読み込めません:" + error);
        });

      //Get the boat Information
      this.tmpItems = [];
      this.tmpItems.push(docSnap.data());
      this.updateItems = [];
      this.updateItems.push(docSnap.data());
      this.updateName = this.updateItems[0].boatName;
      this.updateBoatCapacity = this.updateItems[0].capacity;
      this.updateLength = this.updateItems[0].boatLength;
      this.updateWidth = this.updateItems[0].width;
      this.updateCaptainFee = this.updateItems[0].captainFee;
      this.updateRentalFee = this.updateItems[0].rentalFee;
      this.updateDepartureTime = this.updateItems[0].departureTime;
      this.updateArrivalTime = this.updateItems[0].arrivalTime;
      this.updatePlace = this.updateItems[0].place;
      this.updateCaution = this.updateItems[0].caution;
      console.log("register:created:Boat情報を読み込みました");
    } else {
      this.exist = false;
      console.log("Register:created:Not exixt");
    }
  },

  methods: {
    //changed information
    changeName(e) {
      this.updateName = e.target.value;
    },
    changeCapacity(e) {
      this.updateBoatCapacity = e.target.value;
    },
    changeLength(e) {
      this.updateLength = e.target.value;
    },
    changeWidth(e) {
      this.updateWidth = e.target.value;
    },
    changeCaptainFee(e) {
      this.updateCaptainFee = e.target.value;
    },
    changeRentalFee(e) {
      this.updateRentalFee = e.target.value;
    },
    changeDepartureTime(e) {
      this.updateDepartureTime = e.target.value;
    },
    changeArrivalTime(e) {
      this.updateArrivalTime = e.target.value;
    },
    changePlace(e) {
      this.updatePlace = e.target.internalValue;
      console.log("changePlace:" + e.target.internalValue);
    },
    changeCaution(e) {
      this.updateCaution = e.target.value;
    },

    //when update or draft button is clicked
    async updateImage() {
      let imageUrl = "";
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
      await getDownloadURL(
        ref(storage, "pictures/" + String(this.$store.getters.boatId) + ".jpg")
      ).then((url) => {
        imageUrl = url;
      });
      return imageUrl;
    },

    //when update button is clicked
    async update() {
      if (this.pictureFile != null) {
        const newImageUrl = await this.updateImage();
        this.pictureUrl = newImageUrl;
      }
      try {
        await setDoc(
          doc(db, "boatInformation", String(this.$store.getters.boatId)),
          {
            boatName: this.updateName,
            capacity: this.updateBoatCapacity,
            boatLength: this.updateLength,
            width: this.updateWidth,
            captainFee: this.updateCaptainFee,
            rentalFee: this.updateRentalFee,
            departureTime: this.updateDepartureTime,
            arrivalTime: this.updateArrivalTime,
            place: this.updatePlace,
            caution: this.updateCaution,
            boatId: this.$store.getters.boatId,
            userId: this.$store.getters.userId,
            textStatus: true,
            pictureId: String(this.pictureUrl),
          }
        );
        console.log("register:情報更新成功");
      } catch (error) {
        console.log("register:情報更新失敗:" + error);
      }
    },

    //when draft button is clicked
    async draft() {
      //Picture Upload
      if (this.pictureFile != null) {
        const newImageUrl = await this.updateImage();
        this.pictureUrl = newImageUrl;
      }

      //preserve information as draft
      try {
        await setDoc(doc(db, "boatInformation", this.$store.getters.boatId), {
          boatName: this.updateName,
          capacity: this.updateBoatCapacity,
          boatLength: this.updateLength,
          width: this.updateWidth,
          captainFee: this.updateCaptainFee,
          rentalFee: this.updateRentalFee,
          departureTime: this.updateDepartureTime,
          arrivalTime: this.updateArrivalTime,
          place: this.updatePlace,
          caution: this.updateCaution,
          boatId: this.$store.getters.boatId,
          userId: this.$store.getters.userId,
          textStatus: false,
          pictureId: String(this.pictureUrl),
        });
        console.log("register:情報の下書き成功");
      } catch (error) {
        console.log("register:情報の下書き成功失敗:" + error);
      }
    },
  },
};
</script>