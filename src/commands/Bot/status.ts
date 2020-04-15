import { Message } from 'discord.js'
import os from 'os'

import { Client, Command } from '../..'

interface CpuUsage {
  free: number,
  total: number
}

export default class extends Command {
  public constructor (client: Client) {
    super(client, 'status', {
      description: (language) => language.command.status.description
    })
  }

  public async run (message: Message): Promise<Message> {
    const language = await message.getLanguageData()

    const cpuModel = os.cpus().shift()?.model ?? 'unknown'
    const cpuUsage = this.getCpuUsage()
    const heap = process.memoryUsage()
    const memoryTotal = os.totalmem() / 1024 / 1024 / 1024
    const memoryFree = os.freemem() / 1024 / 1024 / 1024
    const heapUsed = (heap.heapUsed / 1024 / 1024).toFixed(2)
    const heapTotal = (heap.heapTotal / 1024 / 1024).toFixed(2)

    const embed = language.command.status.statusContent({
      bot: {
        channels: this.client.channels.cache.size,
        guilds: this.client.guilds.cache.size,
        users: this.client.users.cache.size
      },
      cpu: {
        ...cpuUsage,
        model: cpuModel
      },
      memory: {
        free: (memoryTotal - memoryFree).toFixed(2),
        total: memoryTotal.toFixed(2),
        heap: {
          total: heapTotal,
          used: heapUsed
        }
      }
    })

    return message.channel.send(embed)
  }

  public getCpuUsage (): Readonly<CpuUsage> {
    const cpus = os.cpus()

    let free = 0
    let total = 0

    cpus
      .map(value => value.times)
      .forEach(value => {
        free += value.idle
        total += value.irq + value.nice + value.sys + value.user
      })
    
    return {
      free,
      total
    }
  }
}
