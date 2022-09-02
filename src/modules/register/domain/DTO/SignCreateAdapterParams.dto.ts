export default interface SignCreateAdapterParams {
  id?: string;
  overrideMinimumRequiredLevel: string;
  pipeline: object;
  fact: object;
  overrides: object;
  user: string;
  application: string;
}