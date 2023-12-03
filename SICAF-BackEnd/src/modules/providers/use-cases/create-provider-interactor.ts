import { UseCase } from "../../../kernel/contracts";
import { isValidEmail, isValidName, isValidPhone, isValidPostalCode } from "../../../kernel/validations";
import { Provider } from "../entities/provider";
import { ProvidersRepository } from "./ports/providers-repository";

export class CreateProviderInteractor implements UseCase<Provider, Provider>{
    constructor( private readonly repository: ProvidersRepository ){}
    async execute(payload: Provider): Promise<Provider> {
        payload.name = payload.name.trim();
        if(payload.contact_name) payload.contact_name = payload.contact_name.trim();
        if(payload.contact_lastname) payload.contact_lastname = payload.contact_lastname.trim();
        payload.phone_number1 = payload.phone_number1.trim();
        if(payload.phone_number2) payload.phone_number2 = payload.phone_number2.trim();
        payload.email = payload.email.trim();
        if(payload.address){
            payload.address.street = payload.address.street.trim();
            payload.address.settlement = payload.address.settlement.trim();
            if(payload.address.external_number){
                payload.address.external_number = payload.address.external_number.trim();
                if(isNaN(Number(payload.address.external_number))) throw new Error("Invalid address number")
            }

            if(payload.address.internal_number){
                payload.address.internal_number = payload.address.internal_number.trim();
                if(isNaN(Number(payload.address.internal_number))) throw new Error("Invalid address number")
            }
            payload.address.city = payload.address.city.trim();
            payload.address.state = payload.address.state.trim();
            payload.address.postal_code = payload.address.postal_code.trim();
            payload.address.country = payload.address.country.trim();
        }
        if(payload.ingredient) payload.ingredient = payload.ingredient.trim();
        if(payload.notes) payload.notes = payload.notes.trim();

        if(!payload.name) throw new Error("Missing fields")
        if(await this.repository.existsByName(payload.name)) throw new Error("Already exists")
        if(!isValidName(payload.name)) throw new Error("Invalid name")
        if(!payload.phone_number1) throw new Error("Missing fields")
        if(!isValidPhone(payload.phone_number1)) throw new Error("Invalid phone number")
        if(payload.phone_number2 && !isValidPhone(payload.phone_number2)) throw new Error("Invalid phone number")
        if(!payload.email) throw new Error("Missing fields")
        if(await this.repository.existsByEmail(payload.email)) throw new Error("Already exists")
        if(!isValidEmail(payload.email)) throw new Error("Invalid email")
        if(!payload.address) throw new Error("Missing fields")
        if(!payload.address.street) throw new Error("Missing fields")
        if(!payload.address.settlement) throw new Error("Missing fields")
        if(!payload.address.city) throw new Error("Missing fields")
        if(!payload.address.state) throw new Error("Missing fields")
        if(!payload.address.postal_code) throw new Error("Missing fields")
        if(!payload.address.country) throw new Error("Missing fields")
        if(!isValidPostalCode(payload.address.postal_code)) throw new Error("Invalid postal code")



        return this.repository.create(payload)
    }
}