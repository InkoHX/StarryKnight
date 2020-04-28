import { Message, TextChannel } from 'discord.js'

import { Client, Event } from '..'

export default class extends Event {
  public constructor (client: Client) {
    super(client, {
      eventName: 'message',
      name: 'sendRule'
    })
  }

  public async run (message: Message): Promise<void> {
    if (message.author.bot) return
    if (message.system) return

    const guild = message.guild
    const member = message.member

    if (!guild?.available) return
    if (!member) return

    const guildSettings = await guild.getSettings()
    const ruleChannelId = guildSettings.ruleChannelId
    if (!guildSettings.ruleVerify || !ruleChannelId) return
    const memberSettings = await member.settings.getRuleSettings()

    if (memberSettings.ruleConsent) return
    const language = await message.getLanguageData()
    const channel = await this.client.channels.fetch(ruleChannelId)

    if (channel.type === 'text' && channel instanceof TextChannel) {
      const replyMessage = await message.reply(language.event.sendRule.content(channel))

      memberSettings.ruleConsent = true

      await memberSettings.save()
      await replyMessage.delete({ timeout: 30000 })
    }
  }
}
