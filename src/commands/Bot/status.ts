import { Message } from 'discord.js'
import os from 'os'
import ms from 'pretty-ms'

import { Client, Command } from '../..'

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'status', {
      description: (language) => language.command.status.description
    })
  }

  public async run (message: Message): Promise<Message> {
    const language = await message.getLanguageData()

    const cpuModel = os.cpus().shift()?.model ?? 'unknown'
    const heap = process.memoryUsage()
    const memoryTotal = os.totalmem() / 1024 / 1024 / 1024
    const memoryFree = os.freemem() / 1024 / 1024 / 1024
    const heapUsed = (heap.heapUsed / 1024 / 1024).toFixed(2)
    const heapTotal = (heap.heapTotal / 1024 / 1024).toFixed(2)

    const embed = language.command.status.statusContent({
      uptime: {
        process: ms(process.uptime() * 1000),
        host: ms(os.uptime() * 1000),
        client: ms(this.client.uptime ?? 0)
      },
      bot: {
        channels: this.client.channels.cache.size,
        guilds: this.client.guilds.cache.size,
        users: this.client.users.cache.size
      },
      cpu: {
        loadavg: this.getCpuLoadAverage(),
        model: cpuModel
      },
      memory: {
        used: (memoryTotal - memoryFree).toFixed(2),
        total: memoryTotal.toFixed(2),
        heap: {
          total: heapTotal,
          used: heapUsed
        }
      }
    })

    return message.channel.send(embed)
  }

  public getCpuLoadAverage (): Readonly<string[]> {
    return os.loadavg()
      .map(value => (Math.round(value * 10000) / 100).toFixed(2))
  }
}
