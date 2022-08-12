import { PrismaService } from '@/db/prisma.service'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { FirebaseAuthDecodedUser } from './firebase-auth.strategy'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findByFirebaseUid(firebaseUid: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        firebaseUid,
      },
    })
  }

  createFromFirebase(firebaseUser: FirebaseAuthDecodedUser): Promise<User> {
    return this.prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
      },
    })
  }
}
