import { ethers } from "ethers";
import { CommunityVault } from "../wrappers/CommunityVault";
import { DXBL } from "../wrappers/DXBL";
import { AddressCache, IDataRetreiver } from "./AddressCache";

const TTL = 86400000;
export class AddressFinder {
    cache: AddressCache = new AddressCache(TTL);
    token: DXBL;
    vault?: CommunityVault;

    constructor(readonly provider: ethers.providers.Provider) {
        this.token = new DXBL({provider});
    }

    findDexible(): Promise<string> {
        return this.cache.lookup({
            key: 'dexible',
            queryHandler: {
                retrieveData: this._lookupDexible.bind(this)
            } as IDataRetreiver
        });
    }

    findVault(): Promise<string> {
        return this.cache.lookup({
            key: 'vault',
            queryHandler: {
                retrieveData: this._lookupVault.bind(this)
            }
        });
    }

    async _lookupVault(): Promise<string> {
        //get the current vault address from the token
        const addr = await this.token.comunityVault();

        //cache the contract so we can lookup dexible address as well
        this.vault = new CommunityVault({
            address: addr,
            provider: this.provider
        });
        return addr;
    }

    async _lookupDexible(): Promise<string> {
        if(!this.vault) {
            await this._lookupVault();
        }
        //get current dexible contract attached to the vault
        const addr = await this.vault.dexibleContract();
        return addr;
    }
}