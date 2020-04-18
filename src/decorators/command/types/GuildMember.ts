import { GuildMember } from 'discord.js'

import { ArgumentResolverFunction } from '.'

const idRegex = /<@!?(?<id>\d{17,19})>/gu

const toGuildMember: ArgumentResolverFunction = async (data, paramIndex, language, message): Promise<GuildMember> => {
  const id = idRegex.exec(String(data))?.groups?.id

  if (!id) throw new Error(language.error.resolver.guildMember(paramIndex))

  const member = await message.guild?.members.fetch(id)

  if (!member) throw new Error(language.error.resolver.guildMember(paramIndex))

  return member
}

export default toGuildMember
