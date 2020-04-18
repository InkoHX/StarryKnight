import { GuildMember } from 'discord.js'

import { ArgumentResolverFunction } from '.'

const idRegex = /<@!?(?<id>\d{17,19})>/gu

const toGuildMember: ArgumentResolverFunction = (data, paramIndex, language, message): GuildMember => {
  const id = idRegex.exec(String(data))?.groups?.id

  if (!id) throw new Error(language.error.resolver.guildMember(paramIndex))

  const member = message.guild?.member(id)

  if (!member) throw new Error(language.error.resolver.guildMember(paramIndex))

  return member
}

export default toGuildMember
