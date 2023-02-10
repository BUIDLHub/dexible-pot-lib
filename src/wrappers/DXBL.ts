import DXBLABI from '../abis/DXBL.abi.json';
import {BigNumber, ethers} from 'ethers';
import { BaseContract } from './BaseContract';


export interface DXBLProps {
    provider: ethers.providers.Provider;
}

export class DXBL extends BaseContract {
    constructor(props: DXBLProps) {
        super({
            ...props,
            abi: DXBLABI,
            name: "DXBL"
        });
    }

    async totalSupply(block?: number): Promise<BigNumber> {
        return await this._callContract('totalSupply', [], block);
    }

    async balanceOf(trader: string, block?: number): Promise<BigNumber> {
        return await this._callContract('balanceOf', [trader], block);
    }

    async decimals(): Promise<number> {
        return +(await this._callContract('decimals', []).toString());
    }

    async symbol(): Promise<string> {
        return await this._callContract("symbol", []);
    }

    async comunityVault(): Promise<string> {
        return await this._callContract('minter', []);
    }
}