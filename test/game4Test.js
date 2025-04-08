const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const players = [ethers.provider.getSigner(0), ethers.provider.getSigner(0)];
    return { game, players };
  }
  it('should be a winner', async function () {
    const { game, players } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(players[0]).write(players[1].getAddress());

    await game.connect(players[1]).win(players[0].getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
