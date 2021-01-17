declare type SFWImageType = 'avatar' | 'blush' | 'hug' | 'cry' | 'kiss' | 'neko' | 'nom' | 'pat' | 'poke' | 'pout' | 'slap' | 'smug' | 'tickle' | 'wallpapers';
declare type NSFWImageType = 'bondage' | 'hentai' | 'thighs';
interface response {
    code: 200 | 204 | 404 | 403 | 429;
    url?: string;
    message?: string;
}
declare class Shiro {
    constructor();
    static sfw(type: SFWImageType, options: object): Promise<response | response[]>;
    static nsfw(type: NSFWImageType, options: object): Promise<response | response[]>;
    private static validateSFWEndpoint;
    private static validateNSFWEndpoints;
    private static parseOptions;
    private static request;
}
export default Shiro;
