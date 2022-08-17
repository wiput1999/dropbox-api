import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateProfileInput } from './entity/profile.entity'
import { PrismaService } from '@/db'

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(userId: string) {
    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .profile()
  }

  async createProfile(userId: string, input: CreateProfileInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (user.profileId) {
      throw new ForbiddenException('Profile already existed')
    }

    return this.prisma.profile.create({
      data: {
        ...input,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }
}
