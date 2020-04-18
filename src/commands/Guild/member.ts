import { GuildMember, Message } from 'discord.js'

import { Client, Command } from '../..'
import { Arguments, Required } from '../../decorators'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'member', {
      description: language => language.command.member.description
    })
  }

  @Arguments
  public async run (message: Message, @Required('guildMember') member: GuildMember): Promise<Message> {
    const language = (await message.getLanguageData()).command.member

    return message.channel.send(language.content(member))
  }
}
