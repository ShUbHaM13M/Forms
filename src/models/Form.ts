import mongoose from "mongoose";
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  answerType: { type: String },
  answerOptions: Schema.Types.Mixed,
  validations: Schema.Types.Mixed,
});

// TODO: A field for storing reference to responses on a form
const FormSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [QuestionSchema],
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

FormSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Form = mongoose.models.Form || mongoose.model("Form", FormSchema);

export { Form };
