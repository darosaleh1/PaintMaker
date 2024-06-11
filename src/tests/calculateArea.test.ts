
function calculateArea(width:number, height:number): number {
    return width * height;
}

describe('calculateArea', () => {
  test('calculate the area of a square/rectangle given the width and height', () => {
    expect(calculateArea(5, 10)).toBe(50);
    expect(calculateArea(2, 3)).toBe(6);
    expect(calculateArea(0, 10)).toBe(0);
    expect(calculateArea(10, 0)).toBe(0);
  });

  
  test('handle non-integer values ', () => {
    expect(calculateArea(4.5, 3.2)).toBeCloseTo(14.4, 1);
  });
});
