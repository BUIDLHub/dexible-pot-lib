import {ethers} from 'ethers';
import { ContractFactory } from '../src';
import {Dexible} from '../src/wrappers/Dexible';
require("dotenv").config();

describe("TestDexible", function() {
    jest.setTimeout(60000);

    let provider: ethers.providers.Provider;
    beforeAll(async ()=> {
        const rpc = process.env.RPC_URL;
        if(!rpc) {
            throw new Error("No RPC_URL in env");
        }
        provider = new ethers.providers.JsonRpcProvider(rpc);
    });

    it("Should query dexible for details", async () => {
        const con = await ContractFactory.getDexible(provider);
        console.log("Vault: ", await con.communityVault());

    });
})