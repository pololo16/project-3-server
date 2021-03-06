import jwt from 'jsonwebtoken'

import UserModel from '../models/userModel.js'
import { secret } from '../config/environment.js'

export default function secureRoute(req, res, next) {

  // ? Check the token
  const rawToken = req.headers.authorization

  console.log(rawToken)

  if (!rawToken || !rawToken.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized1 ' })
  }

  const token = rawToken.replace('Bearer ', '')
  console.log(token)

  // ? Verify the token
  jwt.verify(token, secret, async (err, payload) => {

    if (err) {
      return res.status(401).json({ message: 'Unauthorized2 ' })
    }

    // ? Get the user using our payload.userId stick the user on the request
    const user = await  UserModel.findById(payload.sub)

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized3 ' })
    }

    req.currentUser = user

    next()
  })
}