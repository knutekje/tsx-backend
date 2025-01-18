import bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { UserRepository } from '../repository/userRepository';
import { BroadcasterResult } from 'typeorm/subscriber/BroadcasterResult';

export class UserService {
    static async register(username: string, email: string, password: string): Promise<User> {
        console.log('Checking if username or email exists...');
        const existingUser = await UserRepository.findOneBy({ username });
        const existingEmail = await UserRepository.findOneBy({ email });
      
        console.log('Existing user:', existingUser);
        console.log('Existing email:', existingEmail);
      
        if (existingUser) {
          throw new Error('Username already exists');
        }
        if (existingEmail) {
          throw new Error('Email already exists');
        }
      
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed:', hashedPassword);


      
        console.log('Creating new user...');
        const newUser = UserRepository.create({ username, email, password: hashedPassword });
        return UserRepository.save(newUser);
      }
      

  static async login(username: string, password: string): Promise<User | null> {

    console.log(`trying username ${username}`)
    console.log(`trying password ${password}`)

    const user = await UserRepository.findOneBy({ username });
    if (!user) {
      return null;
    }


    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log(`${isMatch} hash no match`)
      return null;
    }

    return user;
  }
}
