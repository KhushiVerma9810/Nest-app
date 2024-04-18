import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Redirect, Req, Res, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './Interface/user';
import { UserDto, UserParamsDto } from '../dto/user.dto';
import { Request, Response } from 'express';
import { HttpExceptionFilter } from '../filter/filter';
import { LoggingInterceptor } from '../intercepter/intercepter';

@Controller('users')
export class UserController {
constructor(private readonly userService: UserService) {

}
@Get()
getUsers(
// @Param('id', ParseIntPipe)id:number,
// @Query('sort')sort:boolean,
// @Body()data: UserDto,
// @Header() header: DataHeader,
// @Req() req: Request,

): User [] {
return this.userService.getUsers()
}

// @HttpCode(204)
// @Redirect()
@Get('/:email')
@UseInterceptors(new LoggingInterceptor())
@UseFilters(new HttpExceptionFilter())
// getUser(@Param() param: UserParamsDto, @Req() req:Request , @Res() res:Response){
    // const data =  this.userService.getUser(param.email)
    // res.status(HttpStatus.CREATED).send();

async getUser(@Param() param: UserParamsDto): Promise<User>{
        try{
   return await this.userService.getUser(param.email)
        }catch(err){
            throw new BadRequestException('test');
        }
}


@Post()
@UsePipes(new ValidationPipe())

async postUser(@Body() user:UserDto): Promise<User>{
   return this.userService.addUser(user);
}
// @Delete('/:email')
// deleteUser(@Param('email') email:string): User[]{
//     return this.userService.deleteUser(email);
// }
@Delete('/:email')
deleteUser(@Param() params:UserParamsDto): User[]{
    return this.userService.deleteUser(params.email);
}
}
