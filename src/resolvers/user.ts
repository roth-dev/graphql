import {
    Resolver,
    Query,
    Mutation
} from "type-graphql";
@Resolver()
export class UserResolver {
    @Mutation(() => String)
    register() {
        return "Hello from apollo graphql";
    }

}