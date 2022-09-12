import { handlerPath } from "../../libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  name: '${self:custom.func_prefix}-register',
  events: [
    {
      http: {
        method: 'post',
        path: '/register',
        cors: true,
        // authorizer: {
        //   arn: '${ssm:sso_cognito_arn,"ssoCognitoArn"}',
        //   name: '${self:custom.func_prefix}-authorizer'
        // },
      },
    },
  ],
};
