import { UseCase } from "../../../kernel/contracts";
import { UpdateCartDto } from "../adapters/dto/update-cart-dto";
import { findProductById } from "../boundary";
import { ShoppingCart } from "../entity/shopping-cart";
import { UsersRepository } from "./ports/users-repository";

export class UpdateCartInteractor implements UseCase<UpdateCartDto,ShoppingCart>{
    constructor(private readonly repository: UsersRepository) {}

    async execute(payload: UpdateCartDto): Promise<ShoppingCart> {
        if(!payload.user_id) throw new Error('Missing fields')
        if(payload.cart){
            for(let i = 0; i < payload.cart.length; i++){
                if(!await findProductById(payload.cart[i].product_id)) throw new Error('Not found')
            }
        }
        return this.repository.updateCart(payload);
    }
}