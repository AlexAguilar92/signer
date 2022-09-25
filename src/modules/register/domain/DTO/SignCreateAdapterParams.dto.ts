export default interface SignCreateAdapterParams {
  id?: string;
  overrideMaximumRequiredLevel: string;
  pipeline: string;
  fact: object;
  overrides: object;
  user: string;
  application: string;
}