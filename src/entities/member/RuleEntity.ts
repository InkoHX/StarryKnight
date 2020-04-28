/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { GuildMember } from 'discord.js'
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class RuleModel extends BaseEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  ruleConsent: boolean = false

  public constructor (member?: GuildMember) {
    super()

    if (member) {
      this.id = `${member.id}-${member.guild.id}`
    }
  }
}
