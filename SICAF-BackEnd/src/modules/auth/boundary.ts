import { UsersStorageGateway } from "../users/adapters/users-storage-gateway";

const usersStorageGateway = new UsersStorageGateway();

const findUserCartById = usersStorageGateway.getCartById;

export { 
    findUserCartById 
};