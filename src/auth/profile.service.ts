import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateProfileInput } from '@/auth/models/profile.model'
import { PrismaService } from '@/db/prisma.service'

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

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
