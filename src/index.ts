import fetch from 'node-fetch';

type SFWImageType = 'avatars' | 'blush' | 'hug' | 'kiss' | 'neko' | 'nom' | 'pat' | 'pout' | 'slap' | 'smug' | 'wallpapers'
type NSFWImageType = 'bondage' | 'hentai' | 'thighs'

const mainUrl = 'https://shiro.gg/api/'

export = {
  sfw: async (type: SFWImageType, amount: number) => {
    const promises = [];
    if(!amount || amount === 1) {
      return await fetch(mainUrl + 'images/' + type).then(e => e.json())
    } else if (amount < 11) {
      for(let i = 0; i < amount; i++) {
        promises.push(fetch(mainUrl + 'images/' + type).then(e => e.json()))
      }
      return await Promise.all(promises);
    } else throw new Error('amount exceded maximum (10)')
  },
  nsfw: async (type: NSFWImageType, amount: number) => {
    const promises = [];
    if(!amount || amount === 1) {
      return await fetch(mainUrl + 'images/nsfw/' + type).then(e => e.json())
    } else if (amount < 11) {
      for(let i = 0; i < amount; i++) {
        promises.push(fetch(mainUrl + 'images/nsfw/' + type).then(e => e.json()))
      }
      return await Promise.all(promises);
    } else throw new Error('amount exceded maximum (10)')
  }
}
