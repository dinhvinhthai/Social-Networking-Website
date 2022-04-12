const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    MSSV: {
      type: String,
      lowercase: true,
    },
    profilePicture: {
      type: String,
    },
    coverPictrue: {
      type: String,
    },
    pictures: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
      ref: "usersModal",
    },
    friendsRequest: {
      type: Array,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    address: {
      city: { type: String, lowercase: true },
      distrist: { type: String, lowercase: true },
    },
    sex: {
      type: Boolean,
    },
    dateOfBirth: {
      type: Date,
    },
    about: {
      type: String,
      default: "",
      lowercase: true,
    },
    major: {
      class: { type: String, lowercase: true },
      majorName: { type: String, lowercase: true },
      yearKey: { type: Number, lowercase: true },
    },
    saveEvents: {
      type: Array,
    },
    saveDocs: {
      type: Array,
    },
    savePosts: {
      type: Array,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    idAdminBlock: {
      type: Boolean,
      default: false,
    },
    blockDuration: {
      type: Number,
    },
    photos: {
      avatar: [],
      background: [],
      images: [],
    },
    notifications: [
      {
        type: new mongoose.Schema(
          {
            userId: { type: String, ref: "usersModal" },
            message: "",
            post: { type: String },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("usersModal", userSchema);
