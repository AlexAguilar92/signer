const serverlessCompose = {
  services: {
    nodejs: {
      path: 'layers/lib'
    },
    servicea: {
      path: 'services/outhouse',
      dependsOn: ['nodejs'],
      params: {
        'commonLibs': '${nodejs.CommonLibsLambdaLayerQualifiedArn}',
      }
    },
    serviceb: {
      path: 'services/inhouse',
      dependsOn: ['nodejs'],
      params: {
        'commonLibs': '${nodejs.CommonLibsLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;