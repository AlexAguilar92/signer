import { injectable, unmanaged } from "inversify";
import { DeleteResult, SelectQueryBuilder, UpdateResult } from "typeorm";
import { IRead, IWrite } from "../..";
import "reflect-metadata";
import IDBConnectionManager from "../../../shared/database/interface/IDBConnectionManager";

export type ObjectType<T> = { new (): T } | Function;

/**
 * @absract class BaseRepository
 * @param {ObjectType<T>} type
 * @param {IDBConnectionManager} iDBConnectionManager
 * @template T
 * @implements IRead<T>, IWrite<T>
 * @description Base repository class
 * @author Alexandro Aguilar
 * @created 2022-04-12
 * @updated 2022-04-12
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  private type: ObjectType<T>;
  private iDBConnectionManager: IDBConnectionManager;

  constructor(
    @unmanaged() type: ObjectType<T>,
    @unmanaged() iDBConnectionManager: IDBConnectionManager,
  ) {
    this.type = type;
    this.iDBConnectionManager = iDBConnectionManager;
  }
  
  /**
   * @function find
   * @returns {Promise<T[]>}
   * @throws {Error}
   * @description Finds all items
   * @belongsTo IRead
   */
  public async find(): Promise<T[]> {
    //Connect to the database
    await this.iDBConnectionManager.connect();
    try {
      //Build up the query
      const query: SelectQueryBuilder<T> = this.iDBConnectionManager.connection
        .manager.createQueryBuilder(this.type, "entity");
      //Execute the query
      const entities: T[] = await query.getMany();

      return entities;
    } catch (error) {
      throw new Error(error);
    } finally {
      //Disconnect from the database
      this.iDBConnectionManager.disconnect();
    }
  }
  
  /**
   * @function find
   * @param {string} id
   * @returns {Promise<T | undefined>}
   * @throws {Error}
   * @description Finds an item by its id
   * @belongsTo IRead
   */
  public async findById(id: string): Promise<T> {
    //Connect to the database
    await this.iDBConnectionManager.connect();
    try {
      //Build up the query
      const query: SelectQueryBuilder<T> = this.iDBConnectionManager.connection
        .manager.createQueryBuilder(this.type, "entity");
      //Add the where clause
      const entity: T | undefined = await query.where("entity.id = :id", { id })
      //Execute the query
      .getOne();

      if(!entity) throw new Error("Entity not found");

      return entity;
    } catch (error) {
      throw new Error(error);
    } finally {
      //Disconnect from the database
      this.iDBConnectionManager.disconnect();
    }
  }

  /**
   * @function create
   * @param {T} items
   * @returns Promise<T>
   * @throws {Error}
   * @description Creates a new item
   * @belongsTo IWrite
   */
  public async create(items: T[]): Promise<T[]> {
    //Connect to the database
    await this.iDBConnectionManager.connect();
    try {
      //Build up the query
      const createdItems: T[] = await this.iDBConnectionManager.connection
      .manager
      //Execute the query
      .save(this.type, items);

      return createdItems;
    }
    catch (error) {
      throw new Error(error);
    }
    finally {
      //Disconnect from the database
      this.iDBConnectionManager.disconnect();
    }
  }

  /**
   * @function update
   * @param {T} item
   * @returns Promise<void>
   * @throws {Error}
   * @description Updates an item
   * 
   */
  public async update(id: string, item: T): Promise<T> {
    //Connect to the database
    await this.iDBConnectionManager.connect();
    try {
      //Build up the query
      const updateResult: UpdateResult = await this.iDBConnectionManager.connection
        .manager.createQueryBuilder(this.type, "entity")
        .update(this.type)
        .set(item)
        .where("entity.id = :id", { id })
        //Execute the query
        .execute();

      if (updateResult.affected === 0) throw new Error("Entity not found");
      //Get the updated item
      //Build up the query
      const query: SelectQueryBuilder<T> = this.iDBConnectionManager.connection
        .getRepository(this.type)
        .createQueryBuilder("entity");

      const entity: T | undefined = await query
      .where("entity.id = :id", { id })
      //Execute the query
      .getOne()
      if(!entity) throw new Error("Entity not found");
      return entity;
    } catch (error) {
      throw new Error(error);
    } finally {
      //Disconnect from the database
      this.iDBConnectionManager.disconnect();
    }
  }

  /**
   * @function softDelete
   * @param {string} id
   * @param {T} item
   * @returns Promise<void>
   * @throws {Error}
   * @description Soft deletes an item
   * @belongsTo IWrite
   */
  public async softDelete(id: string, item: T): Promise<void> {
    //Connect to the database
    await this.iDBConnectionManager.connect();
    try {
      this.type["active"] = false;
      //Build up the query
      const query: SelectQueryBuilder<T> = this.iDBConnectionManager.connection
        .manager.createQueryBuilder(this.type, "entity");
        await query.update(this.type)
        .set(item)
        .where("entity.id = :id", { id })
        //Execute the query
        .execute();
    } catch (error) {
      throw new Error(error);
    } finally {
      //Disconnect from the database
      this.iDBConnectionManager.disconnect();
    }
  }

  /**
   * @function hardDelete
   * @param {string} id
   * @returns Promise<void>
   * @throws {Error}
   * @description Hard deletes an item
   * @belongsTo IWrite
   */
  public async hardDelete(id: string): Promise<void> {
    //Connect to the database
    await this.iDBConnectionManager.connect();
    try {
      const query: SelectQueryBuilder<T> = this.iDBConnectionManager.connection
        .manager.createQueryBuilder(this.type, "entity");
        await query.delete()
        .from(this.type)
        .where("entity.id = :id", { id })
        .execute();
    } catch (error) {
      throw new Error(error);
    } finally {
      //Disconnect from the database
      this.iDBConnectionManager.disconnect();
    }
  }
}