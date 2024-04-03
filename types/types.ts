export type DeprecatedUser =  {
      displayName: string;
      photoURL: string;
      email: string;
    }

export type Food = {
  name: string
  percentRating: number
  imgFirebaseURL: string
  id: string
  numAppeardInVote: number
}

export type Voter = {
  name: string
  votes: number
  id:string
  votedFoods: Food[]
}

type ToLowercaseUppercase<T extends string> = `${Uppercase<T> & Lowercase<T>}`;
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type Percent = Range<0, 100>
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends any[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

type NullArray<T extends number, Result extends any[] = []> =
  Result['length'] extends T ? Result : NullArray<T, [...Result, null]>;

export type Fixed64LengthBoard = [...NullArray<64>, ...number[]];

type NullOrNumberArray<T extends number, Result extends any[] = []> =
Result['length'] extends T ? Result : NullOrNumberArray<T, [...Result, null | number]>;

export type Array64Num = NullOrNumberArray<64>;