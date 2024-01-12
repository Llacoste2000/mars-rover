export class Integer {
  private readonly _value: number;

  static minusOne = new Integer(-1);
  static zero = new Integer(0);
  static one = new Integer(1);

  public constructor(value: number) {
    if (!Number.isInteger(value)) {
      throw new Error(`${value} is not an integer.`)
    }
    this._value = value;
  }

  public add(other: Integer): Integer {
    return new Integer(this._value + other._value);
  }

  public subtract(other: Integer): Integer {
    return new Integer(this._value - other._value);
  }

  public greaterThan(other: Integer): boolean {
    return this._value > other._value;
  }

  public lessThan(other: Integer): boolean {
    return this._value < other._value;
  }

  public modulo(other: Integer): Integer {
    return new Integer(this._value % other._value);
  }

  public equals(other: Integer): boolean {
    return this._value === other._value
  }


}