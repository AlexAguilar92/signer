import type { AWS } from '@serverless/typescript';
import functions from './src/functions';

const serverlessConfiguration: AWS = {
  service: "${self:custom.service}",
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-plugin-tracing'
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    tracing: {
      lambda: true,
    },
    apiGateway: {
      restApiId: '${env:ApiGatewayId, "ApiGatewayId"}',
      restApiRootResourceId: '${env:ApiGatewayResource, "ApiGatewayResource"}',
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    layers: [
      '${param:commonLibs, "commonLibs"}',
    ],
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3BucketDeploySls"}',
    },
    iam: {
      role: '${env:iamRole, "iamRole"}',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "xray:PutTraceSegments",
          "xray:PutTelemetryRecords"
        ]
      }
    ],
    vpc: {
      securityGroupIds: { "Fn::Split": [",", '${ssm:securityGroupIds, "SECURITY_GROUP_IDS"}'] },
      subnetIds: { "Fn::Split": [",", '${ssm:subnetIds, "SUBNETS_IDS"}'] },
    }, 
  },
  // import the function via paths
  functions,
  package: { 
    individually: true,
    patterns: [
      '!**/node_modules/**',
    ]
  },
  custom: {
    service: "signerCreate",
    stage: '${env:STAGE, "stage"}',
    func_prefix: "${self:custom.stage}-${self:custom.service}",
    esbuild: {
      bundle: true,
      // minify: false,
      minifyWhitespace: true,
      minifyIdentifiers: true,
      sourcemap: true,//process.env.ENVIRONMENT === 'local',
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
