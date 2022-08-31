const serverlessCompose = {
  services: {
    nodejs: {
      path: 'layers/lib'
    },
    register: {
      path: 'services/signService',
      dependsOn: ['nodejs'],
      params: {
        'commonLibs': '${nodejs.CommonLibsLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;