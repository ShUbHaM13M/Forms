import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@post<UserClass>("save", function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<UserClass[]>(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === "find") {
    docs.forEach((doc) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "users",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ email: 1 })
class UserClass {
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const User = mongoose.models.UserClass || getModelForClass(UserClass);
export { User, UserClass };
