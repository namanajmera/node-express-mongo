const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require("./userModal");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour must have a Name."],
      unique: true,
      trim: true,
      maxlength: [40, "Name can't be more than 40 characters"],
      minlength: [10, "Name can't be less than 10 characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a maximum group size."],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a Difficulty level."],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Tour must have a Price."],
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Tour must have a Description."],
    },
    imageCover: {
      type: String,
      required: [true, "Tour must have a Cover Image."],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Mongoose MiddleWare
// Document Middleware: runs before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

/* // Runs after
tourSchema.post('save', function(doc,next) {
  console.log(doc);
  next();
}) */

// QUERY Middleware:
tourSchema.pre("find", function (next) {
  this.where({ ratingsAverage: { $ne: 4.7 } });
  next();
});

// AGGREGATION Middleware
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({
    $match: { _id: { $ne: "easy" } },
  });
  next();
});

// Embedded Users
// tourSchema.pre("save", async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
