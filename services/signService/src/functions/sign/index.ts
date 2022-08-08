import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  name: '${self:custom.func_prefix}-lambda-name-servicea',
  events: [
    {
      http: {
        method: 'post',
        path: '/json/sign',
        cors: true,
        authorizer: {
          arn: '${ssm:sso_cognito_arn,"sso_cognito_arn"}',
          name: '${self:custom.func_prefix}-authorizer'
        },
      },
    },
  ],
};
