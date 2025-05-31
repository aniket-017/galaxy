const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: [String], // Array of strings since some descriptions are split into multiple paragraphs
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["industrial", "infrastructure", "specialAssignments", "multistoredBuildings"],
    },
    subcategory: {
      type: String,
      required: true,
      // Subcategories will be validated based on category
      validate: {
        validator: function (v) {
          const validSubcategories = {
            industrial: ["engineeringStructures", "foodAndPharma", "heavyEngineering", "logistics"],
            infrastructure: ["bridgesFlyoversAquaducts", "nuclearStructures", "massExcavationGeotechnical"],
            specialAssignments: ["customizedHousing", "interiorAndFitouts"],
            multistoredBuildings: ["commercialBuilding", "publicHeritageBuilding", "residentialBuilding"],
          };
          return validSubcategories[this.category].includes(v);
        },
        message: (props) => `${props.value} is not a valid subcategory for ${props.category}`,
      },
    },
    projectBrief: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    images: [
      {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return v.match(/^https?:\/\/.+/);
          },
          message: (props) => `${props.value} is not a valid URL`,
        },
      },
    ],
    hits: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
projectSchema.index({ category: 1, subcategory: 1 });
projectSchema.index({ title: "text", description: "text" });

// Virtual for category label
projectSchema.virtual("categoryLabel").get(function () {
  const categoryLabels = {
    industrial: "Industrial Buildings",
    infrastructure: "Infrastructure",
    specialAssignments: "Special Assignments",
    multistoredBuildings: "Multistored Buildings",
  };
  return categoryLabels[this.category];
});

// Virtual for subcategory label
projectSchema.virtual("subcategoryLabel").get(function () {
  const subcategoryLabels = {
    industrial: {
      engineeringStructures: "Engineering Structures",
      foodAndPharma: "Food & Pharma",
      heavyEngineering: "Heavy Engineering",
      logistics: "Logistics",
    },
    infrastructure: {
      bridgesFlyoversAquaducts: "Bridges, Flyovers and Aquaducts",
      nuclearStructures: "Nuclear Structures",
      massExcavationGeotechnical: "Mass Excavation & Geotechnical",
    },
    specialAssignments: {
      customizedHousing: "Customized Housing",
      interiorAndFitouts: "Interior and Fitouts",
    },
    multistoredBuildings: {
      commercialBuilding: "Commercial Building",
      publicHeritageBuilding: "Public Heritage Building",
      residentialBuilding: "Residential Building",
    },
  };
  return subcategoryLabels[this.category]?.[this.subcategory];
});

// Method to increment hits
projectSchema.methods.incrementHits = async function () {
  this.hits += 1;
  return this.save();
};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
