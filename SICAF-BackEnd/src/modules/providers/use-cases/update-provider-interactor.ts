import { UseCase } from "../../../kernel/contracts";
import { isValidEmail, isValidName, isValidPhone, isValidPostalCode } from "../../../kernel/validations";
import { UpdateProviderDto } from "../adapters/dto/upadte-provider-dto";
import { Provider } from "../entities/provider";
import { ProvidersRepository } from "./ports/providers-repository";

export class UpdateProviderInteractor implements UseCase<UpdateProviderDto, Provider>{
    constructor(private readonly providerRepository: ProvidersRepository){}
    async execute(payload: UpdateProviderDto): Promise<Provider> {
        if(!await this.providerRepository.existsById(payload.id)) throw new Error("Not found")
        const actualProvider = await this.providerRepository.findById(payload.id);
        payload.name = payload.name.trim()
        payload.contact_name = payload.contact_name?.trim()
        payload.contact_lastname = payload.contact_lastname?.trim()
        payload.email = payload.email.trim()
        payload.ingredient = payload.ingredient?.trim()
        payload.notes = payload.notes?.trim()
        if(payload.address){
            payload.address.street = payload.address.street.trim()
            payload.address.settlement = payload.address.settlement.trim()
            payload.address.external_number = payload.address.external_number?.trim()
            payload.address.internal_number = payload.address.internal_number?.trim()
            payload.address.city = payload.address.city.trim()
            payload.address.state = payload.address.state.trim()
            payload.address.postal_code = payload.address.postal_code.trim()
            payload.address.country = payload.address.country.trim()

            if(payload.address.external_number){
                payload.address.external_number = payload.address.external_number.trim();
                if(isNaN(Number(payload.address.external_number))) throw new Error("Invalid address number")
            }

            if(payload.address.internal_number){
                payload.address.internal_number = payload.address.internal_number.trim();
                if(isNaN(Number(payload.address.internal_number))) throw new Error("Invalid address number")
            }
        }

        if(!payload.name) throw new Error("Missing fields")
        if(payload.name !== actualProvider.name){
            if(await this.providerRepository.existsByName(payload.name)) throw new Error("Already exists")
            if(!isValidName(payload.name)) throw new Error("Invalid name")
        }

        if(!payload.email) throw new Error("Missing fields")
        if(payload.email !== actualProvider.email){
            if(await this.providerRepository.existsByEmail(payload.email)) throw new Error("Already exists")
            if(!isValidEmail(payload.email)) throw new Error("Invalid email")
        }

        if(!payload.phone_number1) throw new Error("Missing fields")
        if(! isValidPhone(payload.phone_number1)) throw new Error("Invalid phone number")

        if(payload.phone_number2){
            if(! isValidPhone(payload.phone_number2)) throw new Error("Invalid phone number")
        }

        if(payload.address){
            if(!payload.address.street || !payload.address.settlement || !payload.address.city || !payload.address.state || !payload.address.postal_code || !payload.address.country) throw new Error("Missing fields")
            if(!isValidPostalCode(payload.address.postal_code)) throw new Error("Invalid postal code")
        }
        return await this.providerRepository.update(payload);
    }

}