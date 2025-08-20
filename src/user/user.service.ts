import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

    ) { }



    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRound = 10;
        // Aqui você pode adicionar lógica para criptografar a senha, se necessário
        // const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRound);
        // createUserDto.password = hashedPassword;
        const passwordHash = await hash(createUserDto.password, saltOrRound);

        // Simulando a criação do usuário (em um cenário real, você salvaria no banco de dados)
        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: passwordHash,
        });
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

}
