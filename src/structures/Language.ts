import {
  Collection,
  ExplicitContentFilterLevel,
  GuildChannel,
  GuildEmoji,
  GuildFeatures,
  GuildMember,
  MessageEmbed,
  PermissionString,
  Role,
  User,
  VerificationLevel
} from 'discord.js'
import { DeepPartial, DeepReadonly } from 'utility-types'

import { Client, Command } from '..'
import Structure from './Structure'

interface PartialLanguageOptions {
  default?: false,
  code: string,
  data: DeepPartial<LanguageData>
}

interface RequiredLanguageOptions {
  default: true,
  code: string,
  data: LanguageData
}

export type LanguageOptions = PartialLanguageOptions | RequiredLanguageOptions

export class Language extends Structure {
  public readonly code: string

  public readonly data: DeepPartial<LanguageData>

  public readonly default: boolean

  public constructor (client: Client, options: LanguageOptions) {
    super(client)

    this.code = options.code

    this.data = options.data

    this.default = options.default ?? false
  }
}

export interface StatusCommandData {
  uptime: {
    process: string,
    client: string,
    host: string
  },
  cpu: {
    model: string,
    loadavg: string[]
  },
  memory: {
    total: string,
    used: string,
    heap: {
      used: string,
      total: string
    }
  },
  bot: {
    guilds: number,
    users: number,
    channels: number
  }
}

export interface ServerCommandData {
  roles: Collection<string, Role>,
  members: Collection<string, GuildMember>,
  emojis: Collection<string, GuildEmoji>,
  channels: Collection<string, GuildChannel>,
  bans: Collection<string, {
    user: User,
    reason: string
  }>,
  owner: GuildMember | null,
  name: string,
  id: string,
  region: string,
  createdTimestamp: number,
  boostCount: number,
  boostLevel: number,
  iconURL: string | null,
  splashURL: string | null,
  verificationLevel: VerificationLevel,
  feature: GuildFeatures[],
  explicitContentFilter: ExplicitContentFilterLevel
}

export interface BaseLanguageData {
  command: {
    help: {
      description: string,
      commandInfo: (commandName: string, usage: string, description: string) => string,
      noDescription: string
    },
    language: {
      description: string,
      settingCompleted: (langCode: string) => string
    },
    prefix: {
      description: string,
      samePrefix: string,
      notOwner: string,
      settingCompleted: (prefix: string) => string
    },
    ping: {
      description: string
    },
    status: {
      description: string,
      statusContent: (data: DeepReadonly<StatusCommandData>) => MessageEmbed
    },
    member: {
      description: string,
      content: (member: GuildMember) => MessageEmbed
    },
    server: {
      description: string,
      content: (data: ServerCommandData) => MessageEmbed
    }
  },
  error: {
    command: {
      errorEmbed: (command: Command, error: Error) => MessageEmbed,
      missingArguments: (paramIndex: number) => string
    },
    resolver: {
      boolean: (paramIndex: number) => string,
      number: (paramIndex: number) => string,
      language: (paramIndex: number, codes: string[]) => string,
      command: (paramIndex: number, commands: string[]) => string,
      guild: (paramIndex: number) => string,
      user: (paramIndex: number) => string,
      textChannel: (paramIndex: number) => string,
      dmChannel: (paramIndex: number) => string,
      guildMember: (paramIndex: number) => string
    }
  },
  inhibitor: {
    missingBotPermission: (permissions: PermissionString[]) => string,
    missingUserPermission: (permissions: PermissionString[]) => string,
    channelFilter: {
      dm: string,
      text: string
    },
    nsfw: string,
    ownerOnly: string
  }
}

export type LanguageData = DeepReadonly<BaseLanguageData>
