import { Controller, Get, Post, Patch, Put, Delete, Param, Body, Query, Headers, ParseIntPipe, DefaultValuePipe, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { GetUsersParamDto } from 'src/users/dtos/get-users-params.dto';
import { PatchUserDto } from 'src/users/dtos/patch-user.dto';


@Controller('users')
export class UsersController {
    @Get(':id{/:optional}')


    public getUser(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query("offset", new DefaultValuePipe(1), ParseIntPipe) offset: number) {

        console.log(getUsersParamDto)

        return "You sent a get request to a user endpoint"
    }
    @Post()
    public createUser(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @Headers() headers: any

    ) {
        console.log(headers)
        console.log(createUserDto)
        console.log(createUserDto instanceof CreateUserDto)
        return "you have created user"
    }


    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return patchUserDto;
    }
}
