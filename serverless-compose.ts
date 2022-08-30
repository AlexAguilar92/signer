const serverlessCompose = {
  services: {
    nodejs: {
      path: 'layers/lib'
    },
    signerCreate: {
      path: 'services/signService',
      dependsOn: ['nodejs'],
      params: {
        'commonLibs': '${nodejs.CommonLibsLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;