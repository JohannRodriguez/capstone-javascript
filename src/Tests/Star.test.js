import Star from './TestFiles/Star';
jest.mock('./TestFiles/Star');

describe('Player', () => {
  const star =  new Star();

  it('Set star scene', () => {
    star.scene = 'GameScene';
    expect(star.scene).toBe('GameScene');
  });

  it('Set star permited speed', () => {
    star.speed = 300;
    expect(star.speed).toBe(300);
  });

  it('Set star key for sprite', () => {
    star.key = 'star';
    expect(star.key).toBe('star');
  });
});