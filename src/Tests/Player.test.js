import Player from './TestFiles/Player';

jest.mock('./TestFiles/Player');

beforeEach(() => {
  Player.mockClear();
});

describe('Player', () => {
  const player = new Player();

  it('Set player scene', () => {
    player.scene = 'GameScene';
    expect(player.scene).toBe('GameScene');
  });

  it('Player double jump should be available', () => {
    player.dJump = true;
    expect(player.dJump).toBe(true);
  });

  it('Set player key for sprite', () => {
    player.key = 'Player';
    expect(player.key).toBe('Player');
  });
});
