import { UserController } from "./user.controller";

export const userBoundary = {
    saveUser : UserController.saveUser,
    findByEmail : UserController.findByEmail,
    //getUsers : UserController.getUsers,
    //changePassword: UserController.changePassword,
   // deleteUser: UserController.deleteUser,
    updateUser : UserController.updateUser,
}
