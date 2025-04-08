require("dotenv").config();
require('@nomicfoundation/hardhat-toolbox');
const {ethers} = require('ethers');
/** @type import('hardhat/config').HardhatUserConfig */
const balance =`${100 * Math.pow(10, 18)}`;

const random = [ethers.Wallet.createRandom(), ethers.Wallet.createRandom(), ethers.Wallet.createRandom()].map(item => ({privateKey: item.privateKey, balance}));

module.exports = {
    solidity: '0.8.17',
    networks: {
        hardhat: {
            accounts: [{balance, privateKey: process.env.PRIVATE_KEY}, ...random]
        }
    },

};
