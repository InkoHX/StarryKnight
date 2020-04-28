import { Guild, GuildMember, Structures } from 'discord.js'

import { MemberSettings } from '..'
import { Client } from '../Client'
import { RuleModel } from '../entities'

declare module 'discord.js' {
  interface GuildMember {
    readonly settings: GuildMemberSettings,
    getSettings(): Promise<MemberSettings>
  }
}

export default Structures.extend('GuildMember', BaseClass => {
  return class extends BaseClass {
    public readonly settings: GuildMemberSettings

    public constructor (client: Client, data: object, guild: Guild) {
      super(client, data, guild)

      this.settings = new GuildMemberSettings(this)
    }

    public async getSettings (): Promise<MemberSettings> {
      if (typeof this.id !== 'string') throw new Error('Member id is unknown.')

      const settings = await MemberSettings.findOne({ id: this.id })

      if (!settings) return new MemberSettings(this)
      
      return settings
    }
  }
})

export class GuildMemberSettings {
  private readonly member: GuildMember

  public constructor (member: GuildMember) {
    this.member = member
  }

  public async getRuleSettings (): Promise<RuleModel> {
    if (typeof this.member.id !== 'string') throw new Error('Member id is unknown.')
    if (typeof this.member.guild.id !== 'string') throw new Error('Guild id is unknown.')

    const id = `${this.member.id}-${this.member.guild.id}`

    const settings = await RuleModel.findOne({ id })

    if (!settings) return new RuleModel(this.member)

    return settings
  }
}
