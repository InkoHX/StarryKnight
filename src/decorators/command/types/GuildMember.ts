import { GuildMember } from 'discord.js'

import { ArgumentResolverFunction } from '.'
import MentionRegex from '../../../common/MentionRegex'

const toGuildMember: ArgumentResolverFunction = async (data, paramIndex, language, message): Promise<GuildMember> => {
  const id = MentionRegex.USERS_PATTERN.exec(String(data))?.groups?.id

  if (!id) throw new Error(language.error.resolver.guildMember(paramIndex))

  const member = await message.guild?.members.fetch(id)

  if (!member) throw new Error(language.error.resolver.guildMember(paramIndex))

  return member
}

export default toGuildMember
