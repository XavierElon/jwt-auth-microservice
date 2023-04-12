import * as mongoose from 'mongoose'
// import { ErrorMessage } from '../structures/types'
// import { validateEmail } from '../utils/verification.helper'

// const error = new ErrorMessage()

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unqiue: true
    // validate: {
    //   validator: validateEmail,
    //   message: error.email
    // }
  },
  password: {
    type: String,
    required: true,
  },
//   date: { type: Date, default: Date.now }
})

export const User = mongoose.model('User', userSchema)