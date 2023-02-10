


interface CacheItem {
    expires: number;
    item: string;
}

type Cache = {
    [key: string]: CacheItem;
}

export interface IDataRetreiver {
    retrieveData():Promise<string>;
}

interface LookupRequest {
    key: string;
    queryHandler: IDataRetreiver;
}


export class AddressCache {
    cache: Cache = {};
   
    constructor(readonly ttl: number) {}

    async lookup(req: LookupRequest): Promise<string> {
        let v = this.cache[req.key];
        if(v && v.expires > Date.now()) {
            return v.item;
        }
        const s = await req.queryHandler.retrieveData();
        if(s) {
            v = {
                expires: Date.now() + this.ttl,
                item: s
            } as CacheItem;
            this.cache[req.key] = v;
        }
        return v.item;
    }
}