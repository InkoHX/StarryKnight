import { ImageURLOptions, Structures } from 'discord.js'

import { GuildSettings } from '..'

declare module 'discord.js' {
  interface Guild {
    getSettings(): Promise<GuildSettings>,
    iconURL(options?: ImageURLOptions): string | null
  }
}

export default Structures.extend('Guild', BaseClass => {
  return class extends BaseClass {
    public async getSettings (): Promise<GuildSettings> {
      if (!this.available || typeof this.id !== 'string') throw new Error('Guild id is unknown.')

      const settings = await GuildSettings.findOne({ id: this.id })

      if (!settings) return new GuildSettings(this)

      return settings
    }

    public iconURL (options?: ImageURLOptions): string | null {
      return super.iconURL(Object.assign(options ?? { format: 'png' }, { dynamic: true }) as ImageURLOptions)
    }

    public splashURL (options?: ImageURLOptions): string | null {
      return super.splashURL(Object.assign(options ?? { format: 'png' }, { dynamic: true }) as ImageURLOptions)
    }
  }
})
