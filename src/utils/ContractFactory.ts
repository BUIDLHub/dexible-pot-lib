import { Contract, ethers } from "ethers";
import { CommunityVault } from "../wrappers/CommunityVault";
import { Dexible } from "../wrappers/Dexible";
import { DXBL } from "../wrappers/DXBL";
import { AddressFinder } from "./AddressFinder";

export class ContractFactory {
    static finder?: AddressFinder;

    static async getDXBLToken(provider: ethers.providers.Provider): Promise<DXBL> {
        if(!ContractFactory.finder) {
            ContractFactory.finder = new AddressFinder(provider);
        }
        return new DXBL({provider});
    }

    static async getCommunityVault(provider: ethers.providers.Provider): Promise<CommunityVault> {
        if(!ContractFactory.finder) {
            ContractFactory.finder = new AddressFinder(provider);
        }
        const vaultAddr = await ContractFactory.finder.findVault();
        if(!vaultAddr) {
            throw new Error("Could not resolve vault's address");
        }
        return new CommunityVault({
            address: vaultAddr,
            provider
        });
    }

    static async getDexible(provider: ethers.providers.Provider): Promise<Dexible> {
        if(!ContractFactory.finder) {
            ContractFactory.finder = new AddressFinder(provider);
        }
        const dexAddr = await ContractFactory.finder.findDexible();
        if(!dexAddr) {
            throw new Error("Could not resolve Dexible's current address");
        }
        return new Dexible({
            address: dexAddr,
            provider
        });
    }
}