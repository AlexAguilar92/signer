import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'nodejs-layer',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  layers: {
    commonLibs: {
      path: './'
    }
  },
  resources: {
    Outputs: {
      CommonLibsLambdaLayerQualifiedArn: {
        Value: {
          "Ref": "CommonLibsLambdaLayer"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration;