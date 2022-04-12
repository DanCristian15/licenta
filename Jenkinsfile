@Library('gstjenkinslib') _

pipeline {
  agent {
    kubernetes {
      inheritFrom 'jenkins-pipeline'
      label 'jenkins-pipeline'
      defaultContainer 'node'
    }
  }

  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: env.BRANCH_NAME == 'master' ? '5' : '1'))
    ansiColor('xterm')
  }

  environment {
    SNAPSHOT_BRANCH = 'develop'
    RELEASE_BRANCH = 'master'
  }

  stages {
    stage('Install dependencies') {
      steps {
        setEnvProperties()
        // nodeInstallDependencies()
      }
    }

    //stage('Run unit tests') {
    //  steps {
    //    nodeRunUnitTests()
    //  }
    //}

    //stage('Code analysis') {
    //  steps {
    //    nodeCodeAnalysis()
    //  }
    //}

    //stage("Quality gate") {
    //  agent none
    //  steps {
    //    validateQualityGate()
    //  }
    //}

    stage('Build sources') {
      steps {
        yarnBuildMultiTenant([tenants: ['_main', 'ticketmaster']])
      }
    }

    stage('Set release version') {
      when { expression { env.INSTALL_ARTIFACT == 'true' } }

      steps {
        yarnSetReleaseVersion()
      }
    }

    stage('Build and push Docker image') {
      when { expression { env.INSTALL_ARTIFACT == 'true' } }

      steps {
        container('docker') {
          dockerPush([
            imageTag: env.RELEASE_VERSION
          ])
        }
      }
    }

    //stage('Publish Helm Chart') {
    //  when { expression { env.INSTALL_ARTIFACT == 'true' } }
    //
    //  steps {
    //    container('helm') {
    //      helmPush appVersion: env.BUILD_DOCKER_IMAGE_TAG
    //    }
    //  }
    //}

    stage('Deploy') {
      when { expression { env.INSTALL_ARTIFACT == 'true' } }

      steps {
        container('helm') {
          helmDeploy([
            releaseVersion: env.RELEASE_VERSION,
            deploymentEnvironment: env.DEPLOY_ENV
          ])
        }
      }
    }


    stage('Publish artifacts') {
      when { expression { env.INSTALL_ARTIFACT == 'true' } }
      steps {
        publishArtifacts()
      }
    }

    //stage('Update TEST GitOps repository') {
    //  when { expression { env.INSTALL_ARTIFACT == 'true' } }

    //  steps {
    //    container('gitops') {
    //      gitopsSetServiceVersion version: env.BUILD_HELM_CHART_VERSION
    //    }
    //  }
    //}
  }

//   post {
//     always {
//       msTeamsNotificationTrigger([:], 'always')
//     }
//     failure {
//       msTeamsNotificationTrigger([:], 'failure')
//     }
//   }
}
