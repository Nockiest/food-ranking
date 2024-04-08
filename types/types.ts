import { CSSProperties } from "react"

export type Food = {
  name: string
  description: string
  imageId: string
  // numAppeardInVote: number
  votes: {total: 0, won: 0}
  tags: Tag[]
}
export function isFood(value: any): value is Food {
  // Check if the value is an object
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  // Check if all required properties are present and have the correct types
  return (
    'name' in value &&
    typeof value.name === 'string' &&
    'description' in value &&
    typeof value.description === 'string' &&
    'imageId' in value &&
    typeof value.imageId === 'string' &&
    'numAppeardInVote' in value &&
    typeof value.numAppeardInVote === 'number' &&
    'votes' in value &&
    typeof value.votes === 'object' &&
    'total' in value.votes &&
    typeof value.votes.total === 'number' &&
    'won' in value.votes &&
    typeof value.votes.won === 'number' &&
    'tags' in value &&
    Array.isArray(value.tags) // Assuming tags is an array of Tag
  );
}
export type Tag = {
  name:string
  color: CSSProperties['color'];
}
export type Voter = {
  name: string;
  email:string;
  votes: number;
  id: string;
  votedFoods: { [foodId: string]: Food[] };
};
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