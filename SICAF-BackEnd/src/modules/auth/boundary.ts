import { UsersStorageGateway } from "../users/adapters/users-storage-gateway";

const usersStorageGateway = new UsersStorageGateway();

const findUserByEmail = usersStorageGateway.findByEmail;
const findUserCartById = usersStorageGateway.getCartById;

export { 
    findUserByEmail,
    findUserCartById 
};