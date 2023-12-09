import { json } from "express";
import { pool } from "../../../config/bdconfig";
import { encodeString } from "../../../kernel/jwt";
import { findProductById } from "../boundary";
import { ShoppingCart } from "../entity/shopping-cart";
import { User } from "../entity/user";
import { UsersRepository } from "../use-cases/ports/users-repository";
import { UpdateCartDto } from "./dto/update-cart-dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { Product } from "../../products/entities/product";
import { ProductInCartDto } from "./dto/products-in-cart-dto";
import { UserByIdAndRoleDto } from "./dto/UserByIdAndRoleDto";
import { UserByIdDto } from "./dto/UserByIdDto";

export class UsersStorageGateway implements UsersRepository{
    async create(payload: User): Promise<User> {
        try {
            await pool.query('BEGIN')
            const responseUser = await pool.query('INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *', [payload.email, await encodeString(payload.password!), payload.role_id]);
            const user = responseUser.rows[0];
            const responseAddress = await pool.query('INSERT INTO addresses (street, settlement, external_number, internal_number, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [payload.person.address.street, payload.person.address.settlement, payload.person.address.external_number, payload.person.address.internal_number, payload.person.address.city, payload.person.address.state, payload.person.address.postal_code, payload.person.address.country]);
            const address = responseAddress.rows[0];
            const responsePerson = await pool.query('INSERT INTO people (user_id, name, lastname, gender, birthday, phone_number1, phone_number2, address_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',[
                user.id, payload.person.name, payload.person.lastname, payload.person.gender, payload.person.birthday, payload.person.phone_number1, payload.person.phone_number2, address.id
            ]);
            
            await pool.query('COMMIT')
            return this.findById(user.id);
        } catch (error) {
            await pool.query('ROLLBACK')
            throw Error
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const response = await pool.query('select u.*, p.*, a.* from users u inner join people p on u.id = p.user_id inner join addresses a on p.address_id = a.id');
            
            let users = [] as User[];

            response.rows.forEach(element => {
                users.push({
                    user_id: element.id,
                    email: element.email,
                    role_id: element.role_id,
                    dark_theme: element.dark_theme,
                    letter_size: element.letter_size,
                    reset_token: element.reset_token,
                    status: element.status,
                    created_at: element.created_at,
                    person:{
                        person_id: element.person_id,
                        user_id: element.user_id,
                        name: element.name,
                        lastname: element.lastname,
                        gender: element.gender,
                        birthday: element.birthday,
                        phone_number1: element.phone_number1,
                        phone_number2: element.phone_number2,
                        address:{
                            street: element.street,
                            settlement: element.settlement,
                            external_number: element.external_number,
                            internal_number: element.internal_number,
                            city: element.city,
                            state: element.state,
                            postal_code: element.postal_code,
                            country: element.country
                        }
                    }
                })
            });
            
            return users;
        } catch (error) {
            throw new Error
        }
    }

    async findByStatus(status: boolean): Promise<User[]> {
        try {
            const response = await pool.query('select u.*, p.*, a.* from users u inner join people p on u.id = p.user_id inner join addresses a on p.address_id = a.id where u.status = $1', [status]);
            let users = [] as User[];

            response.rows.forEach(element => {
                users.push({
                    user_id: element.id,
                    email: element.email,
                    role_id: element.role_id,
                    dark_theme: element.dark_theme,
                    letter_size: element.letter_size,
                    reset_token: element.reset_token,
                    status: element.status,
                    created_at: element.created_at,
                    person:{
                        person_id: element.person_id,
                        user_id: element.user_id,
                        name: element.name,
                        lastname: element.lastname,
                        gender: element.gender,
                        birthday: element.birthday,
                        phone_number1: element.phone_number1,
                        phone_number2: element.phone_number2,
                        address:{
                            street: element.street,
                            settlement: element.settlement,
                            external_number: element.external_number,
                            internal_number: element.internal_number,
                            city: element.city,
                            state: element.state,
                            postal_code: element.postal_code,
                            country: element.country
                        }
                    }
                })
            });

            return users
        } catch (error) {
            throw new Error
        }
    }

    async findById(id: number): Promise<User> {
        try {
            const response = await pool.query('select u.*, p.*, a.* from users u inner join people p on u.id = p.user_id inner join addresses a on p.address_id = a.id where u.id = $1', [id]);
            const jsonCart = await this.getCartById(id);
            
            const user ={
                user_id: response.rows[0].id,
                email: response.rows[0].email,
                password: response.rows[0].password,
                role_id: response.rows[0].role_id,
                dark_theme: response.rows[0].dark_theme,
                letter_size: response.rows[0].letter_size,
                reset_token: response.rows[0].reset_token,
                status: response.rows[0].status,
                person:{
                    person_id: response.rows[0].person_id,
                    user_id: response.rows[0].user_id,
                    name: response.rows[0].name,
                    lastname: response.rows[0].lastname,
                    gender: response.rows[0].gender,
                    birthday: response.rows[0].birthday,
                    phone_number1: response.rows[0].phone_number1,
                    phone_number2: response.rows[0].phone_number2,
                    shopping_cart: jsonCart,
                    address:{
                        id: response.rows[0].address_id,
                        street: response.rows[0].street,
                        settlement: response.rows[0].settlement,
                        external_number: response.rows[0].external_number,
                        internal_number: response.rows[0].internal_number,
                        city: response.rows[0].city,
                        state: response.rows[0].state,
                        postal_code: response.rows[0].postal_code,
                        country: response.rows[0].country,
                    }
                }
            } as User

            return user;
        } catch (error) {
            throw new Error
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const user = await pool.query('select u.*, p.*, a.* from users u inner join people p on u.id = p.user_id inner join addresses a on p.address_id = a.id where u.email = $1', [email]);
            return user.rows[0];
        } catch (error) {
            throw new Error
        }
    }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            const response = await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)', [email]);
            return response.rows[0].exists;
        } catch (error) {
            throw Error
        }
    }

    async existsById(id: number): Promise<boolean> {
        try {
            const response = await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)', [id]);
            return response.rows[0].exists;
        } catch (error) {
            throw Error
        }
    }
    
    async update(payload: UpdateUserDto): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async changeStatus(id: number): Promise<User> {
        try {
            const response = await pool.query('UPDATE users SET status = NOT status WHERE id = $1 RETURNING *', [id]);
            
            return this.findById(response.rows[0].id);
        } catch (error) {
            throw new Error
        }
    }

    async updateCart(payload: UpdateCartDto): Promise<ShoppingCart> {
        try {
            const response = await pool.query('UPDATE people SET shopping_cart = $1 WHERE user_id = $2 RETURNING shopping_cart', [JSON.stringify(payload.cart), payload.user_id]);
            
            return this.getCartById(payload.user_id);;        
        } catch (error) {
            throw new Error
        }
    }

    async getCartById(id: number): Promise<ShoppingCart> {
        try {
            const response = await pool.query('SELECT shopping_cart FROM people WHERE user_id = $1', [id]);
            const jsonCart = response.rows[0].shopping_cart;

            let cartProducts = []
            for (let index = 0; index < jsonCart.length; index++) {
                const product: Product = await findProductById(jsonCart[index].product_id);
                if (!product) throw new Error('Product not found');
                cartProducts.push({
                    product_id: jsonCart[index].product_id,
                    name: product.name,
                    price: product.price,
                    quantity: jsonCart[index].quantity,
                    pre_totalProduct: product.price * jsonCart[index].quantity,
                    image: product.image,
                })
            }

            return {
                user_id: id,
                cart: {
                    product: cartProducts as ProductInCartDto[],
                    pre_total_cart: cartProducts.reduce((acc: number, product: any) => acc + product.pre_totalProduct, 0)
                }
            }
        } catch (error) {
            console.log("Error: ", error)
            throw new Error
        }
    }
    
    async findUserInfoById(id: number): Promise<UserByIdDto> {
        try {
            const response = await pool.query('select id, role_id, email from users wher id = $1', [id]);
            return response.rows[0] as UserByIdDto;
        } catch (e) {
            throw new Error
        }
    }

}