// This is still very bad, im not sure how this should be done.

import fetch from 'node-fetch';

const mainURL = 'https://shiro.gg/api/'

const SFWImages = {
  avatars: 'avatar',
  blush: 'blush',
  hug: 'hug',
  cry: 'cry',
  kiss: 'kiss',
  neko: 'neko',
  nom: 'nom',
  pat: 'pat',
  poke: 'poke',
  pout: 'pout',
  slap: 'slap',
  smug: 'smug',
  tickle: 'tickle',
  wallpapers: 'wallpapers',
}

const NSFWImages = {
  bondage: 'bondage',
  hentai: 'hentai',
  thighs: 'thighs'
}

type SFWImageType = 'avatar' | 'blush' | 'hug' | 'cry' | 'kiss' | 'neko' | 'nom' | 'pat' | 'poke' | 'pout' | 'slap' | 'smug' | 'tickle' | 'wallpapers'
type NSFWImageType = 'bondage' | 'hentai' | 'thighs'
type ValidEndpoints = SFWImageType | NSFWImageType

interface response {
  code: 200 | 204 | 404 | 403 | 429;
  url?: string;
  message?: string;
}

class Shiro {
  constructor() { }

  static async sfw(type: SFWImageType, options: object): Promise<response | response[]> {
    this.validateSFWEndpoint(type)
    return await this.request('images/' + type + this.parseOptions(options)) as response
  }

  static async nsfw(type: NSFWImageType, options: object): Promise<response | response[]> {
    this.validateNSFWEndpoints(type)
    return await this.request('images/nsfw/' + type + this.parseOptions(options))
  }

  private static validateSFWEndpoint(endpoint: ValidEndpoints): boolean {
    if (!SFWImages[endpoint]) throw new Error('SFW endpoint ' + endpoint + ' does not exist')
    return true;
  }

  private static validateNSFWEndpoints(endpoint: ValidEndpoints): boolean {
    if (!NSFWImages[endpoint]) throw new Error('NSFW endpoint ' + endpoint + ' does not exist')
    return true;
  }

  private static parseOptions(options: object): string {
    if (!options || typeof (options) !== 'object') return '';
    let str = '';
    for (const [key, value] of Object.entries(options)) {
      if (!str) str += `?${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      str += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    }
    return str;
  }

  private static async request(endpoint: string): Promise<any> {
    return await fetch(mainURL + endpoint).then(req => req.json())
  }
}

export default Shiro;
