/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Guild } from 'discord.js'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class GuildSettings extends BaseEntity {
  @PrimaryColumn()
  public id!: string

  @Column({ nullable: true })
  public prefix?: string

  @Column({ nullable: true })
  public ruleChannelId?: string

  @Column({ nullable: true })
  public ruleVerify: boolean = false

  public constructor (guild?: Guild) {
    super()

    if (guild) {
      this.id = guild.id
    }
  }
}
