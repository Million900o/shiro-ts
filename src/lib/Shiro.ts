import fetch from 'node-fetch';

const mainUrl = 'https://shiro.gg/api/'

type SFWImageType = 'avatars' | 'blush' | 'hug' | 'kiss' | 'neko' | 'nom' | 'pat' | 'pout' | 'slap' | 'smug' | 'wallpapers'
type NSFWImageType = 'bondage' | 'hentai' | 'thighs'

interface response {
  status: 200 | 204 | 404 | 403 | 429;
  url?: string;
  message?: string;
}

class Shiro {
  constructor() { }

  static async sfw(type: SFWImageType, amount: number): Promise<response | response[]> {
    const promises = [];
    if (!amount || amount === 1) {
      return await fetch(mainUrl + 'images/' + type).then(e => e.json())
    } else if (amount < 11) {
      for (let i = 0; i < amount; i++) {
        promises.push(fetch(mainUrl + 'images/' + type).then(e => e.json()))
      }
      return await Promise.all(promises);
    } else throw new Error('amount exceded maximum (10)')
  }

  static async nsfw(type: NSFWImageType, amount: number): Promise<response | response[]> {
    const promises = [];
    if (!amount || amount === 1) {
      return await fetch(mainUrl + 'images/nsfw/' + type).then(e => e.json())
    } else if (amount < 11) {
      for (let i = 0; i < amount; i++) {
        promises.push(fetch(mainUrl + 'images/nsfw/' + type).then(e => e.json()))
      }
      return await Promise.all(promises);
    } else throw new Error('amount exceded maximum (10)')
  }
}

export default Shiro;
