import { ImageURLOptions, Structures } from 'discord.js'

import { UserSettings } from '..'

declare module 'discord.js' {
  interface User {
    getSettings(): Promise<UserSettings>,
    avatarURL(options?: ImageURLOptions): string | null,
    displayAvatarURL(options?: ImageURLOptions): string
  }
}

export default Structures.extend('User', BaseClass => {
  return class extends BaseClass {
    public async getSettings (): Promise<UserSettings> {
      if (typeof this.id !== 'string') throw new Error('User id is unknown.')

      const settings = await UserSettings.findOne({ id: this.id })

      if (!settings) return new UserSettings(this)
      
      return settings
    }

    public avatarURL (options?: ImageURLOptions): string | null {
      return super.avatarURL(Object.assign(options ?? { format: 'png' }, { dynamic: true }) as ImageURLOptions)
    }

    public displayAvatarURL (options?: ImageURLOptions): string {
      return super.displayAvatarURL(Object.assign(options ?? { format: 'png' }, { dynamic: true }) as ImageURLOptions)
    }
  }
})
