import { UseCase } from "../../../kernel/contracts";
import { ShoppingCart } from "../entity/shopping-cart";
import { UsersRepository } from "./ports/users-repository";

export class GetCartByUserIdInteractor implements UseCase<number,ShoppingCart>{
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(payload: number): Promise<ShoppingCart> {
        if(!payload) throw new Error('Missing fields');
        if(!await this.usersRepository.existsById(payload)) throw new Error('Not found');
        
        return this.usersRepository.getCartById(payload);
    }
}