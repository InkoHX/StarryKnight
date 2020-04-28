import { Message, TextChannel } from 'discord.js'

import { Client, Command } from '../..'
import { Arguments, Optional, Required } from '../../decorators'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'rule', {
      filter: 'textOnly',
      requiredUserPermissions: ['MANAGE_GUILD'],
      description: language => language.command.rule.description
    })
  }

  @Arguments
  public async run (message: Message, @Required('boolean') mode: boolean, @Optional('textChannel') ruleChannel?: TextChannel): Promise<Message> {
    return mode ? this.enableRule(message, ruleChannel) : this.disableRule(message)
  }

  public async enableRule (message: Message, ruleChannel?: TextChannel): Promise<Message> {
    const language = (await message.getLanguageData()).command.rule.enable
    if (!ruleChannel) return message.reply(language.missingTextChannel)

    const guild = message.guild

    if (!guild) throw new Error('This command is guild only.')
    
    const settings = await guild.getSettings()

    if (settings.ruleVerify) return message.reply(language.enabled)

    settings.ruleVerify = true
    settings.ruleChannelId = ruleChannel.id

    await settings.save()

    return message.reply(language.enabled)
  }

  public async disableRule (message: Message): Promise<Message> {
    const guild = message.guild
    if (!guild) throw new Error('This command is guild only.')
    const settings = await guild.getSettings()
    const language = (await message.getLanguageData()).command.rule.disable

    if (!settings.ruleVerify) return message.reply(language.already)

    settings.ruleVerify = false
    delete settings.ruleChannelId

    await settings.save()

    await guild.members.fetch()
      .then(members => Promise.all(members.map(member => member.settings.getRuleSettings())))
      .then(settings => Promise.all(settings.map(setting => setting.remove())))

    return message.reply(language.disabled)
  }
}
