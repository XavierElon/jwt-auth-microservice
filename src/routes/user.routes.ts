import express, { Request, Response, Router } from 'express'

export const userRouter: Router = express.Router()

// Create a User
userRouter.post('/signup', async (req: Request, res: Response) => {
    return res.json('signup')
})

// // Update a user by ID
// updateRouter.put('/update/:id', async (req: Request, res: Response) => {
//   try {
//     const id = req.params.id
//     const update = req.body
//     // Find the user by ID and update its properties
//     const updatedUser = updateUser(id, update)
//     if (!updatedUser) {
//       return res.status(404).send({ error: 'User not found' })
//     } else {
//       return res.status(200).send({ updatedUser, message: 'User updated' })
//     }
//   } catch (error) {
//     console.error(`Error updating user: ${error}`)
//     return res.status(500).send({ error: 'Server error' })
//   }
// })

/*Verify user credentials against the database and login*/
userRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body

  return res.json('login')
})

// // Delete user by email endpoint
// deleteRouter.delete('/delete/:email', async (req, res) => {
//   const email = req.params.email
//   try {
//     const deletedUser = await deleteUser(email)
//     if (!deletedUser) {
//       return res.status(404).send(`User with email ${email} not found`)
//     }
//     return res.send(`Deleted user: ${deletedUser}`)
//   } catch (err) {
//     console.error(`Error deleting user with email ${email}:`, err)
//     return res.status(500).send('Error deleting user')
//   }
// })

// //Confirm the user has created an account
// validationRouter.get('/validate-account-creation/:userID', async (req, res) => {
//   try {
//     const { confirmed, token } = req.query
//     if (confirmed === 'true' && typeof token === 'string') {
//       res.send('Your account has been successfully created and confirmed.')
//       await confirmUser(token)
//     } else {
//       res.send('Your account has been created. Please check your email to confirm your account.')
//     }
//   } catch (error) {
//     console.error(error)
//     res.status(500).send('An error occurred while validating your account creation.')
//   }
// })
