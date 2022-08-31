const serverlessCompose = {
  services: {
    nodejs: {
      path: 'layers/lib'
    },
    register: {
      path: 'services/registerService',
      dependsOn: ['nodejs'],
      params: {
        'commonLibs': '${nodejs.CommonLibsLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;