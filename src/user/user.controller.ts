import { Controller, Post, Body, Get } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import type { UserEntity } from './interfaces/user.entity';

// O decorador @Controller define a rota base para este controlador
// Neste caso, todas as rotas deste controlador começarão com /userEntity

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    // Método para criar um usuário
    // @Post() é um decorador que indica que este método deve ser chamado quando uma requisição POST for feita para o endpoint /user
    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    // Outros métodos do controlador podem ser adicionados aqui
    // Exemplo: @Get(), @Put(), @Delete() etc.
    // @Get() async getUsers() { ... }
    // @Put(':id') async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) { ... }
    // @Delete(':id') async deleteUser(@Param('id') id: string) { ... }
    @Get()
    async getAllUser(): Promise<UserEntity[]> {
        return this.userService.getAllUser();
    }
}