import VaultABI from './abis/CommunityVault.abi.json';
import { BaseContract } from './BaseContract';
import {BigNumber, ethers} from 'ethers';

export interface VaultProps {
    provider: ethers.providers.Provider;
}

export interface AssetInfo {
    token: string;
    balance: BigNumber;
    usdValue: number;
    usdPrice: number;
}

export class CommunityVault extends BaseContract {


    constructor(props: VaultProps) {
        super({
            ...props,
            abi: VaultABI,
            name: "CommunityVault"
        });
    }

    /**
     * View functions
     */
    async isFeeTokenAllowed(token: string, block?: number): Promise<boolean> {
        return await this._callContract('isFeeTokenAllowed', [token], block);
    }

    async discountBps(block?: number): Promise<number> {
        return +((await this._callContract('discountBps', [], block)).toString());
    }

    async dailyVolumeUSD(block?: number): Promise<number> {
        const usd = await this._callContract('dailyVolumeUSD', [],block);
        return +this.inDecs(usd, 6);
    }

    async paused(block?: number): Promise<boolean> {
        return await this._callContract('paused', [],block);
    }

    async adminMultiSig(block?: number): Promise<string> {
        return await this._callContract("adminMultiSig", [],block);
    }

    async dxblToken(block?: number): Promise<string> {
        return await this._callContract('dxblToken', [],block);
    }

    async dexibleContract(block?: number): Promise<string> {
        return await this._callContract("dexibleContract", [],block);
    }

    async  wrappedNativeToken(block?: number): Promise<string> {
        return await this._callContract('wrappedNativeToken', [],block);
    }

    async timelockSeconds(block?: number): Promise<number> {
        return +((await this._callContract("timelockSeconds", [],block)).toString());
    }

    async baseMintThreshold(block?: number): Promise<number> {
        return +((await this._callContract("baseMinteThreshold", [],block)).toString());
    }

    /**
     * Computed view functions
     */
    async convertGasToFeeToken(feeToken: string, gasCost: BigNumber,block?: number): Promise<BigNumber> {
        return await this._callContract('convertGasToFeeToken', [feeToken, gasCost],block);
    }

    async estimateRedemption(feeToken: string, dxblAmount: BigNumber,block?: number): Promise<BigNumber> {
        return await this._callContract('estimateRedemption', [feeToken, dxblAmount],block);
    }

    async feeTokenPriceUSD(feeToken: string,block?: number): Promise<number> {
        const usd = await this._callContract('feeTokenPriceUSD', [feeToken],block);
        return +this.inDecs(usd, 6);
    }

    async aumUSD(block?: number): Promise<number> {
        const usd = await this._callContract('aumUSD', [],block);
        return +this.inDecs(usd, 6);
    }

    async currentNavUSD(block?: number): Promise<number> {
        const usd = await this._callContract('currentNavUSD', [],block);
        return +this.inDecs(usd);
    }

    async assets(block?: number): Promise<AssetInfo[]> {
        const val = await this._callContract('assets', [],block);
        return val.map(v => {
            return {
                balance: v.balance,
                token: v.token,
                usdPrice: +this.inDecs(v.usdPrice, 6),
                usdValue: +this.inDecs(v.usdValue, 6)
            } as AssetInfo;
        });
    }

    async currentMintRateUSD(block?: number): Promise<number> {
        const usd = await this._callContract('currentMintRateUSD', [],block);
        return +this.inDecs(usd, 6);
    }
    
}