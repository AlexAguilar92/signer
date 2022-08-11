import ObjectType from './EntityArtifact'

export default abstract class BaseCreateRepository<T, U> {
  abstract buildQuery(port: U);

  execute() {

  }

}