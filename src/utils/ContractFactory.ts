import { Contract, ethers } from "ethers";
import { CommunityVault } from "../wrappers/CommunityVault";
import { Dexible } from "../wrappers/Dexible";
import { DXBL } from "../wrappers/DXBL";
import { AddressFinder } from "./AddressFinder";

type FinderCache = {
    [chain: number]: AddressFinder;
}

export class ContractFactory {
    static finders: FinderCache = {};

    static async getFinder(provider): Promise<AddressFinder> {
        const cid = await (await provider.getNetwork()).chainId;
        let finder = ContractFactory.finders[cid];
        if(!finder) {
            finder = new AddressFinder(provider);
            ContractFactory.finders[cid] = finder;
        }
        return finder;
    }

    static async getDXBLToken(provider: ethers.providers.Provider): Promise<DXBL> {
        await ContractFactory.getFinder(provider);
        return new DXBL({provider});
    }

    static async getCommunityVault(provider: ethers.providers.Provider): Promise<CommunityVault> {
        const finder: AddressFinder = await ContractFactory.getFinder(provider);
        const vaultAddr = await finder.findVault();
        if(!vaultAddr) {
            throw new Error("Could not resolve vault's address");
        }
        return new CommunityVault({
            address: vaultAddr,
            provider
        });
    }

    static async getDexible(provider: ethers.providers.Provider): Promise<Dexible> {
        const finder = await ContractFactory.getFinder(provider);
        const dexAddr = await finder.findDexible();
        if(!dexAddr) {
            throw new Error("Could not resolve Dexible's current address");
        }
        return new Dexible({
            address: dexAddr,
            provider
        });
    }
}