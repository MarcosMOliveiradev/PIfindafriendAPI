import { User } from "../../entities/users";
/*
* classe de repositório responsável por controlar os métodos dos repositórios e abstrair os casos de uso de serem dependentes.
*/
export abstract class UserRepository {
    abstract creat(user: User): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findUser(): Promise<User[] | null>
    abstract findUserOng(): Promise<User[] | null>
    abstract findUserById(id: string): Promise<User | null>
    abstract update(user: User, id: string): Promise<User | null>
    abstract PetchAvataPicture(id: string, avata: string): Promise<User | null>
    abstract delete(id: string): Promise<void>
}