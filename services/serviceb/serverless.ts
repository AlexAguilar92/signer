import type { AWS } from '@serverless/typescript';
import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: "${self:custom.service}",
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      restApiId: '${env:apiGatewayRestApiId}',
      restApiRootResourceId: '${env:apiGatewayRestApiRootResourceId}',
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    layers: [
      "${param:commonLibs}",
    ], 
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3_bucket_deploy_sls"}',
    },
    iam: {
      role: '${env:iamRole, "iamRole"}',
    },
    vpc: {
      securityGroupIds: { "Fn::Split": [",", '${ssm:securityGroupIds, "SECURITY_GROUP_IDS"}'] },
      subnetIds: { "Fn::Split": [",", '${ssm:subnetIds, "SUBNETS_IDS"}'] },
    }, 
  },
  // import the function via paths
  functions: { hello },
  package: { 
    individually: true,
    patterns: [
      '!**/node_modules/**',
    ]
  },
  custom: {
    service: "serviceb",
    stage: '${env:STAGE, "stage"}',
    func_prefix: "${self:custom.stage}-${self:custom.service}",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
