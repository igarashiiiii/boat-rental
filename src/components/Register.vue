<template>
  <v-container id="Register" class="py-5">
    <h2>貸出すボートを登録</h2>
    <v-row>
      <v-col cols="12" xs="12" sm="6">
        <v-img :src="pictureUrl" alt="" id="myimg" max-height="350"></v-img>
        <v-col class="m-12">
          <v-file-input type="file" v-model="pictureFile"
            >画像を登録</v-file-input
          >
        </v-col>
      </v-col>
      <v-col cols="12" xs="12" sm="6">
        <v-text-field
          cols="12"
          xs="12"
          label="船名"
          v-model="updateName"
          :value="updateName"
        ></v-text-field>
        <v-text-field
          cols="12"
          xs="12"
          label="定員"
          v-model="updateBoatCapacity"
          :value="updateBoatCapacity"
          >人
        </v-text-field>
        <v-text-field
          cols="12"
          xs="12"
          label="全長"
          v-model="updateLength"
          :value="updateLength"
          >m
        </v-text-field>
        <v-text-field
          cols="12"
          xs="12"
          label="全幅"
          v-model="updateWidth"
          :value="updateWidth"
          >m
        </v-text-field>
        <v-text-field
          cols="12"
          xs="12"
          label="レンタル料金"
          v-model="updateRentalFee"
          :value="updateRentalFee"
          >円
        </v-text-field>
        <v-text-field
          cols="12"
          xs="12"
          label="船長料金"
          v-model="updateCaptainFee"
          :value="updateCaptainFee"
          >円
        </v-text-field>

        <v-row>
          <v-col cols="12" xs="6">
            <v-text-field
              label="出航時刻"
              v-model="updateDepartureTime"
              :value="updateDepartureTime"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" xs="6">
            <v-text-field
              label="寄港時刻"
              v-model="updateArrivalTime"
              :value="updateArrivalTime"
            >
            </v-text-field>

            <!-- <v-row>
                  <v-col cols="12" sx="6">
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="updateDepartureTime"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="updateDepartureTime"
                          label="出航時刻"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="updateDepartureTime"
                        full-width
                        @click:minute="$refs.menu.save(updateDepartureTime)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sx="6">
                    <v-menu
                      ref="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="updateArrivalTime"
                      transition="scale-transition"
                      offset-y
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="updateArrivalTime"
                          label="寄港時刻"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="updateArrivalTime"
                        full-width
                        @click:minute="$refs.menu.save(updateArrivalTime)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12">
        <p>
          <v-textarea
            label="集合場所"
            outlined
            name="input-7-4"
            v-model="updatePlace"
            :value="updatePlace"
          />
        </p>
      </v-col>
      <v-col cols="12" xs="12">
        <p>
          <v-textarea
            label="追記事項"
            outlined
            name="input-7-4"
            v-model="updateCaution"
            :value="updateCaution"
          />
        </p>
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

    updateSuccessAlert() {
      this.successAlert = true;
    },
    updateFaultAlert() {},
  },
};
</script>