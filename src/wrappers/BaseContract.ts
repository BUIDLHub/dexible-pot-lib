import {ethers} from 'ethers';
import {Addresses} from '../Addresses';

const inDecs = ethers.utils.formatUnits;

export interface BaseProps {
    abi: any;
    address?: string;
    name: string;
    provider: ethers.providers.Provider;
}

export class BaseContract {
    provider: ethers.providers.Provider;
    abi: any;
    name: string;
    address?: string;
    chainId?: number;
    contract?: ethers.Contract;

    constructor(props: BaseProps) {
        this.abi = props.abi;
        this.address = props.address;
        this.provider = props.provider;
        this.name = props.name;
    }

    async _resolveContract(): Promise<void> {
        if(!this.chainId) {
            this.chainId = +((await this.provider.getNetwork()).chainId);
            this.contract = new ethers.Contract(this.address || Addresses[this.name][this.chainId], this.abi, this.provider);
        }
    }

    async _callContract(fnName, args, block?: number): Promise<any> {
        await this._resolveContract();
        if(block) {
            return await this.contract[fnName](...args, {
                blockTag: block
            });
        }
        return await this.contract[fnName](...args);
    }

    inDecs = inDecs;

}