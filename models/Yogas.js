const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const yogaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 10,
      maxlength: 50,
    },

    intensity: {
      type: String,
      enum: [Beginner, Intermediate, Advanced],
      required: true,
    },

    instructor: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    thumbnailImageURL: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          // Regular expression to match URLs ending with common image file extensions
          var regex = /\.(jpg|jpeg|gif|png|bmp)$/i;
          return regex.test(value);
        },
        message: "Please provide a valid image URL",
      },
    },

    videoEmbeddedURL: {
      type: Date,
      required: true,
      match: /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 50,
      maxlength: 500,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Yoga", yogaSchema);