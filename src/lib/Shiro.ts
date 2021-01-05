// This is still very bad, im not sure how this should be done.

import fetch from 'node-fetch';

const mainURL = 'https://shiro.gg/api/'

enum SFWImageType {
  avatars = 'avatar',
  blush = 'blush',
  hug = 'hug',
  kiss = 'kiss',
  neko = 'neko',
  nom = 'nom',
  pat = 'pat',
  pout = 'pout',
  slap = 'slap',
  smug = 'smug',
  wallpapers = 'wallpapers',
}

enum NSFWImageType {
  bondage = 'bondage',
  hentai = 'hentai',
  thighs = 'thighs'
}

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
    if (!SFWImageType[endpoint]) throw new Error('SFW endpoint ' + endpoint + 'does not exist')
    return true;
  }

  private static validateNSFWEndpoints(endpoint: ValidEndpoints): boolean {
    if (!NSFWImageType[endpoint]) throw new Error('NSFW endpoint ' + endpoint + 'does not exist')
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
