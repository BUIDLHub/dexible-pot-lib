import DexibleABI from '../abis/Dexible.abi.json';
import {ethers} from 'ethers';
import { BaseContract } from './BaseContract';


export interface DexibleProps {
    address: string;
    provider: ethers.providers.Provider;
}

export class Dexible extends BaseContract {
    provider: ethers.providers.Provider;
    chainId?: number;
    contract?: ethers.Contract;

    constructor(props: DexibleProps) {
        super({
            ...props,
            abi: DexibleABI,
            name: "Dexible"
        });
    }

    /**
     * View functions
     */
    async revshareSplitRatio(block?: number): Promise<number> {
        return +(await this._callContract('revshareSplitRatio', [],block)).toString()
    }

    async stdBpsRate(block?: number): Promise<number> {
        return +(await this._callContract('stdBpsRate', [],block)).toString();
    }

    async minBpsRate(block?: number): Promise<number> {
        return +(await this._callContract('minBpsRate', [],block)).toString();
    }

    async minFeeUSD(block?: number): Promise<number> {
        const usd = await (this._callContract('minFeeUSD', [],block));
        return +this.inDecs(usd, 6);
    }
        
    async communityVault(block?: number): Promise<string>  {
        return await this._callContract('communityVault', [],block);
    }

    async  treasury(block?: number): Promise<string> {
        return await this._callContract('treasury', [],block);
    }

    async dxblToken(block?: number): Promise<string>  {
        return await this._callContract('dxblToken', [],block);
    }

    async arbitrumGasOracle(block?: number): Promise<string> {
        return await this._callContract('arbitrumGasOracle', [],block);
    }

}