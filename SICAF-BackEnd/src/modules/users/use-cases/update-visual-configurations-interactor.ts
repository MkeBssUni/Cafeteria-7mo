import { UseCase } from "../../../kernel/contracts";
import { UpdateVisualConfigurationsDto } from "../adapters/dto/update-visual-configurations-dto";
import { UsersRepository } from "./ports/users-repository";

export class UpdateVisualConfigurationsInteractor implements UseCase<UpdateVisualConfigurationsDto,UpdateVisualConfigurationsDto>{
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(payload: UpdateVisualConfigurationsDto): Promise<UpdateVisualConfigurationsDto> {
        if(!payload.user_id || !payload.letter_size) throw new Error('Missing fields');
        if(!await this.usersRepository.existsById(payload.user_id)) throw new Error('Not found')
        if(typeof payload.dark_theme != 'boolean') throw new Error('Invalid field type')
        if(payload.letter_size != 'Grande' && payload.letter_size != 'Mediana' && payload.letter_size != 'Pequeña') throw new Error('Invalid field type')
        
        return await this.usersRepository.updateVisualConfigurations(payload);
    }
}