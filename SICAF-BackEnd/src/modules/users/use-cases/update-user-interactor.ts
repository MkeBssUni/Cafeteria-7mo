import { UseCase } from "../../../kernel/contracts";
import { isValidGender, isValidName, isValidPassword, isValidPhone, isValidPostalCode } from "../../../kernel/validations";
import { UpdateUserDto } from "../adapters/dto/update-user-dto";
import { User } from "../entity/user";
import { UsersRepository } from "./ports/users-repository";

export class UpdateUserInteractor implements UseCase<UpdateUserDto,User>{
    constructor(private readonly usersRepository: UsersRepository) {}
    async execute(payload: UpdateUserDto): Promise<User> {
        if(!payload.email || !payload.role_id || !payload.person) throw new Error('Missing fields');
        if(!payload.person.name || !payload.person.lastname || !payload.person.gender || !payload.person.phone_number1) throw new Error('Missing fields');
        if(payload.person.address){
            if(!payload.person.address!.street || !payload.person.address!.settlement || !payload.person.address!.city || !payload.person.address!.state || !payload.person.address!.postal_code || !payload.person.address!.country) throw new Error('Missing fields');
            if(!isValidPostalCode(payload.person.address.postal_code)) throw new Error('Invalid postal code');
        }

        if(! this.usersRepository.existsById(payload.user_id)) throw new Error('Not found');
        const user = await this.usersRepository.findById(payload.user_id);
        if(payload.email!=user.email && await this.usersRepository.existsByEmail(payload.email)) throw new Error('Email already exists');
        if(!isValidName(payload.person.name)) throw new Error('Invalid name');
        if(!isValidName(payload.person.lastname)) throw new Error('Invalid lastname');
        if(!isValidGender(payload.person.gender)) throw new Error ('Invalid gender');
        if(!isValidPhone(payload.person.phone_number1)) throw new Error('Invalid phone number');
        if(payload.person.phone_number2 && !isValidPhone(payload.person.phone_number2)) throw new Error('Invalid phone number');
        if(payload.role_id==1) throw new Error('Invalid role id');

        return await this.usersRepository.update(payload);
    }
}