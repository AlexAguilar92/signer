export default interface Repository<T> {
  execute(port: T): Promise<T>
}