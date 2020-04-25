import { Message } from 'discord.js'

import { Client, Command } from '../..'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'server', {
      filter: 'textOnly',
      description: language => language.command.server.description
    })
  }

  public async run (message: Message): Promise<Message> {
    const guild = message.guild

    if (!guild) throw new Error('This command is guild only.')

    const embed = (await message.getLanguageData()).command.server.content

    return message.channel.send(embed({
      bans: await guild.fetchBans(),
      channels: guild.channels.cache,
      emojis: guild.emojis.cache,
      members: await guild.members.fetch(),
      roles: (await guild.roles.fetch()).cache.filter(role => role.name !== '@everyone'),
      owner: guild.owner,
      region: guild.region.charAt(0).toUpperCase() + guild.region.slice(1),
      createdTimestamp: guild.createdTimestamp,
      name: guild.name,
      boostCount: guild.premiumSubscriptionCount ?? 0,
      boostLevel: guild.premiumTier,
      id: guild.id,
      iconURL: guild.iconURL(),
      splashURL: guild.splashURL({ format: 'png', size: 2048 }),
      verificationLevel: guild.verificationLevel,
      feature: guild.features,
      explicitContentFilter: guild.explicitContentFilter
    }))
  }
}
