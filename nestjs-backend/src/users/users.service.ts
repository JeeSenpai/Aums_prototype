import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
  
  async create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser =  this.userRepository.create({...createUserDto, password});
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findUserByUsername(username: string){
    return this.userRepository.findOne({username});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updated = await this.userRepository.update(id,updateUserDto);
    if(updated){
      return new HttpException('User Updated Succesfully', HttpStatus.CREATED)
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);
     const removed = this.userRepository.remove(user);
     if(removed){
      return new HttpException('User Remove Succesfully', HttpStatus.FOUND)
    }
  }
}
