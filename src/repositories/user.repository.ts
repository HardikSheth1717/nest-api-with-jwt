import { Injectable } from "@nestjs/common";
import { GenericRepository } from "./generic.repository";

import User from '../dto/user.dto';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends GenericRepository<User> {
    // private readonly userRepository: Repository<User>;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super();
    }
    
    getUserByUserName = async (userName: string): Promise<User[]> => {
        return await this.userRepository.find({
            where: {
                UserName: userName
            }
        });
    };
}