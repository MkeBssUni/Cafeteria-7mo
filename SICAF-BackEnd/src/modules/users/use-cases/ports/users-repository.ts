import { UserByIdAndRoleDto } from "../../adapters/dto/UserByIdAndRoleDto";
import { UpdateCartDto } from "../../adapters/dto/update-cart-dto";
import { UpdateUserDto } from "../../adapters/dto/update-user-dto";
import { ShoppingCart } from "../../entity/shopping-cart";
import { User } from "../../entity/user";

export interface UsersRepository {
    existsByIdAndRole(payload: UserByIdAndRoleDto): Promise<boolean>;
    create(payload: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByStatus(status: boolean): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
    existsById(id: number): Promise<boolean>;
    update(payload: UpdateUserDto): Promise<User>;
    changeStatus(id: number): Promise<User>;
    updateCart(payload: UpdateCartDto): Promise<ShoppingCart>;
    getCartById(id: number): Promise<ShoppingCart>;
    //pendiente changePassword

}