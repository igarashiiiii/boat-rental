import Vue from 'vue'
import Vuex from 'vuex'
import {
    // getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // confirm login status
    onAuthStateChanged,
    //logout
    signOut,
} from "firebase/auth";

//Boat information
import { getFirestore } from "firebase/firestore";
import { setDoc, doc } from "firebase/firestore";
const db = getFirestore();

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userState: false,
        userEmail: "igahaya5@gamil.com",
        userPassword: "123456789",
        userId: null,
        //userId = boatId
        boatId: ""
    },
    getters: {
        userState: state => state.userState,
        userEmail: state => state.userEmail,
        userPassword: state => state.userPassword,
        userId: state => state.userId,
        boatId: state => state.boatId,
        isLoggedIn: state => state.userId !== null,
    },
    mutations: {
        uploadMessage(state, newMessage) {
            state.message = newMessage
        },
        //サインアップ
        userSignup(state, createdUserId) {
            state.userId = createdUserId
            state.userState = true
        },
        //サインイン
        userSignin(state, userId) {
            state.userId = userId
            state.userState = true
        },
        //ログイン状態を監視
        userConfirm(state, { judge, id }) {
            state.userState = judge
            state.userId = id
        },
        userId(state, id) {
            state.userId = id
        },
        //ボートIDの作成,読み込み
        createBoatId(state, id) {
            state.boatId = id
        }


    },
    actions: {
        // サインアップ
        async userSignup({ commit }, { authInfo, emailInfo, passwordInfo }) {
            await createUserWithEmailAndPassword(authInfo, emailInfo, passwordInfo)
                .then((userCredential) => {
                  commit("userSignup", userCredential.user.uid)
                  console.log("vuex:Signup:" + userCredential.user.uid);
                  console.log("vuex signUp：UserIdの登録に成功しました");
                })
                .catch((error) => {
                    console.log(error);
                    console.log("vuex signUp:サインアップ失敗");
                    console.log("vuex signUp:UserIdの登録に失敗しました");
                });
        },
        //サインイン
        userSignin({ commit }, { authInfo, emailInfo, passwordInfo }) {
            signInWithEmailAndPassword(authInfo, emailInfo, passwordInfo)
                .then((userCredential) => {
                  const user = userCredential.user;
                  commit("userSignin", userCredential.user.uid)
                  //ボート情報を読み込むためにID付与(boatId = userId)
                  commit("createBoatId", userCredential.user.uid)
                  console.log("vuex:userSignin:サインイン成功");
                  console.log("vuex:userSignin:userId,boatId:" + user.uid);
                })
                .catch((error) => {
                  console.log("vuex:userSignin:サインイン失敗:" + error);

                });
        },
        //ログイン状態を確認
        async userConfirm({ commit }, auth) {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    //userIdの有無でログインしているか確認する
                    commit("userId", user.uid);
                    //ボート情報を読み込むためにID付与(boatId = userId)
                    commit("createBoatId", user.uid)
                    console.log("vuex:userConfirm:ログイン中"),
                    console.log("vuex:userConfirm:ユーザーID:" + user.uid),
                    console.log("vuex:ログインstate:" + this.state.userId)
                } else {
                    //userIdをnullにする
                    commit("userId", null);
                    console.log("vuex:userConfirm:ログアウトしました")
                    console.log("vuex:ログインstate:" + this.state.userId)
                }
            });
        },
        //ログアウト
        userLogout({ commit }, auth) {
          signOut(auth).then(() => {
              //userIdをnullにする
              commit("userId", null);
              console.log("vuex:userLogout:ログアウト成功");
            }).catch((error) => {
                console.log("vuex:userLogout:ログアウト失敗" + error);
            });
        },

        //ボート情報の作成
        //boatId = userId
        async createBoatId({ commit }, id) {
            try {
                await setDoc(doc(db, "boatInformation", id), {
                    boatName: "",
                    capacity: "",
                    boatLength: "",
                    width: "",
                    userId: this.state.userId,
                    textStatus: false,
                    captainFee: "",
                    time: "",
                    place: "",
                    caution: "",
                    explain:"",
                    boatId: id,
                    pictureId: "https://firebasestorage.googleapis.com/v0/b/boat-rental-dfd96.appspot.com/o/pictures%2FsuLVgL4RFzYEVYg0Re6kfsxpiz83.jpg?alt=media&token=0aa423d6-4ae2-4c38-81d1-bbc42485c969"
                });
                console.log("vuex:createBoatId:boatId作成:" + id);
                commit("createBoatId", id)
            } catch (error) {
                console.log("vuex:createBoatId:boatIdの作成に失敗:" + error)
            }
        }
    }
})