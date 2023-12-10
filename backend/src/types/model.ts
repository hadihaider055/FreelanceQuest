import Message from '../models/Message'
import Job from '../models/Job'
import User from '../models/User'
import Chat from '../models/Chat'

export type Models = {
  Job: typeof Job
  User: typeof User
  Message: typeof Message
  Chat: typeof Chat
}
