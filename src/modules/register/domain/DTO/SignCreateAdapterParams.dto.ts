export default interface SignCreateAdapterParams {
  id?: string;
  overrideMinimumRequiredLevel: string;
  pipeline: string;
  fact: object;
  overrides: object;
  user: string;
  application: string;
}