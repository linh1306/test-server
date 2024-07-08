import { match } from 'assert';
import mongoose, { Schema } from 'mongoose';

export interface IGroupChat {
  _id?: string;
  _admin?: string | null;
  _users: string[];
  name?: string | null;
  type_group?: 'many_people' | 'two_people';
  url_image?: string | null;
  is_private?: boolean,
  last_msg_time?: Date
}

const GroupChatSchema: Schema = new Schema({
  _admin: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: 'Users',
  },
  _users: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    validate: {
      validator: function (v:any) {
        return v.length >= 2
      },
      message: 'The _users array must have at least 2 elements'
    },
    required: [true, 'The _users array is required']
  },
  name: {
    type: String,
    default: null,
    match: /^[a-zA-Z0-9\s-]+$/,
    trim: true,
    maxLength: 30,
  },
  type_group: {
    type: String,
    required: true,
    enum: ['many_people', 'two_people'],
  },
  url_image: {
    type: String,
    default: null
  },
  is_private: {
    type: Boolean,
    default: true,
  },
  last_msg_time: {
    type: Date,
    default: new Date()
  }
});

const GroupChats = mongoose.models.GroupChats || mongoose.model<IGroupChat>('GroupChats', GroupChatSchema);

export default GroupChats;

