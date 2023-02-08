import {ethers} from 'ethers';
import {CommunityVault} from '../src/CommunityVault';
require("dotenv").config();

describe("TestVault", function() {
    jest.setTimeout(60000);

    let provider: ethers.providers.Provider;
    beforeAll(async ()=> {
        const rpc = process.env.RPC_URL;
        if(!rpc) {
            throw new Error("No RPC_URL in env");
        }
        provider = new ethers.providers.JsonRpcProvider(rpc);
    });

    it("Should get the assets in vault", async () => {
        const con = new CommunityVault({
            provider
        });
        const assets = await con.assets();
        console.log("Assets", assets);
    });

    it("Should get the current mint rate in vault", async () => {
        const con = new CommunityVault({
            provider
        });
        const rate = await con.currentMintRateUSD(16586626);
        console.log("Mint rate", rate);
    });
})