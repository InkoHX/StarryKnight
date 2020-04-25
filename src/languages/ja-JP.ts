import { GuildMember, MessageEmbed, PermissionString } from 'discord.js'
import { DeepReadonly } from 'utility-types'

import { Client, Command, Language } from '..'
import { LanguageData, StatusCommandData } from '../structures'

const data: LanguageData = {
  command: {
    help: {
      description: 'このボットに実装されているすべてのコマンドを表示します。',
      noDescription: '説明無し',
      commandInfo: (commandName: string, usage: string, description: string): string => [
        `> **= ${commandName} =**`,
        `> **説明**: ${description}`,
        `> **使用法**: \`${usage}\``
      ].join('\n')
    },
    language: {
      description: '言語設定を変更します。',
      settingCompleted: (langCode: string): string => `言語を\`${langCode}\`に設定しました。`
    },
    prefix: {
      description: 'コマンドの接頭辞を設定します。',
      notOwner: 'このコマンドはサーバーの管理者のみが使用できます。',
      samePrefix: '既にその接頭辞が設定されています。',
      settingCompleted: (prefix: string): string => `接頭辞を\`${prefix}\`に設定しました。`
    },
    ping: {
      description: '応答速度を計測します。'
    },
    status: {
      description: 'ボットの情報を表示します。',
      statusContent: (data: DeepReadonly<StatusCommandData>): MessageEmbed => new MessageEmbed()
        .setColor('GREEN')
        .setTimestamp()
        .addField('ボット', [
          `**・サーバー数**: ${data.bot.guilds}`,
          `**・ユーザー数**: ${data.bot.users}`,
          `**・チャンネル数**: ${data.bot.channels}`,
          `**・ボットの稼働時間**: ${data.uptime.client}`
        ].join('\n'))
        .addField('システム', [
          `**・CPU モデル**: ${data.cpu.model}`,
          `**・CPU ロード**: ${data.cpu.loadavg.join('% | ')}%`,
          `**・メモリ**: ${data.memory.used}GB使用中 (${data.memory.total}GBまで使用可能)`,
          `**・ヒープメモリ**: ${data.memory.heap.used}MB使用中 (合計: ${data.memory.heap.total}MB)`,
          `**・システムの稼働時間**: ${data.uptime.host}`,
          `**・プロセスの稼働時間**: ${data.uptime.process}`
        ].join('\n'))
    },
    member: {
      description: 'サーバーに居るメンバーの詳細情報を送信します。',
      content: (member: GuildMember): MessageEmbed => new MessageEmbed()
        .setTimestamp()
        .setTitle(`${member.user.tag}の詳細`)
        .setThumbnail(member.user.displayAvatarURL())
        .setColor(member.displayColor)
        .addField('ユーザーID', member.id)
        .addField('ニックネーム', member.nickname ?? '設定されていません。')
        .addField('役職', member.roles.cache
          .filter(role => role.name !== '@everyone')
          .map(role => role.name)
          .join(', ') || '無し')
        .addField('権限', member.permissions
          .toArray()
          .join(', '))
        .addField('参加した日', member.joinedAt ?? '不明')
        .addField('このサーバーでNitro Boostを使用した日', member.premiumSince ?? 'ありません。')
    },
    server: {
      description: 'サーバーの詳細情報を送信します。',
      content: (data): MessageEmbed => {
        const channels = data.channels
        const members = data.members

        const embed = new MessageEmbed()
          .setColor('BLUE')
          .setTitle(data.name)
          .addField('サーバーID', data.id, true)
          .addField('オーナー', `${data.owner?.user?.tag ?? '不明'} (${data.owner?.id ?? '不明'})`, true)
          .addField('リージョン', data.region, true)
          .addField('BANされたユーザー', data.bans.size, true)
          .addField('ブーストレベル', data.boostLevel, true)
          .addField('ブーストカウント', data.boostCount, true)
          .addField('チャンネル', [
            `合計: ${channels.size}`,
            '',
            `テキスト: ${channels.filter(channel => channel.type === 'text').size}`,
            `ボイス: ${channels.filter(channel => channel.type === 'voice').size}`,
            `カテゴリ: ${channels.filter(channel => channel.type === 'category').size}`,
            `ニュース: ${channels.filter(channel => channel.type === 'news').size}`,
            `ストア: ${channels.filter(channel => channel.type === 'store').size}`
          ].join('\n'), true)
          .addField('メンバー', [
            `合計: ${members.size}`,
            '',
            `オンライン: ${members.filter(member => member.presence.status === 'online').size}`,
            `退席中: ${members.filter(member => member.presence.status === 'idle').size}`,
            `オフライン: ${members.filter(member => member.presence.status === 'offline').size}`
          ].join('\n'), true)
          .addField('役職', data.roles.map(role => role.name).join(', ') || '無し', true)
          .addField('カスタム絵文字', data.emojis.array().join(' ') || '無し', true)
          .setFooter('サーバー作成日')
          .setTimestamp(data.createdTimestamp)

        if (data.iconURL) embed.setThumbnail(data.iconURL)
        if (data.splashURL) embed.setImage(data.splashURL)

        return embed
      }
    }
  },
  error: {
    command: {
      errorEmbed: (command: Command, error: Error): MessageEmbed => {
        return new MessageEmbed()
          .setColor('RED')
          .setTitle(`${command.name}コマンドを実行中にエラーが発生しました。`)
          .addField('エラーネーム', error.name)
          .addField('エラーメッセージ', error.message)
          .setTimestamp()
      },
      missingArguments: (paramIndex): string => `第${paramIndex}引数が不足しています。`
    },
    resolver: {
      boolean: (paramIndex: number): string => `第${paramIndex}引数は"true"または"false"を指定する必要があります。`,
      number: (paramIndex: number): string => `第${paramIndex}引数は整数にする必要があります。`,
      language: (paramIndex: number, codes: string[]): string => [
        `第${paramIndex}引数には下記の文字列のどれかを入力する必要があります。`,
        '',
        '```ts',
        codes.join(', '),
        '```'
      ].join('\n'),
      command: (paramIndex: number, commands: string[]): string => [
        `第${paramIndex}引数には下記の文字列のどれかを入力する必要があります。`,
        '',
        '```ts',
        commands.join(', '),
        '```'
      ].join('\n'),
      guild: (paramIndex: number): string => `第${paramIndex}引数にはサーバーのIDを入力してください。`,
      user: (paramIndex: number): string => `第${paramIndex}引数にはユーザーのメンション、またはIDを入力して下さい。`,
      textChannel: (paramIndex: number): string => `第${paramIndex}引数にはテキストチャンネルのIDまたは、チャンネルのメンションを入力してください。`,
      dmChannel: (paramIndex: number): string => `第${paramIndex}引数にはDMチャンネルのIDを入力してください。`,
      guildMember: (paramIndex: number): string => `第${paramIndex}引数にはサーバーに居るメンバーのID、メンションを入力してください。` 
    }
  },
  inhibitor: {
    missingBotPermission: (permissions: PermissionString[]): string => [
      'このコマンドを実行するには下記の権限をボットに与えてください。',
      '',
      '```ts',
      permissions.join(', '),
      '```'
    ].join('\n'),
    missingUserPermission: (permissions: PermissionString[]): string => [
      'あなたがこのコマンドを実行するには下記の権限が必要です。',
      '',
      '```ts',
      permissions.join(', '),
      '```'
    ].join('\n'),
    channelFilter: {
      dm: 'このコマンドはDMチャンネルのみ使用可能です。',
      text: 'このコマンドはテキストチャンネルのみ使用可能です。'
    },
    nsfw: 'このコマンドはNSFWチャンネルのみ使用可能です。',
    ownerOnly: 'このコマンドはアプリケーションのオーナーのみが使用できます。'
  }
}

export default class extends Language {
  public constructor (client: Client) {
    super(client, {
      default: true,
      code: 'ja-JP',
      data
    })
  }
}
