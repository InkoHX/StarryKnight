import { Message } from 'discord.js'

import { LanguageData } from '../../..'
import toBoolean from './Boolean'
import toCommand from './Command'
import toDMChannel from './DMChannel'
import toGuild from './Guild'
import toGuildMember from './GuildMember'
import toLanguage from './Language'
import toNumber from './Number'
import toString from './String'
import toTextChannel from './TextChannel'
import toUser from './User'

export type ArgumentResolverFunction = (data: unknown, paramIndex: number, language: LanguageData, message: Message) => unknown

export type ArgumentType = 'string' |
'number' |
'boolean' |
'language' |
'command' |
'guild' |
'user' |
'textChannel' |
'dmChannel' |
'guildMember'

const resolvers: Record<ArgumentType, ArgumentResolverFunction> = {
  string: toString,
  number: toNumber,
  boolean: toBoolean,
  language: toLanguage,
  command: toCommand,
  guild: toGuild,
  user: toUser,
  textChannel: toTextChannel,
  dmChannel: toDMChannel,
  guildMember: toGuildMember
}

export default resolvers
