import Repository from "./Repository";

export default interface CreateRepository<U, T> extends Repository<U, T> {
  buildQuery(port: U)
}