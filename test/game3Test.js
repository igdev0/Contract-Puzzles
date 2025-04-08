const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const plauers = [ethers.provider.getSigner(0), ethers.provider.getSigner(1), ethers.provider.getSigner(2)];

    return { game, players };
  }

  it('should be a winner', async function () {
    const { game, players } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage
    //
    let value = 2;
    await game.connect(players[0]).buy({ value: `${value}` })
    value = 3;
    await game.connect(players[1]).buy({ value: `${value}` })
    value = 1;
    await game.connect(players[2]).buy({ value: `${value}` })
    // to call a contract as a signer you can use contract.connect

    // TODO: win expects three arguments
    await game.win(players[0].getAddress(), players[1].getAddress(), players[2].getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
