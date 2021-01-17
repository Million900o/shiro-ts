"use strict";
// This is still very bad, im not sure how this should be done.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const mainURL = 'https://shiro.gg/api/';
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
};
const NSFWImages = {
    bondage: 'bondage',
    hentai: 'hentai',
    thighs: 'thighs'
};
class Shiro {
    constructor() { }
    static sfw(type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateSFWEndpoint(type);
            return yield this.request('images/' + type + this.parseOptions(options));
        });
    }
    static nsfw(type, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateNSFWEndpoints(type);
            return yield this.request('images/nsfw/' + type + this.parseOptions(options));
        });
    }
    static validateSFWEndpoint(endpoint) {
        if (!SFWImages[endpoint])
            throw new Error('SFW endpoint ' + endpoint + ' does not exist');
        return true;
    }
    static validateNSFWEndpoints(endpoint) {
        if (!NSFWImages[endpoint])
            throw new Error('NSFW endpoint ' + endpoint + ' does not exist');
        return true;
    }
    static parseOptions(options) {
        if (!options || typeof (options) !== 'object')
            return '';
        let str = '';
        for (const [key, value] of Object.entries(options)) {
            if (!str)
                str += `?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            str += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return str;
    }
    static request(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield node_fetch_1.default(mainURL + endpoint).then(req => req.json());
        });
    }
}
exports.default = Shiro;
