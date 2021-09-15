import { DeleteResult, Repository } from 'typeorm';

export class GenericRepository<Type> {
    private genericRepository: Repository<Type>

    get = async (): Promise<Type[]> => {
        return await this.genericRepository.find();
    };

    getOne = async (id: number): Promise<Type[]> => {
        return await this.genericRepository.findByIds([id]);
    };

    save = async (entity: Type): Promise<Type> => {
        return this.genericRepository.save(entity);
    }

    delete = async (id: number): Promise<DeleteResult> => {
        return await this.genericRepository.delete(id);
    };
}