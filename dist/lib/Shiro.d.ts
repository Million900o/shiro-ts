declare enum SFWImageType {
    avatars = "avatar",
    blush = "blush",
    hug = "hug",
    kiss = "kiss",
    neko = "neko",
    nom = "nom",
    pat = "pat",
    pout = "pout",
    slap = "slap",
    smug = "smug",
    wallpapers = "wallpapers"
}
declare enum NSFWImageType {
    bondage = "bondage",
    hentai = "hentai",
    thighs = "thighs"
}
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
