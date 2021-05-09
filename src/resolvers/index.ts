import { NonEmptyArray } from 'type-graphql';
import { HelloResolver } from './hello';
import { UserResolver } from './user';
export const AppResolvers: NonEmptyArray<Function> | NonEmptyArray<string>
    = [HelloResolver, UserResolver];