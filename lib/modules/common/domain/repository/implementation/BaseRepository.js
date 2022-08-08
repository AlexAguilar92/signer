var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
import { injectable, unmanaged } from "inversify";
import "reflect-metadata";
import IDBConnectionManager from "../../../shared/database/interface/IDBConnectionManager";
let BaseRepository = class BaseRepository {
    constructor(type, iDBConnectionManager) {
        this.type = type;
        this.iDBConnectionManager = iDBConnectionManager;
    }
    async find() {
        await this.iDBConnectionManager.connect();
        try {
            const query = this.iDBConnectionManager.connection
                .manager.createQueryBuilder(this.type, "entity");
            const entities = await query.getMany();
            return entities;
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            this.iDBConnectionManager.disconnect();
        }
    }
    async findById(id) {
        await this.iDBConnectionManager.connect();
        try {
            const query = this.iDBConnectionManager.connection
                .manager.createQueryBuilder(this.type, "entity");
            const entity = await query.where("entity.id = :id", { id })
                .getOne();
            if (!entity)
                throw new Error("Entity not found");
            return entity;
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            this.iDBConnectionManager.disconnect();
        }
    }
    async create(items) {
        await this.iDBConnectionManager.connect();
        try {
            const createdItems = await this.iDBConnectionManager.connection
                .manager
                .save(this.type, items);
            return createdItems;
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            this.iDBConnectionManager.disconnect();
        }
    }
    async update(id, item) {
        await this.iDBConnectionManager.connect();
        try {
            const updateResult = await this.iDBConnectionManager.connection
                .manager.createQueryBuilder(this.type, "entity")
                .update(this.type)
                .set(item)
                .where("entity.id = :id", { id })
                .execute();
            if (updateResult.affected === 0)
                throw new Error("Entity not found");
            const query = this.iDBConnectionManager.connection
                .getRepository(this.type)
                .createQueryBuilder("entity");
            const entity = await query
                .where("entity.id = :id", { id })
                .getOne();
            if (!entity)
                throw new Error("Entity not found");
            return entity;
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            this.iDBConnectionManager.disconnect();
        }
    }
    async softDelete(id, item) {
        await this.iDBConnectionManager.connect();
        try {
            this.type["active"] = false;
            const query = this.iDBConnectionManager.connection
                .manager.createQueryBuilder(this.type, "entity");
            await query.update(this.type)
                .set(item)
                .where("entity.id = :id", { id })
                .execute();
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            this.iDBConnectionManager.disconnect();
        }
    }
    async hardDelete(id) {
        await this.iDBConnectionManager.connect();
        try {
            const query = this.iDBConnectionManager.connection
                .manager.createQueryBuilder(this.type, "entity");
            await query.delete()
                .from(this.type)
                .where("entity.id = :id", { id })
                .execute();
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            this.iDBConnectionManager.disconnect();
        }
    }
};
BaseRepository = __decorate([
    injectable(),
    __param(0, unmanaged()),
    __param(1, unmanaged()),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof IDBConnectionManager !== "undefined" && IDBConnectionManager) === "function" ? _a : Object])
], BaseRepository);
export default BaseRepository;
//# sourceMappingURL=BaseRepository.js.map