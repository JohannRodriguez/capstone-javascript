import Enemy from './TestFiles/Enemy';
jest.mock('./TestFiles/Enemy');

describe('Player', () => {
  const enemy =  new Enemy();

  it('Set enemy scene', () => {
    enemy.scene = 'GameScene';
    expect(enemy.scene).toBe('GameScene');
  });

  it('Set enemy permited speed', () => {
    enemy.speed = 250;
    expect(enemy.speed).toBe(250);
  });

  it('Set enemy key for sprite', () => {
    enemy.key = 'clob';
    expect(enemy.key).toBe('clob');
  });

  it('Check correct enemy sprite', () => {
    enemy.key = 'clob';
    expect(enemy.key).not.toBe('Kingclob');
  });

  it('Assign type code', () => {
    enemy.key = 0;
    expect(enemy.key).not.toBeNaN();
  });

  it('Assign invalid type code', () => {
    enemy.key = 'Zero';
    expect(enemy.key).toBe('Zero');
  });
});